export const useLoading = () => {
  const isLoading = ref(true)
  const minLoadingTime = 1500 // Temps minimum d'affichage du loading (en ms)
  const loadingStartTime = ref(0)

  // Fonction pour démarrer le loading
  const startLoading = (): void => {
    isLoading.value = true
    loadingStartTime.value = Date.now()
  }

  // Fonction pour arrêter le loading avec un délai minimum
  const stopLoading = async (): Promise<void> => {
    const elapsedTime = Date.now() - loadingStartTime.value
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

    // Attendre le temps restant si nécessaire
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime))
    }

    isLoading.value = false
  }

  // Fonction pour arrêter le loading immédiatement (pour les cas d'urgence)
  const stopLoadingImmediate = (): void => {
    isLoading.value = false
  }

  // Initialisation automatique au montage
  onMounted(() => {
    startLoading()
  })

  return {
    isLoading: readonly(isLoading),
    startLoading,
    stopLoading,
    stopLoadingImmediate
  }
}
