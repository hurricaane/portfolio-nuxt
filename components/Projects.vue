<template>
  <section id="projects" class="py-20 bg-orange-100/50 dark:bg-gray-800/50">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <h2
          class="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
          Mes Projets
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <Card v-for="project in projects" :key="project.id"
            class="bg-orange-50 border-orange-200 hover:border-orange-400/50 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer overflow-hidden pt-0"
            @click="handleProjectClick(project)">
            <div class="relative overflow-hidden">
              <img :src="project.image" :alt="project.title"
                class="w-full h-50 object-cover hover:scale-110 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-orange-50/80 dark:from-gray-900/80 to-transparent">
              </div>
            </div>

            <CardHeader class="pb-4">
              <CardTitle class="text-xl text-orange-600 dark:text-cyan-400">
                {{ project.title }}
              </CardTitle>
            </CardHeader>

            <CardContent class="pt-0">
              <p class="text-orange-800 dark:text-gray-300 mb-4 leading-relaxed">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2">
                <Badge v-for="(tag, index) in project.tags" :key="index" variant="outline"
                  class="bg-orange-100 text-orange-600 border-orange-300 hover:bg-orange-200 dark:bg-gray-800 dark:text-cyan-400 dark:border-gray-700 dark:hover:bg-gray-700">
                  {{ tag }}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface Props {
  onProjectClick?: (project: Project) => void
}

const props = withDefaults(defineProps<Props>(), {
  onProjectClick: undefined
})

const emits = defineEmits<{
  projectClick: [project: Project]
}>()

