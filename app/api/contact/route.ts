import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, subscribe } = await req.json()

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content for you
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "prashantc592114@gmail.com", // Your email address
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Subscribed to Newsletter:</strong> ${subscribe ? "Yes" : "No"}</p>
      `,
    }

    // Auto-reply email content for the sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your message",
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Dear ${name},</p>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Here&apos;s a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p>Prashant Choudhary</p>
      `,
    }

    // Send both emails
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(autoReplyOptions)

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to send email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
} 