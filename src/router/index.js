import App from '../App'

const index = r => require.ensure([], () => r(require('../page/index/index.vue')), 'index');

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue

    {//地址为空时跳转home页面
      path: '',
      redirect: '/index'
    },

    //首页
    {
      path: '/index',
      component: index
    },

  ]
}]
