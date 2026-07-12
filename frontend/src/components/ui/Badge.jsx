const TONES = {
  success: 'bg-primary/10 text-primary',
  onTrack: 'bg-primary/10 text-primary',
  warning: 'bg-amber-100 text-amber-700',
  pending: 'bg-amber-100 text-amber-700',
  danger: 'bg-error/10 text-error',
  atRisk: 'bg-error/10 text-error',
  info: 'bg-tertiary/10 text-tertiary',
  neutral: 'bg-outline-variant/30 text-on-surface-variant',
  purple: 'bg-gov-accent/10 text-gov-accent',
}

export default function Badge({ tone = 'neutral', dot = false, children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
        TONES[tone] ?? TONES.neutral
      }`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
