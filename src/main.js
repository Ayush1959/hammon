import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

require('bootstrap')
// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue)


// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// var url = window.location.origin;
Vue.prototype.$hostname = 'https://hamon-interviewapi.herokuapp.com';
Vue.prototype.$api_key = '/?api_key=1Ee46';
Vue.prototype.$api_keys = '/&api_key=1Ee46';

import axios from 'axios'
Vue.prototype.$axios = axios;
// window.axios = axios

// add these before Vue is instantiated
// axios.defaults.baseURL = 'http://127.0.0.1:3333'
import ElementUI from "element-ui";
Vue.use(ElementUI, {
    locale
});


import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

import {
    routes
} from './route'

export const EventBus = new Vue();

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history'
});

// router.beforeEach((to, from, next) => {
//     console.log('global before each');
//     next();
// })

new Vue({
    el: '#app',
    mode: 'history',
    router,
    render: h => h(App)
})