export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastItem {
  id: number
  type: ToastType
  title: string
  description?: string
  duration: number
}

let idSeq = 0
const MAX_TOASTS = 3

export function useAppToast() {
  const toasts = useState<ToastItem[]>('app-toasts', () => [])

  function push(type: ToastType, title: string, description?: string, duration = 2500) {
    const id = ++idSeq
    // Keep at most MAX_TOASTS visible: drop the oldest when exceeding.
    const next = [...toasts.value, { id, type, title, description, duration }]
    toasts.value = next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    dismiss,
    success: (title: string, description?: string) => push('success', title, description),
    error: (title: string, description?: string) => push('error', title, description),
    info: (title: string, description?: string) => push('info', title, description),
    warning: (title: string, description?: string) => push('warning', title, description),
  }
}
