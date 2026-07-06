interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="bg-surface border-b border-border px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {eyebrow && (
          <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-3 font-medium">{eyebrow}</p>
        )}
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-3">{title}</h1>
        {subtitle && <p className="text-mist text-sm max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
