'use client'

export default function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
      <div
        className="w-full h-full"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.1) 2px,
            rgba(0, 255, 255, 0.1) 4px
          )`,
        }}
      />
    </div>
  )
}

