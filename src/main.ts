import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from "@primevue/themes/aura";

createApp(App)
    .use(createPinia())
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, tailwind-utilities, primevue',
                },
                darkModeSelector: ".dark"
            }
        }

    })
    .mount('#app')
