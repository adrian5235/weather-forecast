import './assets/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Chart from 'primevue/chart';

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Chart", Chart);

app.mount('#app');