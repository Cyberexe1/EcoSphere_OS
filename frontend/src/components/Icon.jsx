export default function Icon({ name, className = '', ...props }) {
  return (
    <span className={`material-symbols-outlined ${className}`} {...props}>
      {name}
    </span>
  )
}