const projects: Project[] = [
  {
    id: 1,
    title: "Infrastructure Multi-Cloud Haute Disponibilité",
    description: "Conception et déploiement d'une architecture multi-cloud critique avec plus de 10 clusters Kubernetes hébergeant 400+ applications en production.",
    image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee",
    tags: ["Multi-Cloud", "Haute Disponibilité", "Kubernetes", "GitOps", "Infrastructure Critique"],
    tools: ["Kubernetes", "Terraform", "ArgoCD", "Ansible", "Scaleway", "Nutanix", "EFK Stack", "Cloud-init"],
    architecture: "Architecture multi-cloud hybride avec clusters primaires/secondaires, interconnexion réseau sécurisée entre cloud souverain et infrastructure on-premises",
    cloudServices: ["Scaleway Kubernetes Kapsule", "Nutanix Private Cloud", "Scaleway Compute", "Scaleway Networking"],
    details: "Mise en place d'une infrastructure complexe gérant 10+ clusters Kubernetes avec architecture HA (primaire/secondaire). Gestion complète via Infrastructure as Code (Terraform) et GitOps (ArgoCD). Sécurisation des accès aux clusters publics via VPN et résolution des défis d'interconnexion réseau. Accompagnement des équipes de développement ayant permis une réduction de 50% du temps de déploiement."
  },
  {
    id: 2,
    title: "Migration et Modernisation d'Application Critique",
    description: "Migration complète d'une application de test de simulateur de vol de Windows vers Linux avec containerisation et optimisation CI/CD.",
    image: "https://images.unsplash.com/photo-1640552435845-d65c23b75934",
    tags: ["Migration", "Containerisation", "CI/CD", "Optimisation", "Azure"],
    tools: ["Docker", "GitLab CI/CD", "Azure", "Datadog", "Linux", "Multi-stage Build"],
    architecture: "Architecture containerisée avec pipeline CI/CD optimisé pour déploiement sur VMs Linux et monitoring centralisé",
    cloudServices: ["Azure Virtual Machines", "Azure Container Registry", "Azure Monitor", "Datadog"],
    details: "Réadaptation complète du code d'une application Boeing (Ada/C++) pour environnement Linux. Implémentation de Docker avec multi-stage build réduisant la taille des images de 5Gi. Optimisation de la CI/CD réduisant le temps de build de 83% (de 1h à 10min). Déploiement de solutions de monitoring Datadog sur Azure pour supervision temps réel."
  },
  {
    id: 3,
    title: "Formateur DevSecOps & Plateforme de Formation",
    description: "Animation de formations Kubernetes et sécurité applicative chez OCTO Technology. Conception d'une infrastructure AWS dédiée aux exercices pratiques Kubernetes.",
    image: "https://cdn.leonardo.ai/users/a4356829-6222-44e6-bbb1-5c189ce63730/generations/43792961-93e8-4ea4-995b-2335625bf258/segments/3:4:1/Lucid_Realism_A_modern_tech_training_session_focused_on_Kubern_2.jpg",
    tags: ["Formateur Expert", "Kubernetes", "Sécurité Applicative", "AWS EKS", "Pédagogie"],
    tools: ["AWS EKS", "Terraform", "Kubernetes", "Code-server", "VPC", "Helm", "Pédagogie Active"],
    architecture: "Architecture pédagogique multi-tenant avec clusters EKS managés, isolation par namespace, et environnements de développement intégrés pour les exercices Kubernetes",
    cloudServices: ["AWS EKS", "AWS VPC", "AWS ALB", "AWS EBS CSI", "AWS Security Groups", "AWS IAM"],
    details: "Formateur expert chez OCTO Technology animant deux formations distinctes : Kubernetes et sécurité applicative. Taux de satisfaction de 95% sur l'ensemble des formations dispensées. Pour la formation Kubernetes, conception et déploiement d'une infrastructure AWS complète avec environnements isolés par élève (Code-server intégré). La formation sécurité applicative couvre les vulnérabilités web (XSS, injection SQL, etc...) avec exercices pratiques hands-on. Réduction de 75% du temps de préparation des environnements Kubernetes grâce à l'automatisation. Accompagnement personnalisé des apprenants du niveau débutant à confirmé."
  },
  {
    id: 4,
    title: "Cluster Kubernetes Sécurisé Open Source",
    description: "Développement d'un template de cluster Kubernetes intégrant les meilleures pratiques de sécurité et d'observabilité avec approche GitOps.",
    image: "https://images.unsplash.com/photo-1667372459607-2cfe842fdc4b",
    tags: ["Sécurité", "GitOps", "Best Practices", "Observabilité", "Open Source"],
    tools: ["Kind", "Terraform", "Helm", "Kyverno", "Falco", "Cilium", "ArgoCD", "Network Policies"],
    architecture: "Architecture cloud-native sécurisée avec politiques de sécurité automatisées, observabilité complète et déploiement GitOps",
    cloudServices: ["Local (Kind)", "Extensible vers AWS/Azure/GCP"],
    details: "Création d'un template de cluster Kubernetes intégrant les outils de sécurité de pointe (Kyverno pour les politiques, Falco pour la détection d'intrusions, Cilium pour le réseau). Approche Infrastructure as Code complète avec Terraform et Helm. Pipeline CI/CD intégré pour les applications déployées. Projet conçu comme référentiel de bonnes pratiques DevSecOps."
  },
  {
    id: 5,
    title: "Portfolio Personnel",
    description: "Développement d'un portfolio moderne et responsive utilisant les dernières technologies frontend avec déploiement automatisé.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
    tags: ["Frontend", "Modern Stack", "Responsive", "Performance", "CI/CD"],
    tools: ["Nuxt.js", "TypeScript", "TailwindCSS v4", "Git", "CI/CD"],
    architecture: "Architecture JAMstack avec génération statique, optimisation des performances et déploiement automatisé",
    cloudServices: ["Vercel/Netlify (déploiement)", "GitHub (versioning)"],
    details: "Création d'un portfolio personnel moderne utilisant Nuxt.js avec TypeScript pour la robustesse du code et TailwindCSS v4 pour un design responsive et performant. Implémentation de bonnes pratiques de développement frontend avec optimisation des performances et accessibilité. Déploiement automatisé via CI/CD."
  }

]

const handleProjectClick = (project: Project): void => {
  if (props.onProjectClick) {
    props.onProjectClick(project)
  }

  emits('projectClick', project)
}
</script>
