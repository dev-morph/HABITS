import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mitt from 'mitt';
//global css
import '@/styles/common.scss';
import { createPinia } from 'pinia';
import '@/router/navigationGuard';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emitter = mitt();
const pinia = createPinia();

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
//components
app.component('VueDatePicker', VueDatePicker);

//directives...
app.directive('focus', {
	mounted: el => el.focus(),
});

app.use(store).use(router).use(pinia).mount('#app');
