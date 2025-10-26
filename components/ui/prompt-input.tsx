"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type PromptInputContextValue = {
  value: string
  onValueChange?: (value: string) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

const PromptInputContext = React.createContext<PromptInputContextValue | null>(
  null,
)

function usePromptInputContext(component: string) {
  const context = React.useContext(PromptInputContext)

  if (!context) {
    throw new Error(`${component} must be used within <PromptInput />`)
  }

  return context
}

type PromptInputProps = React.ComponentPropsWithoutRef<"form"> & {
  value: string
  onValueChange?: (value: string) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
  ({ className, value, onValueChange, onSubmit, children, ...props }, ref) => {
    const handleSubmit = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit?.(event)
      },
      [onSubmit],
    )

    return (
      <PromptInputContext.Provider value={{ value, onValueChange, onSubmit }}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn(
            "flex w-full flex-col gap-3 rounded-3xl border border-border bg-background/90 p-3 shadow-sm backdrop-blur",
            className,
          )}
          {...props}
        >
          {children}
        </form>
      </PromptInputContext.Provider>
    )
  },
)
PromptInput.displayName = "PromptInput"

type PromptInputTextareaProps = React.ComponentPropsWithoutRef<"textarea">

const PromptInputTextarea = React.forwardRef<
  HTMLTextAreaElement,
  PromptInputTextareaProps
>(({ className, onChange, ...props }, ref) => {
  const { value, onValueChange } = usePromptInputContext("PromptInputTextarea")

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(event) => {
        onValueChange?.(event.target.value)
        onChange?.(event)
      }}
      className={cn(
        "min-h-[96px] w-full resize-none rounded-2xl border border-input bg-muted/40 px-4 py-3 text-base text-foreground shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm",
        className,
      )}
      {...props}
    />
  )
})
PromptInputTextarea.displayName = "PromptInputTextarea"

type PromptInputActionsProps = React.ComponentPropsWithoutRef<"div">

const PromptInputActions = React.forwardRef<HTMLDivElement, PromptInputActionsProps>(
  ({ className, ...props }, ref) => {
    usePromptInputContext("PromptInputActions")

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-muted/30 px-3 py-2",
          className,
        )}
        {...props}
      />
    )
  },
)
PromptInputActions.displayName = "PromptInputActions"

export { PromptInput, PromptInputActions, PromptInputTextarea }
