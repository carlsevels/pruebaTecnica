/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';
import { createApp, ref } from 'vue';
import router from './router';

// Components
import App from './App.vue';

// Composables

const app = createApp(App, {
    setup() {
      return {
        count: ref(0)
      }
    }
  }).use(router)

registerPlugins(app)

app.mount('#app')

