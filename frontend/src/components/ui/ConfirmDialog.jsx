import Modal from './Modal.jsx'
import Icon from '../Icon.jsx'

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm?.()
              onClose?.()
            }}
            className={`px-5 py-2 rounded-lg text-label-md text-white transition-all active:scale-95 ${
              destructive ? 'bg-error hover:opacity-90' : 'bg-primary hover:opacity-90'
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <div
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
            destructive ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
          }`}
        >
          <Icon name={destructive ? 'warning' : 'help'} />
        </div>
        <p className="text-body-md text-on-surface-variant pt-1.5">{message}</p>
      </div>
    </Modal>
  )
}
