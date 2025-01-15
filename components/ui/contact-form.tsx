"use client"

import React, { useState } from "react"
import { BackgroundBeams } from "./background-beams"
import { Input } from "./input"
import { Label } from "./label"
import { Button } from "./button"
import { Checkbox } from "./checkbox"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        subscribe: false,
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">
          Get in Touch
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-600 max-w-lg text-center mx-auto">
          Have a question or want to work together? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="name" className="text-neutral-800 font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className="mt-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-neutral-800 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              className="mt-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="subject" className="text-neutral-800 font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="Project Inquiry"
              required
              className="mt-2"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-neutral-800 font-medium">
              Message
            </Label>
            <textarea
              id="message"
              required
              className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              placeholder="Your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribe"
              checked={formData.subscribe}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, subscribe: checked as boolean })
              }
            />
            <Label htmlFor="subscribe" className="text-neutral-800 font-medium">
              Subscribe to newsletter
            </Label>
          </div>

          <Button
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {submitStatus === "success" && (
            <p className="text-green-500 text-center">Message sent successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
      <BackgroundBeams />
    </div>
  )
} 