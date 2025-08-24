import type { PropsWithChildren } from "react"

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="frame shadow-[0_0_0_2px_rgb(var(--rgb-neutral)),4px_4px_0_0_rgba(0,0,0,.25)] rounded-none p-4 bg-surface text-neutral">
      {children}
    </div>
  )
}
