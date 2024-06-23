import './assets/style.scss'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Chart", Chart);
app.component("Toast", Toast);

app.mount('#app');