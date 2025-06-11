<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <TransitionGroup name="toast" tag="div">
          <div v-for="toast in toasts" :key="toast.id" :class="[
            'px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm border',
            'transform transition-all duration-300 ease-in-out',
            {
              'bg-green-500/90 border-green-400 text-white': toast.type === 'success',
              'bg-red-500/90 border-red-400 text-white': toast.type === 'error',
              'bg-blue-500/90 border-blue-400 text-white': toast.type === 'info',
              'bg-yellow-500/90 border-yellow-400 text-white': toast.type === 'warning'
            }
          ]">
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-3">
                <component :is="getIcon(toast.type)" class="w-5 h-5" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium">{{ toast.message }}</p>
                <div v-if="toast.action" class="mt-2">
                  <button @click="toast.action.callback"
                    class="text-xs underline hover:no-underline opacity-80 hover:opacity-100">
                    {{ toast.action.label }}
                  </button>
                </div>
              </div>
              <button @click="removeToast(toast.id)"
                class="flex-shrink-0 ml-3 text-white/80 hover:text-white transition-colors">
                <X class="w-4 h-4" />
              </button>
            </div>
            <!-- Progress bar -->
            <div v-if="toast.showProgress" class="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-white transition-all duration-100 ease-linear"
                :style="{ width: `${progressValues[toast.id] || 100}%` }" />
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

interface ToastAction {
  label: string
  callback: () => void
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

const { toasts, removeToast } = useToast()

// État réactif pour stocker les valeurs de progression
const progressValues = ref<Record<string, number>>({})

const getIcon = (type: Toast['type']) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle
  }
  return icons[type]
}

const updateProgress = () => {
  const now = Date.now()
  const newProgressValues: Record<string, number> = {}

  toasts.value.forEach(toast => {
    if (toast.showProgress) {
      const elapsed = now - toast.createdAt
      const progress = (elapsed / toast.duration) * 100
      newProgressValues[toast.id] = Math.min(Math.max(100 - progress, 0), 100)
    }
  })

  progressValues.value = newProgressValues
}

// Intervalle pour mettre à jour la progression
let progressInterval: NodeJS.Timeout | null = null

onMounted(() => {
  // Initialiser les valeurs de progression
  updateProgress()

  // Mettre à jour la progression toutes les 50ms pour une animation fluide
  progressInterval = setInterval(() => {
    updateProgress()
  }, 50)
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})

// Watcher pour initialiser la progression des nouveaux toasts
watch(toasts, (newToasts) => {
  newToasts.forEach(toast => {
    if (toast.showProgress && !(toast.id in progressValues.value)) {
      progressValues.value[toast.id] = 100
    }
  })
}, { deep: true, immediate: true })
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
