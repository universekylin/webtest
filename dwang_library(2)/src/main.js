import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

createApp(App).mount('#app')
