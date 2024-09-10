
import InicioView from '@/views/InicioView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/guardados', name: 'favoritos', component: () => import('../views/GuardadosView.vue')}
  ]
})

export default router
