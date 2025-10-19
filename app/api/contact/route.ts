import { NextResponse } from "next/server"

interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
  hcaptchaToken?: string
  honeypot?: string
}

interface HCaptchaResponse {
  success: boolean
  "error-codes"?: string[]
}

const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map<string, { count: number; expires: number }>()

const getClientIdentifier = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "anonymous"
  }
  return request.headers.get("x-real-ip") ?? "anonymous"
}

const isRateLimited = (id: string) => {
  const now = Date.now()
  const entry = rateLimitStore.get(id)
  if (!entry || entry.expires < now) {
    rateLimitStore.set(id, { count: 1, expires: now + RATE_LIMIT_WINDOW })
    return false
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }
  entry.count += 1
  rateLimitStore.set(id, entry)
  return false
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload
    const { name, email, subject, message, hcaptchaToken, honeypot } = payload

    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 })
    }

    if (!name || !email || !subject || !message || !hcaptchaToken) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    const clientId = getClientIdentifier(request)
    if (isRateLimited(clientId)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 })
    }

    const secret = process.env.HCAPTCHA_SECRET
    if (!secret) {
      console.error("HCAPTCHA_SECRET is not configured")
      return NextResponse.json({ error: "Service misconfigured." }, { status: 500 })
    }

    const verifyResponse = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: hcaptchaToken,
        remoteip: clientId,
      }).toString(),
    })

    const verifyData = (await verifyResponse.json()) as HCaptchaResponse
    if (!verifyData.success) {
      return NextResponse.json({ error: "Captcha validation failed." }, { status: 400 })
    }

    return NextResponse.json({ message: "Accepted" }, { status: 202 })
  } catch (error) {
    console.error("Contact form error", error)
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
