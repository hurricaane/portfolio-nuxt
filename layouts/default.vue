<template>
  <div :key="themeKey"
    class="min-h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-300 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 text-orange-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
    <!-- Header fixe en haut -->
    <Header :key="`header-${themeKey}`" />
    <main :key="`main-${themeKey}`">
      <slot />
    </main>
    <!-- Footer fixe en bas -->
    <Footer :key="`footer-${themeKey}`" />
    <!-- Composant global -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
const { isDarkMode } = useDarkMode()

// Forcer le re-render complet quand le thème change
const themeKey = computed(() => `theme-${isDarkMode.value ? 'dark' : 'light'}-${Date.now()}`)

// S'assurer que les classes sont appliquées correctement après l'hydratation
onMounted(() => {
  if (import.meta.client) {
    // Petite temporisation pour s'assurer que tout est bien initialisé
    nextTick(() => {
      // Forcer une nouvelle vérification du thème
      const { isDarkMode: currentMode } = useDarkMode()
      // Trigger un update si nécessaire
      if (currentMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  }
})
</script>
