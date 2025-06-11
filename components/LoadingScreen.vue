<template>
  <Teleport to="body">
    <transition name="loading-fade" appear>
      <div v-if="isLoading" class="loading-screen">
        <!-- Background avec les couleurs qui correspondent au dark mode -->
        <div class="loading-background"></div>

        <!-- Contenu du loading -->
        <div class="loading-content">

          <!-- Spinner animé -->
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>

          <div class="loading-logo">
            <h1 class="loading-title">Chargement...</h1>
          </div>

          <!-- Texte de chargement optionnel -->
          <!-- <p class="loading-text">Chargement du site...</p> -->
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: true
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loading-background {
  position: absolute;
  inset: 0;
  /* Couleurs dark mode par défaut pour éviter le flash */
  background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
}

.loading-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.loading-logo {
  text-align: center;
}

.loading-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: titlePulse 2s ease-in-out infinite;
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-top: 2px solid #06b6d4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 45px;
  height: 45px;
  top: 7.5px;
  left: 7.5px;
  border-top-color: #3b82f6;
  animation-duration: 1.5s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 30px;
  height: 30px;
  top: 15px;
  left: 15px;
  border-top-color: #06b6d4;
  animation-duration: 2s;
}

.loading-text {
  color: #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  animation: textFade 2s ease-in-out infinite alternate;
}

/* Animations */
@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

@keyframes titlePulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes textFade {
  0% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}

/* Transition du loading screen */
.loading-fade-enter-active {
  transition: opacity 0.3s ease;
}

.loading-fade-leave-active {
  transition: opacity 0.5s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .loading-title {
    font-size: 2rem;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
  }

  .spinner-ring:nth-child(2) {
    width: 37.5px;
    height: 37.5px;
    top: 6.25px;
    left: 6.25px;
  }

  .spinner-ring:nth-child(3) {
    width: 25px;
    height: 25px;
    top: 12.5px;
    left: 12.5px;
  }
}
</style>
