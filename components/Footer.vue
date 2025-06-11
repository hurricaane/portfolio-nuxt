<template>
  <footer class="py-8 border-t bg-orange-100 border-orange-300 dark:bg-black dark:border-gray-800">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div
          class="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-4 md:mb-0 from-orange-500 to-red-600 dark:from-cyan-400 dark:to-blue-500">
          Yannick Dossou
        </div>

        <div class="flex space-x-12 mb-4 md:mb-0">
          <NuxtLink to="https://www.linkedin.com/in/yannick-dossou/"
            class="transition-all duration-300 text-orange-600 hover:text-orange-800 dark:text-gray-400 dark:hover:text-cyan-400 hover:scale-110 hover:-translate-y-1"
            aria-label="LinkedIn">
            <Icon name="mdi:linkedin" size="32" />
          </NuxtLink>
          <NuxtLink to="https://github.com/Hurricaane"
            class="transition-all duration-300 text-orange-600 hover:text-orange-800 dark:text-gray-400 dark:hover:text-cyan-400 hover:scale-110 hover:-translate-y-1"
            aria-label="GitHub">
            <Icon name="mdi:github" size="32" />
          </NuxtLink>
        </div>

        <p class="text-sm text-orange-700 dark:text-gray-400">
          © 2024 Yannick Dossou. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
