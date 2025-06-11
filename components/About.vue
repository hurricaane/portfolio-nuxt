<template>
  <section id="about" class="py-20 bg-orange-100/50 dark:bg-gray-800/50" ref="sectionRef">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-red-500 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
          À propos de moi
        </h2>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p class="text-orange-800 dark:text-gray-300 text-lg leading-relaxed">
              Ingénieur DevOps freelance, j’accompagne les équipes dans l’automatisation et
              l’industrialisation de leurs environnements cloud. Mon expertise s’appuie sur des outils comme Kubernetes,
              Terraform et GitLab CI/CD, avec pour objectif de sécuriser les déploiements et accélérer les cycles de
              livraison.
            </p>
            <p class="text-orange-800 dark:text-gray-300 text-lg leading-relaxed">
              Curieux et impliqué, je fais également du développement fullstack afin de mieux comprendre les enjeux
              produit et proposer des solutions cohérentes de bout en bout.
            </p>

            <div class="flex flex-wrap gap-4 mt-8">
              <div v-for="stat in stats" :key="stat.label"
                class="bg-orange-50 dark:bg-gray-900 px-4 py-2 rounded-lg border border-orange-200 dark:border-gray-700">
                <component v-if="stat.icon" :is="stat.icon" class="w-5 h-5 text-orange-600 dark:text-cyan-400 inline" />
                <span v-else class="text-orange-600 dark:text-cyan-400 font-semibold">{{ stat.value }}</span>
                <span class="text-orange-800 dark:text-gray-300 ml-2">{{ stat.label }}</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <div
              class="bg-gradient-to-br from-orange-200/30 to-red-200/30 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-2xl p-8 border border-orange-300 dark:border-gray-700">
              <div class="space-y-4">
                <div v-for="skill in skills" :key="skill.name" class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-orange-800 dark:text-gray-300">{{ skill.name }}</span>
                    <span class="text-orange-600 dark:text-cyan-400">{{ animatedValues[skill.key] }}%</span>
                  </div>
                  <div class="w-full bg-orange-300 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-orange-500 to-red-500 dark:from-cyan-500 dark:to-blue-500 h-2 rounded-full transition-all duration-100 ease-out"
                      :style="{ width: `${animatedValues[skill.key]}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { Infinity } from 'lucide-vue-next'

interface Stat {
  value?: string
  icon?: LucideIcon
  label: string
}

interface Skill {
  key: 'automation' | 'cicd' | 'cloud' | 'monitoring' | 'security' | 'devops' | 'fullstack'
  name: string
  percentage: number
}

interface AnimatedValues {
  automation: number
  cicd: number
  cloud: number
  monitoring: number
  security: number
  devops: number
  fullstack: number
}

interface TargetValues {
  automation: number
  cicd: number
  cloud: number
  monitoring: number
  security: number
  devops: number
  fullstack: number
}

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref<boolean>(false)

const stats = ref<Stat[]>([
  { value: "3+", label: "années d'expérience DevOps" },
  { value: "100%", label: "Infrastructure As Code" },
  { icon: Infinity, label: "envies d'optimisation" },
])

const skills = ref<Skill[]>([
  { key: "automation", name: "Automatisation & IaC", percentage: 95 },
  { key: "cicd", name: "CI/CD & Industrialisation", percentage: 92 },
  { key: "cloud", name: "Cloud & Conteneurisation", percentage: 88 },
  { key: "monitoring", name: "Observabilité & Monitoring", percentage: 75 },
  { key: "security", name: "Sécurité", percentage: 70 },
  { key: "devops", name: "Culture DevOps", percentage: 70 },
  { key: "fullstack", name: "Développement fullstack", percentage: 50 },
])

const animatedValues = ref<AnimatedValues>({
  automation: 0,
  cicd: 0,
  cloud: 0,
  monitoring: 0,
  security: 0,
  devops: 0,
  fullstack: 0,
})
const targetValues: TargetValues = {
  automation: 95,
  cicd: 92,
  cloud: 88,
  monitoring: 75,
  security: 70,
  devops: 70,
  fullstack: 50,
}

const animateBars = (): void => {
  const duration: number = 2000 // 2 secondes
  const steps: number = 60 // 60 frames
  const stepDuration: number = duration / steps
  let currentStep: number = 0

  const interval: NodeJS.Timeout = setInterval(() => {
    currentStep++
    const progress: number = currentStep / steps

    // Fonction d'easing  pour une animation fluide
    const easeOutQuart: number = 1 - Math.pow(1 - progress, 4)

    animatedValues.value = {
      automation: Math.round(targetValues.automation * easeOutQuart),
      cicd: Math.round(targetValues.cicd * easeOutQuart),
      cloud: Math.round(targetValues.cloud * easeOutQuart),
      monitoring: Math.round(targetValues.monitoring * easeOutQuart),
      security: Math.round(targetValues.security * easeOutQuart),
      devops: Math.round(targetValues.devops * easeOutQuart),
      fullstack: Math.round(targetValues.fullstack * easeOutQuart),
    }

    if (currentStep >= steps) {
      clearInterval(interval)
    }
  }, stepDuration)
}

onMounted((): void => {
  // Vérification de l'existence de IntersectionObserver (côté client uniquement)
  if (import.meta.client && sectionRef.value) {
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          animateBars()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.value)

    // Nettoyage lors de la desctruction du composant
    onUnmounted((): void => {
      observer.disconnect()
    })
  }
})
</script>
