<template>
  <div>
    <LoadingScreen :is-loading="isLoading" />

    <div v-show="!isLoading" class="app-content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoading, stopLoading } = useLoading()

const initializeApp = async () => {
  try {
    await nextTick()

    await new Promise(resolve => setTimeout(resolve, 100))

    await stopLoading()
  } catch (error) {
    console.error("Erreur lors de l'initialisation : ", error)
    setTimeout(() => stopLoading(), 2000)
  }
}

onMounted(() => {
  initializeApp()
})

// Meta tags pour éviter le flash pendant le chargement initial
useHead({
  htmlAttrs: {
    class: 'dark' // Classe dark par défaut sur l'élément html
  },
  bodyAttrs: {
    class: 'bg-gray-900' // Background dark par défaut sur le body
  }
})
</script>

<style>
/* Styles globaux pour éviter le flash */
html {
  /* Applique le dark mode par défaut pendant le chargement */
  color-scheme: dark;
}

.app-content {
  /* Transition douce lors de l'apparition du contenu */
  animation: contentFadeIn 0.5s ease-out;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Assurer que le body prend toute la hauteur */
html,
body,
#__nuxt {
  height: 100%;
}
</style>
