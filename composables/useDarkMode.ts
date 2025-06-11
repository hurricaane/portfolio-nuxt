export const useDarkMode = () => {
  // Fonction pour lire la préférence initiale (même logique que le script inline)
  const getInitialDarkMode = (): boolean => {
    if (import.meta.client) {
      const storedPreference = localStorage.getItem('darkMode')
      if (storedPreference !== null) {
        return storedPreference === 'true'
      }
      // Si pas de préférence stockée, utiliser la préférence système
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    // Fallback pour SSR - mais normalement on ne devrait pas arriver ici
    return true
  }

  // État réactif pour le mode sombre - initialisé avec la vraie valeur
  const isDarkMode = ref(getInitialDarkMode())

  // Variables pour stocker les listeners
  let mediaQueryList: MediaQueryList | null = null

  // Fonction pour détecter la préférence système
  const getSystemPreference = (): boolean => {
    if (import.meta.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true // Fallback pour SSR
  }

  // Fonction pour appliquer le mode sombre au DOM
  const applyDarkMode = (value: boolean): void => {
    if (import.meta.client) {
      const html = document.documentElement
      const body = document.body

      if (value) {
        html.classList.add('dark')
        html.style.colorScheme = 'dark'
        body.style.backgroundColor = '#111827' // gray-900
      } else {
        html.classList.remove('dark')
        html.style.colorScheme = 'light'
        body.style.backgroundColor = '#fef7ed' // orange-50
      }

      // Forcer la réactivité de Vue
      nextTick(() => {
        // Déclencher un événement personnalisé pour les composants qui en ont besoin
        window.dispatchEvent(new CustomEvent('dark-mode-changed', {
          detail: { isDarkMode: value }
        }))
      })
    }
  }

  // Listener pour les changements de préférence système
  const handleSystemPreferenceChange = (e: MediaQueryListEvent): void => {
    // Ne changer que si aucune préférence utilisateur n'est stockée
    if (import.meta.client && localStorage.getItem('darkMode') === null) {
      isDarkMode.value = e.matches
    }
  }

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = (): void => {
    if (import.meta.client) {
      const newMode = !isDarkMode.value
      isDarkMode.value = newMode
      // Stocker la préférence utilisateur
      localStorage.setItem('darkMode', newMode.toString())
    }
  }

  // Fonction pour définir explicitement le mode sombre
  const setDarkMode = (value: boolean): void => {
    if (import.meta.client) {
      isDarkMode.value = value
      localStorage.setItem('darkMode', value.toString())
    }
  }

  // Fonction pour réinitialiser vers la préférence système
  const resetToSystemPreference = (): void => {
    if (import.meta.client) {
      localStorage.removeItem('darkMode')
      const systemPrefersDark = getSystemPreference()
      isDarkMode.value = systemPrefersDark
    }
  }

  // Watcher pour appliquer les changements au DOM
  watch(isDarkMode, (newValue: boolean) => {
    applyDarkMode(newValue)
  }, { immediate: true }) // Important: immediate: true

  // Initialisation
  onMounted(() => {
    if (import.meta.client) {
      // CRUCIAL: Re-synchroniser l'état avec ce qui est dans le DOM
      // au cas où le script inline aurait appliqué une valeur différente
      const htmlHasDarkClass = document.documentElement.classList.contains('dark')
      const storedPreference = localStorage.getItem('darkMode')

      let expectedDarkMode: boolean
      if (storedPreference !== null) {
        expectedDarkMode = storedPreference === 'true'
      } else {
        expectedDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      }

      // Si il y a désynchronisation, corriger
      if (htmlHasDarkClass !== expectedDarkMode) {
        applyDarkMode(expectedDarkMode)
      }

      // S'assurer que notre état Vue est correct
      if (isDarkMode.value !== expectedDarkMode) {
        isDarkMode.value = expectedDarkMode
      }

      // Écouter les changements de préférence système
      mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleSystemPreferenceChange)
      } else {
        // Fallback pour les anciens navigateurs
        mediaQueryList.addListener(handleSystemPreferenceChange)
      }
    }
  })

  // Nettoyage lors de la destruction du composant
  onUnmounted(() => {
    if (mediaQueryList) {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleSystemPreferenceChange)
      } else {
        mediaQueryList.removeListener(handleSystemPreferenceChange)
      }
    }
  })

  // Retourner les propriétés et méthodes utilisables
  return {
    isDarkMode: readonly(isDarkMode),
    toggleDarkMode,
    setDarkMode,
    resetToSystemPreference,
    getSystemPreference
  }
}
