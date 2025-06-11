<template>
  <section id="contact" class="py-20 bg-orange-50 dark:bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <h2
          class="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
          Restons en contact
        </h2>

        <div class="mb-12">
          <h3 class="text-2xl font-semibold mb-6 text-orange-600 dark:text-cyan-400">Réservez un appel</h3>
          <p class="text-orange-800 dark:text-gray-300 mb-6">
            Planifiez un appel de consultation pour discuter de votre projet et explorer comment nous pourrions
            collaborer.
          </p>

          <div class="bg-orange-100 dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-gray-700 p-6">
            <div class="mb-6">
              <p class="text-orange-800 dark:text-gray-300 text-center mb-4">Veuillez sélectionner la durée d'appel que
                vous préférez :
              </p>
              <div class="grid grid-cols-2 gap-4">
                <button @click="selectDuration(15)"
                  :class="['px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer text-lg font-medium', selectedDuration === 15 ? 'bg-orange-500 dark:bg-cyan-500 text-white shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25' : 'bg-orange-200 text-orange-800 hover:bg-orange-400 hover:text-orange-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white']">
                  15 minutes
                </button>
                <button @click="selectDuration(30)"
                  :class="['px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer text-lg font-medium', selectedDuration === 30 ? 'bg-orange-500 dark:bg-cyan-500 text-white shadow-lg shadow-orange-500 dark:shadow-cyan-500/25' : 'bg-orange-200 text-orange-800 hover:bg-orange-400 hover:text-orange-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600  dark:hover:text-white']">
                  30 minutes
                </button>
              </div>
            </div>

            <!-- Cal.com Embed Container -->
            <div v-if="selectedDuration"
              class="cal-embed-container bg-orange-200 dark:bg-gray-700 rounded-lg overflow-hidden"
              style="min-height: 600px;">
              <div :key="`cal-${selectedDuration}`" ref="calEmbedRef" class="w-full h-full" style="min-height: 600px;">
              </div>
            </div>

            <div v-else
              class="cal-embed-container bg-orange-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center"
              style="min-height: 600px;">
              <div class="text-center text-orange-600 dark:text-gray-400">
                <div class="mb-4">
                  <svg class="w-16 h-16 mx-auto text-orange-400 dark:text-gray-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p class="text-lg font-medium text-orange-800 dark:text-gray-300 mb-2">
                  Sélectionnez une durée pour afficher les créneaux disponibles
                </p>
                <p class="text-orange-400 dark:text-gray-500">Choisissez entre 15 ou 30 minutes ci-dessus pour commencer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-semibold mb-6 text-orange-600 dark:text-cyan-400">Travaillons Ensemble</h3>
            <p class="text-orange-800 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Je suis toujours ouvert à de nouvelles opportunités et à des projets passionnants.
              Que vous ayez besoin d’expertise DevOps, de développement fullstack ou de conseil en architecture cloud,
              je serais ravi d’échanger avec vous.
            </p>

            <div class="space-y-4">
              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-orange-200 dark:bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                  <component :is="Mail" class="text-orange-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p class="text-orange-600 dark:text-gray-400">Email</p>
                  <p class="text-orange-900 dark:text-white">{{ runtimeConfig.public.emailUser }}</p>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="w-12 h-12 bg-orange-200 dark:bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                  <component :is="MapPin" class="text-orange-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p class="text-orange-600 dark:text-gray-400">Localisation</p>
                  <p class="text-orange-900 dark:text-white">Toulouse | Disponible en Télétravail</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-semibold mb-6 text-orange-600 dark:text-cyan-400">Envoyez moi un message</h3>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-orange-800 dark:text-gray-300 mb-2">Nom</label>
                <input id="name" v-model="formData.name" type="text" name="name" required
                  class="w-full px-4 py-3 bg-orange-100 dark:bg-gray-800 border border-orange-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-orange-900 dark:focus:border-cyan-500 dark:text-white" />
              </div>

              <div>
                <label for="email" class="block text-orange-800 dark:text-gray-300 mb-2">Email</label>
                <input id="email" v-model="formData.email" type="email" name="email" required
                  class="w-full px-4 py-3 bg-orange-100 dark:bg-gray-800 border border-orange-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-orange-900 dark:focus:border-cyan-500 dark:text-white" />
              </div>

              <div>
                <label for="message" class="block text-orange-800 dark:text-gray-300 mb-2">Message</label>
                <textarea id="message" v-model="formData.message" name="message" required :rows="5"
                  class="w-full px-4 py-3 bg-orange-100 dark:bg-gray-800 border border-orange-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-orange-900 dark:focus:border-cyan-500 dark:text-white resize-none"></textarea>
              </div>

              <button type="submit" :disabled="isSubmitting"
                class="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 dark:hover:from-cyan-600 dark:hover:to-blue-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                {{ isSubmitting ? "En cours d'envoi..." : 'Envoyer' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, MapPin } from 'lucide-vue-next'

