import Icon from '../Icon.jsx'

export default function EmptyState({ icon = 'inbox', title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
        <Icon name={icon} className="text-[32px] text-outline" />
      </div>
      <h4 className="text-headline-sm text-on-surface mb-1">{title}</h4>
      {message && <p className="text-body-sm text-on-surface-variant max-w-sm mb-6">{message}</p>}
      {action}
    </div>
  )
}
