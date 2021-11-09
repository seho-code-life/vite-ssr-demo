import App from './App.vue'
import Router from './router'
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Router)
  return { app, router: Router }
}
