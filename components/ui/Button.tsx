import type React from "react"
import clsx from "clsx"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
}

export default function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "btn",
        variant === "secondary" && "btn--secondary",
        variant === "accent" && "btn--accent",
        size === "sm" && "text-sm px-3 py-2",
        size === "lg" && "text-xl px-5 py-3",
        className,
      )}
    />
  )
}
