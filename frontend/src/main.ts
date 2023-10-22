import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mitt from 'mitt';
//global css
import '@/styles/common.scss';
import { createPinia } from 'pinia';
// import { DayjsKey } from './types/symbols';

const emitter = mitt();
const pinia = createPinia();

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;

//directives...
app.directive('focus', {
	mounted: el => el.focus(),
});

app.use(store).use(router).use(pinia).mount('#app');
