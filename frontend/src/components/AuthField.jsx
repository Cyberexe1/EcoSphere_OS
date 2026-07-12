import Icon from './Icon.jsx'

export default function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  icon,
  value,
  onChange,
  autoComplete,
  trailing,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-label-md text-on-surface">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
          />
        )}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`w-full h-12 rounded-xl border border-outline-variant bg-white text-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            icon ? 'pl-10' : 'pl-4'
          } ${trailing ? 'pr-11' : 'pr-4'}`}
        />
        {trailing}
      </div>
    </div>
  )
}
