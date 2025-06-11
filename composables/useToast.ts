interface ToastAction {
  label: string
  callback: () => void
}

interface ToastOptions {
  duration?: number
  position?: 'top' | 'bottom'
  showProgress?: boolean
  action?: ToastAction
}

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
  createdAt: number
  showProgress?: boolean
  action?: ToastAction
}

export const useToast = () => {
  // Utiliser useState de Nuxt pour persister le state côté client
  const toasts = useState<Toast[]>('app-toasts', () => [])
  const toastTimeouts = new Map<string, NodeJS.Timeout>()

  const addToast = (message: string, type: Toast['type'], options: ToastOptions = {}) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = options.duration || 5000

    const toast: Toast = {
      id,
      message,
      type,
      duration,
      createdAt: Date.now(),
      showProgress: options.showProgress ?? false,
      action: options.action
    }

    // Ajouter le toast
    toasts.value = [...toasts.value, toast]

    // Auto-remove après la durée spécifiée
    const timeout = setTimeout(() => {
      removeToast(id)
    }, duration)

    toastTimeouts.set(id, timeout)

    return id
  }

  const removeToast = (id: string) => {
    // Nettoyer le timeout si il existe
    const timeout = toastTimeouts.get(id)
    if (timeout) {
      clearTimeout(timeout)
      toastTimeouts.delete(id)
    }

    // Supprimer le toast
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const clearAllToasts = () => {
    // Nettoyer tous les timeouts
    toastTimeouts.forEach(timeout => clearTimeout(timeout))
    toastTimeouts.clear()

    // Vider la liste
    toasts.value = []
  }

  const success = (message: string, options?: ToastOptions) => {
    return addToast(message, 'success', options)
  }

  const error = (message: string, options?: ToastOptions) => {
    return addToast(message, 'error', options)
  }

  const info = (message: string, options?: ToastOptions) => {
    return addToast(message, 'info', options)
  }

  const warning = (message: string, options?: ToastOptions) => {
    return addToast(message, 'warning', options)
  }

  return {
    toasts: readonly(toasts),
    success,
    error,
    info,
    warning,
    removeToast,
    clearAllToasts
  }
}
