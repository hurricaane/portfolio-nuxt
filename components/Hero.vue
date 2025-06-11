<template>
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black from-orange-50 via-amber-50 to-red-50">
    </div>

    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse bg-orange-400/20 dark:bg-cyan-500/10">
      </div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse bg-red-400/20 dark:bg-blue-500/10">
      </div>
    </div>

    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <div class="animate-fade-in">
        <h1
          class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-red-500 to-amber-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600">
          Bonjour, moi c'est Yannick.
        </h1>
        <h2 class="text-2xl md:text-3xl mb-8 text-orange-800 dark:text-gray-300">
          Entre code, cloud et containers, je fluidifie votre delivery !
        </h2>
        <p class="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-orange-700 dark:text-gray-400">
          Consultant DevOps <span class="highlight">freelance</span>, je conçois des infrastructures cloud <span
            class="highlight">fiables</span> et <span class="highlight">scalables</span>, j’automatise les déploiements
          avec Kubernetes, Terraform et des pipelines CI/CD bien rodés. J’aide les équipes à <span
            class="highlight">livrer</span> plus vite, avec moins de friction.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button @click="scrollToSection('projects')"
            class="px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 dark:from-cyan-500 dark:to-blue-500 text-white text-md rounded-lg hover:from-orange-600 hover:to-red-600 dark:hover:from-cyan-600 dark:hover:to-blue-600 transition-all duration-200 transform hover:scale-105 cursor-pointer"
            size="lg">
            Découvrir mes projets
          </Button>
          <Button @click="scrollToSection('contact')"
            class="px-8 py-6 border border-orange-500 dark:border-cyan-500 text-orange-600 dark:text-cyan-400 rounded-lg bg-transparent hover:bg-orange-100 dark:hover:bg-cyan-500/10 transition-all duration-200 transform hover:scale-105 cursor-pointer"
            size="lg">
            Discutons ensemble
          </Button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <button @click="scrollToAbout"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce bg-transparent hover:bg-transparent cursor-pointer">
      <ChevronDown :size="32" class="text-orange-600 dark:text-cyan-400" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

type SectionId = 'about' | 'projects' | 'contact'

const { isDarkMode } = useDarkMode()

const scrollToAbout = (): void => {
  if (!import.meta.client) return

  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToSection = (sectionId: SectionId): void => {
  if (!import.meta.client) return

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
