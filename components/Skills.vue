<template>
  <section id="skills" class="py-20 bg-orange-50 dark:bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <h2
          class="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
          Mes Compétences
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="(category, index) in skillCategories" :key="index"
            class="bg-orange-100 border-orange-200 hover:border-orange-400/50 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <CardHeader class="text-center">
              <component :is="category.icon" :size="48" class="mx-auto mb-4 text-orange-700 dark:text-gray-400" />
              <CardTitle class="text-xl font-semibold text-orange-600 dark:text-cyan-400">
                {{ category.title }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex"
                  class="bg-orange-50 dark:bg-gray-900 px-3 py-2 rounded-lg text-center text-orange-800 dark:text-gray-300 hover:bg-orange-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  {{ skill }}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { Cloud, LayoutDashboard, Cog, Server } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: string[]
}

const skillCategories = ref<SkillCategory[]>([
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["Kubernetes", "Helm", "Docker", "Terraform", "Ansible", "AWS", "Scaleway", "Gitlab CI", "Github Actions"]
  },
  {
    title: "Outils & Monitoring",
    icon: Cog,
    skills: ["Git", "Prometheus", "Grafana", "Datadog", "ElasticSearch", "Kibana", "Fluentd", "Trivy", "Semgrep"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Go", "Python", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  {
    title: "Frontend",
    icon: LayoutDashboard,
    skills: ["Nuxt.js", "Vue.js", "Typescript", "Tailwind CSS"]
  },
])
</script>

<style scoped></style>
