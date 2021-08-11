import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { RouterFactory } from './router';
import store from './store';
import '@/css/tailwind.css';
import i18n from './i18n';
import firebasePlugin from './plugins/firebase';

Vue.config.productionTip = false;
Vue.use(firebasePlugin);

new Vue({
    router: RouterFactory(Vue.prototype.$auth),
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
