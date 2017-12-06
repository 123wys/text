// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import store from './vuex/index'
import {routerMode} from './config/env'

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: routerMode,
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

