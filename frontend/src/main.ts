import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mitt from 'mitt';
//global css
import '@/styles/common.scss';

// const axiosInstance = axios.create({
// 	withCredentials: true,
// });
const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;

app.use(store).use(router).mount('#app');
