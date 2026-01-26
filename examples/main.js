/**
 * Created by aresn on 16/6/20.
 */
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './app.vue'
import Minder from '../src/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/editor'
    },
    {
      path: '/editor',
      component: () => import('./routers/editor.vue')
    }
  ]
})

router.beforeEach(() => {
  window.scrollTo(0, 0);
})

const app = createApp(App)
app.use(router)
app.use(Minder)
app.mount('#app')