interface FormData {
  name: string
  email: string
  message: string
}

// Reactive data
const formData = ref<FormData>({
  name: '',
  email: '',
  message: ''
})

const selectedDuration = ref<number | null>(null)
const isSubmitting = ref(false)
const calEmbedRef = ref<HTMLElement | null>(null)

const runtimeConfig = useRuntimeConfig()

const CAL_USERNAME = 'yannick-dossou-ihnock'

// Variable pour traquer l'état du script Cal.com
const isCalScriptLoaded = ref(false)
const currentNamespace = ref<string | null>(null)

const loadCalScript = (): Promise<void> => {
  return new Promise((resolve) => {
    // Vérifier si le script est déjà chargé et Cal est disponible
    if ((window as any).Cal && (window as any).Cal.loaded) {
      resolve()
      return
    }

    if (isCalScriptLoaded.value) {
      // Attendre que Cal soit disponible avec timeout
      let attempts = 0
      const maxAttempts = 10 // 1 secondes max
      const checkCal = () => {
        if ((window as any).Cal && (window as any).Cal.loaded) {
          resolve()
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(checkCal, 100)
        } else {
          console.error('Cal.com script failed to load properly')
          resolve() // Résoudre quand même pour éviter le blocage
        }
      }
      checkCal()
      return
    }

    isCalScriptLoaded.value = true

      // Code d'initialisation Cal.com existant...
      ; (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) {
          if (!a.q) a.q = []
          a.q.push(ar)
        }
        let d = C.document
        C.Cal = C.Cal || function () {
          let cal: CalInstance = C.Cal
          let ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement("script")).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments) }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === "string") {
              cal.ns![namespace] = cal.ns![namespace] || api
              p(cal.ns![namespace], ar)
              p(cal, ["initNamespace", namespace])
            } else p(cal, ar)
            return
          }
          p(cal, ar)
        }
      })(window, "https://app.cal.com/embed/embed.js", "init")

    // Attendre que le script soit complètement chargé
    let attempts = 0
    const maxAttempts = 10
    const checkLoaded = () => {
      if ((window as any).Cal && (window as any).Cal.loaded) {
        // Attendre encore un peu pour s'assurer que tout est initialisé
        setTimeout(() => resolve(), 200)
      } else if (attempts < maxAttempts) {
        attempts++
        setTimeout(checkLoaded, 100)
      } else {
        console.error('Cal.com script loading timeout')
        resolve()
      }
    }
    checkLoaded()
  })
}

const cleanupPreviousEmbed = () => {
  if (!calEmbedRef.value) return

  // Nettoyer le contenu HTML
  calEmbedRef.value.innerHTML = ''

  // Nettoyer le namespace précédent si il existe
  if (currentNamespace.value && (window as any).Cal?.ns?.[currentNamespace.value]) {
    try {
      // Supprimer le namespace pour éviter les conflits
      delete (window as any).Cal.ns[currentNamespace.value]
    } catch (error) {
      console.log('Cleanup attempt (this is normal):', error)
    }
  }
}

