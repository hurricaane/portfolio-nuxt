<template>
  <header :class="headerClasses">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Custom Logo -->
        <button @click="scrollToSection('home')"
          class="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-pointer from-orange-500 to-red-600 dark:from-cyan-400 dark:to-blue-500">
          Yannick Dossou
        </button>

        <!-- Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <button @click="scrollToSection('home')" :class="getNavItemClass('home')">
            Accueil
          </button>
          <button @click="scrollToSection('about')" :class="getNavItemClass('about')">
            À propos de moi
          </button>
          <button @click="scrollToSection('skills')" :class="getNavItemClass('skills')">
            Compétences
          </button>
          <button @click="scrollToSection('projects')" :class="getNavItemClass('projects')">
            Projets
          </button>
          <button @click="scrollToSection('contact')" :class="getNavItemClass('contact')">
            Me contacter
          </button>
        </div>

        <!-- Dark Mode Toggle -->
        <div
          class="flex items-center gap-3 backdrop-blur-sm rounded-full p-2 border border-orange-800/20 dark:border-gray-700">
          <Sun :size="18" class="text-yellow-400" />
          <Switch :model-value="isDarkMode" @update:model-value="handleToggleDarkMode"
            class="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-yellow-500 cursor-pointer">
          </Switch>
          <Moon :size="18" class="text-blue-400" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { Switch } from '@/components/ui/switch'

type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contact'

const { isDarkMode, toggleDarkMode, resetToSystemPreference } = useDarkMode()

const isScrolled = ref(true)
const activeSection = ref<SectionId>('home')

const headerClasses = computed(() => {
  return `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled.value
    ? 'bg-orange-50/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-orange-200 dark:border-gray-800'
    : 'bg-transparent'
    }`
})

const handleScroll = (): void => {
  if (!import.meta.client) return

  isScrolled.value = window.scrollY > 50

  // Verifier quelle section est actuellement visible
  if (window.scrollY < window.innerHeight * 0.5) {
    activeSection.value = 'home'
    return
  }

  const sectionElements = ['about', 'skills', 'projects', 'contact'].map(id => document.getElementById(id))
  for (let i = sectionElements.length - 1; i >= 0; i--) {
    const section = sectionElements[i]
    if (section) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
        activeSection.value = (['about', 'skills', 'projects', 'contact'] as SectionId[])[i]
        break
      }
    }
  }
}

const scrollToSection = (sectionId: SectionId): void => {
  if (!import.meta.client) return

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Fonction pour obtenir les classes des éléments de navigation
const getNavItemClass = (sectionId: SectionId): string => {
  const baseClass = "transition-colors duration-200 cursor-pointer"
  return activeSection.value === sectionId
    ? `${baseClass} text-orange-600 dark:text-cyan-400 font-semibold`
    : `${baseClass} text-orange-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-cyan-400`
}

const handleToggleDarkMode = (checked: boolean) => {
  toggleDarkMode()
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  }
})
onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
