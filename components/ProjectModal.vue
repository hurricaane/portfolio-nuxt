<template>
  <div v-if="project || isClosing" :class="['fixed inset-0 bg-black/80 backgrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300',
    isVisible ? 'opacity-100' : 'opacity-0']" @click="handleClose">
    <div :class="['bg-orange-50 dark:bg-gray-900 rounded-2xl max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto border border-orange-200 dark:border-gray-700 transition-all duration-300',
      isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0']" @click.stop>
      <button @click="handleClose"
        class="absolute top-4 right-4 z-10 p-2 pb-1 bg-orange-100/80 dark:bg-gray-900/80 rounded-full hover:bg-orange-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        type="button">
        <Icon name="lucide:x" size="24" class="text-orange-900 dark:text-white" />
      </button>

      <div class="relative">
        <img :src="project?.image" :alt="project?.title" class="w-full h-64 object-cover rounded-t-2xl" />
        <div class="absolute inset-0 bg-gradient-to-t from-orange-50 dark:from-gray-900 to-transparent rounded-t-2xl">
        </div>
      </div>

      <div class="p-8">
        <h2
          class="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
          {{ project?.title }}
        </h2>

        <p class="text-orange-800 dark:text-gray-300 text-lg mb-8 leading-relaxed">
          {{ project?.details }}
        </p>

        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold text-orange-600 dark:text-cyan-400 mb-4">Outils & Technologies</h3>
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="(tool, index) in project?.tools" :key="index"
                class="px-3 py-2 bg-orange-100 text-orange-600 dark:bg-gray-800 dark:text-cyan-400 rounded-lg border border-orange-300 dark:border-gray-700">
                {{ tool }}
              </span>
            </div>

            <h3 class="text-xl font-semibold text-orange-600 dark:text-cyan-400 mb-4">Architecture</h3>
            <p class="text-orange-800 dark:text-gray-300 leading-relaxed">
              {{ project?.architecture }}
            </p>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-orange-600 dark:text-cyan-400 mb-4">Services Cloud</h3>
            <div class="space-y-2">
              <div v-for="(service, index) in project?.cloudServices" :key="index"
                class="bg-orange-100 dark:bg-gray-800 p-3 rounded-lg border border-orange-300 dark:border-gray-700">
                <span class="text-orange-800 dark:text-gray-300">{{ service }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-center">
          <button @click="handleClose"
            class="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 dark:hover:from-cyan-600 dark:hover:to-blue-600 transition-all duration-200 cursor-pointer">
            Fermer le projet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  tools: string[]
  architecture: string
  cloudServices: string[]
  details: string
}

interface Props {
  project: Project | null
}

const props = defineProps<Props>()

const emits = defineEmits<{
  close: []
}>()

const isVisible = ref(false)
const isClosing = ref(false)

watch(() => props.project, (newProject) => {
  if (newProject) {
    setTimeout(() => {
      isVisible.value = true
    }, 10)
  }
}, { immediate: true })

const handleClose = () => {
  isClosing.value = true
  isVisible.value = false

  setTimeout(() => {
    isClosing.value = false
    emits('close')
  }, 300)
}

// Gestion de la fermeture avec la touche Escape
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.project) {
      handleClose()
    }
  }

  document.addEventListener('keydown', handleEscape)

  // Nettoyage lors de la destruction du composant
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Reset des états quand le projet change vers null
watch(() => props.project, (newProject) => {
  if (!newProject && !isClosing.value) {
    isVisible.value = false
  }
})
</script>
