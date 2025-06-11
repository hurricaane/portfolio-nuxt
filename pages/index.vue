<template>
  <div>
    <Hero />
    <About />
    <Skills />
    <Projects @project-click="openProjectModal" />
    <Contact />

    <ProjectModal v-if="selectedProject" :project="selectedProject" @close="closeProjectModal" />
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

const selectedProject: Ref<Project | null> = ref(null)

// Metadata
useHead({
  title: 'Portfolio - Accueil',
  meta: [
    { name: 'description', content: 'Portfolio personnel avec mes projets et compétences' }
  ]
})

// Project modals
const openProjectModal = (project: Project): void => {
  selectedProject.value = project
}
const closeProjectModal = (): void => {
  selectedProject.value = null
}
</script>