const loadCalEmbed = async () => {
  if (!calEmbedRef.value || !(window as any).Cal || !selectedDuration.value) return

  const Cal = (window as any).Cal
  const namespace = selectedDuration.value === 15 ? '15min' : '30min'
  const calLink = `${CAL_USERNAME}/${namespace}`

  // Nettoyer l'embed précédent
  cleanupPreviousEmbed()

  // Attendre un peu pour que le nettoyage soit effectif
  await new Promise(resolve => setTimeout(resolve, 200))

  try {
    // Mettre à jour le namespace courant
    currentNamespace.value = namespace

    // Initialiser Cal.com avec le namespace correspondant à la durée
    Cal('init', namespace, {
      origin: 'https://cal.com'
    })

    // Attendre que le namespace soit bien initialisé
    let retries = 0
    const maxRetries = 10
    while (!Cal.ns[namespace] && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100))
      retries++
    }

    if (!Cal.ns[namespace]) {
      console.error('Failed to initialize Cal namespace')
      return
    }

    // Charger l'embed inline
    Cal.ns[namespace]('inline', {
      elementOrSelector: calEmbedRef.value,
      config: {
        layout: 'month_view'
      },
      calLink: calLink
    })

    // Configuration de l'UI
    Cal.ns[namespace]('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view'
    })

    // Écouter les événements Cal.com
    Cal.ns[namespace]('on', {
      action: 'booking',
      callback: onBookingSuccess
    })

    Cal.ns[namespace]('on', {
      action: 'bookingSuccessful',
      callback: onBookingSuccess
    })

    Cal.ns[namespace]('on', {
      action: '__iframeReady',
      callback: () => {
        console.log(`Cal.com iframe is ready for ${namespace}`)
      }
    })

  } catch (error) {
    console.error('Error loading Cal.com embed:', error)
  }
}

const selectDuration = async (duration: number) => {
  // Éviter les double-clics sur la même durée
  if (selectedDuration.value === duration) return

  selectedDuration.value = duration

  // Attendre que le DOM soit mis à jour
  await nextTick()

  try {
    // Charger le script Cal.com si nécessaire
    await loadCalScript()

    // Attendre plus longtemps pour s'assurer que Cal.com est complètement prêt
    await new Promise(resolve => setTimeout(resolve, 500))

    // Charger l'embed
    await loadCalEmbed()
  } catch (error) {
    console.error("Erreur lors de l'initialisation de Cal.com:", error)
  }
}

// Callback pour gérer le succès de la réservation
const onBookingSuccess = (event: any) => {
  console.log('Booking successful:', event)

  // Afficher le toast de succès
  const { success } = useToast()
  success('🎉  Votre appel a été réservé avec succès ! Vous recevrez sous peu un email de confirmation.', {
    showProgress: true,
    duration: 3000,
  })
}

const handleSubmit = async () => {
  isSubmitting.value = true
  const { success, error } = useToast()

  try {
    await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        to: runtimeConfig.public.emailUser,
        subject: `New message from ${formData.value.name}`,
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message
      }
    })

    success("Merci pour votre message. Je vous répondrais dans les plus brefs délais", {
      showProgress: true,
      duration: 3000,
    })
    formData.value = { name: '', email: '', message: '' }

  } catch (logError) {
    console.error('Error sending message: ', logError)
    error("Erreur lors de l'envoi du message.", {
      showProgress: true,
      duration: 3500
    })
  } finally {
    isSubmitting.value = false
  }
}

// Nettoyer au démontage du composant
onUnmounted(() => {
  cleanupPreviousEmbed()
})
</script>

<style scoped>
.cal-embed-container {
  /* Styles pour personnaliser l'apparence de l'embed Cal.com */
}

/* Styles pour personnaliser Cal.com */
:deep(.cal-embed) {
  border-radius: 0.5rem;
}

/* Styles spécifiques pour Cal.com en thème sombre */
:deep([data-cal-namespace="30min"]) {
  background-color: transparent !important;
}

:deep([data-cal-namespace="30min"] iframe) {
  border-radius: 0.5rem;
  background-color: #374151 !important;
}

:deep([data-cal-namespace="15min"]) {
  background-color: transparent !important;
}

:deep([data-cal-namespace="15min"] iframe) {
  border-radius: 0.5rem;
  background-color: #374151 !important;
}
</style>
