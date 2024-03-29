/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createApp, ref } from 'vue'

// Components
import App from './App.vue'

// Composables

const app = createApp(App, {
    setup() {
      return {
        count: ref(0)
      }
    }
  })

registerPlugins(app)

app.mount('#app')

