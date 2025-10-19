import { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  id?: string
}

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <header className="max-w-3xl space-y-3" id={id}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-[clamp(1.75rem,3vw,2.5rem)]">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </header>
  )
}
