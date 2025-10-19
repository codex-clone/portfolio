"use client"

import { FormEvent, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

interface ContactFormProps {
  siteKey: string
}

type FormFields = {
  name: string
  email: string
  subject: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

type SubmitState = "idle" | "submitting" | "success" | "error"

const initialValues: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export function ContactForm({ siteKey }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<FormFields>(initialValues)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitState>("idle")
  const [formMessage, setFormMessage] = useState<string>("")

  const updateField = (field: keyof FormFields, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = () => {
    const errors: FieldErrors = {}
    if (!values.name.trim()) {
      errors.name = "Your name is required."
    }
    if (!values.email.trim()) {
      errors.email = "An email address is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = "Use a valid email address."
    }
    if (!values.subject.trim()) {
      errors.subject = "Let me know what this is about."
    }
    if (!values.message.trim()) {
      errors.message = "Share some context so I can help."
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("idle")
    setFormMessage("")

    if (!validate()) {
      return
    }

    const form = formRef.current
    const captchaField = form?.querySelector<HTMLTextAreaElement>("textarea[name='h-captcha-response']")
    const hcaptchaToken = captchaField?.value?.trim()

    if (!hcaptchaToken) {
      setStatus("error")
      setFormMessage("Please complete the hCaptcha challenge before submitting.")
      return
    }

    setStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          hcaptchaToken,
          honeypot:
            (form?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "",
        }),
      })

      if (response.status === 202) {
        setStatus("success")
        setFormMessage("Thanks for reaching out. I’ll follow up soon.")
        setValues(initialValues)
        if (captchaField?.value) {
          captchaField.value = ""
        }
        if (typeof window !== "undefined" && "hcaptcha" in window) {
          ;(window as typeof window & { hcaptcha?: { reset: () => void } }).hcaptcha?.reset()
        }
      } else {
        const data = await response.json().catch(() => ({}))
        setStatus("error")
        setFormMessage(data.error ?? "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setFormMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={fieldErrors.name ? "true" : undefined}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            className="mt-2"
            required
          />
          {fieldErrors.name ? (
            <p id="contact-name-error" className="mt-2 text-sm text-red-600">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className="mt-2"
            required
          />
          {fieldErrors.email ? (
            <p id="contact-email-error" className="mt-2 text-sm text-red-600">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <Label htmlFor="subject" className="text-sm font-medium text-slate-700">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          autoComplete="off"
          value={values.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          aria-invalid={fieldErrors.subject ? "true" : undefined}
          aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
          className="mt-2"
          required
        />
        {fieldErrors.subject ? (
          <p id="contact-subject-error" className="mt-2 text-sm text-red-600">
            {fieldErrors.subject}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="message" className="text-sm font-medium text-slate-700">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(
            "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm",
            "placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
          placeholder="Share context, constraints, and success measures."
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={fieldErrors.message ? "true" : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          required
        />
        {fieldErrors.message ? (
          <p id="contact-message-error" className="mt-2 text-sm text-red-600">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-700">Human check</p>
        <div className="mt-4 flex justify-center">
          <div className="h-captcha" data-sitekey={siteKey} />
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          className="focus-visible:ring-slate-900"
          isDisabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <div role="status" aria-live="polite" className="text-sm">
          {status === "success" ? (
            <span className="text-emerald-600">{formMessage}</span>
          ) : null}
          {status === "error" ? (
            <span className="text-red-600">{formMessage}</span>
          ) : null}
        </div>
      </div>
    </form>
  )
}
