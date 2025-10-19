import { ImageResponse } from "next/og"

export const runtime = "edge"

const size = {
  width: 1200,
  height: 630,
}

const getParam = (url: URL, key: string, fallback: string) => {
  const value = url.searchParams.get(key)
  return value ? decodeURIComponent(value) : fallback
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const title = getParam(url, "title", "Prashant Choudhary")
  const subtitle = getParam(url, "subtitle", "AI/ML Engineer")
  const badge = getParam(url, "badge", "Case Study")

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0f172a",
          color: "#f8fafc",
          padding: "80px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "#1d4ed8",
              fontSize: "28px",
              fontWeight: 600,
            }}
          >
            {badge}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1 style={{ fontSize: "76px", fontWeight: 700, margin: 0 }}>{title}</h1>
          <p style={{ fontSize: "36px", margin: 0, color: "#cbd5f5" }}>{subtitle}</p>
        </div>
        <div style={{ fontSize: "28px", color: "#cbd5f5" }}>Prashant Choudhary • prashant.sbs</div>
      </div>
    ),
    {
      ...size,
    }
  )
}
