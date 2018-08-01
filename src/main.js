// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './vuex/index'
import {
  routerMode
} from './config/env'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Pagination,
  Table,
  TableColumn,
  Button,
  Select,
  Option,
  Dialog,
  Form,
  FormItem,
  DatePicker,
  Loading,
  Popover,
  Tooltip,
  Carousel,
  CarouselItem,
  Switch,
  CheckboxGroup,
  Checkbox
} from 'element-ui'

import 'echarts/lib/chart/map';
import 'echarts/map/js/china.js';
import MA from './assets/MA.js';
MA();

Vue.config.productionTip = false
Vue.use(VueRouter)
//饿了么组件(http://element-cn.eleme.io/#/zh-CN/component/quickstart)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Loading.directive)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)

const router = new VueRouter({
  routes,
  mode: routerMode,
});

// router.beforeEach(({meta, path}, from, next) => {

// })

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});


new Vue({
  router,
  store
}).$mount('#app');