import App from '../App'

const index = r => require.ensure([], () => r(require('../page/index/index')), 'index');
const solution = r => require.ensure([], () => r(require('../page/solution/solution')), 'solution');
const aboutUs = r => require.ensure([], () => r(require('../page/aboutUs/aboutUs')), 'aboutUs');
const contactUs = r => require.ensure([], () => r(require('../page/contactUs/contactUs')), 'contactUs');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
const registerAccount = r => require.ensure([], () => r(require('../page/registerAccount/registerAccount')), 'registerAccount');
const systemIndex = r => require.ensure([], () => r(require('../page/systemIndex/systemIndex')), 'systemIndex');
const blank = r => require.ensure([], () => r(require('../page/systemIndex/children/blank')), 'blank');
const ontime = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/ontime')), 'ontime');
const funnel = r => require.ensure([], () => r(require('../page/systemIndex/children/analysistool/funnel')), 'funnel');
const ontimeZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/ontimeZaWeb')), 'ontimeZaWeb');
const microOntime = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/microOntime')), 'microOntime');
const trendZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/trendZaWeb')), 'trendZaWeb');
const totalTrend = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/totalTrend')), 'totalTrend');
const pageConfig = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/pageConfig')), 'pageConfig');
const hingeDestinationZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/hingeDestinationZaWeb')), 'hingeDestinationZaWeb');
const qrCodeConf = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/qrCodeConf')), 'qrCodeConf');
const useruse = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/useruse')), 'useruse');
const useruseZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/useruseZaWeb')), 'useruseZaWeb');
const stay = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/stay')), 'stay');
const activity = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/activity')), 'activity');
const onpath = r => require.ensure([], () => r(require('../page/systemIndex/children/analysistool/onpath')), 'onpath');
const smartPath = r => require.ensure([], () => r(require('../page/systemIndex/children/analysistool/smartPath')), 'smartPath');
const smartPathWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/analysistool/smartPathWeb')), 'smartPathWeb');
const smartPathEdit = r => require.ensure([], () => r(require('../page/systemIndex/children/analysistool/smartPathEdit')), 'smartPathEdit');
const earlyWarning = r => require.ensure([], () => r(require('../page/systemIndex/children/analysistool/earlyWarning')), 'earlyWarning');
const userControl = r => require.ensure([], () => r(require('../page/systemIndex/children/configurepage/userControl')), 'userControl');
const serviceConfiguration = r => require.ensure([], () => r(require('../page/systemIndex/children/configurepage/serviceConfiguration')), 'serviceConfiguration');
const pathManager = r => require.ensure([], () => r(require('../page/systemIndex/children/configurepage/pathManager')), 'pathManager');
const netAnalysis = r => require.ensure([], () => r(require('../page/systemIndex/children/appanalysis/netAnalysis')), 'netAnalysis');
const pageLoadPer = r => require.ensure([], () => r(require('../page/systemIndex/children/appanalysis/pageLoadPer')), 'pageLoadPer');
const errorInfoApp = r => require.ensure([], () => r(require('../page/systemIndex/children/appanalysis/errorInfoApp')), 'errorInfoApp');
const microTrend = r => require.ensure([], () => r(require('../page/systemIndex/children/micropro/microTrend')), 'microTrend');
const microUseruse = r => require.ensure([], () => r(require('../page/systemIndex/children/micropro/microUseruse')), 'microUseruse');
const microStay = r => require.ensure([], () => r(require('../page/systemIndex/children/micropro/microStay')), 'microStay');
const pageConfigZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/pageConfigZaWeb')), 'pageConfigZaWeb');
const blockZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/blockZaWeb')), 'blockZaWeb');
const hingeDestination = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/hingeDestination')), 'hingeDestination');
const visualize = r => require.ensure([], () => r(require('../page/systemIndex/children/assessment/visualize')), 'visualize');
const visualizeZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/assessment/visualizeZaWeb')), 'visualizeZaWeb');
const visualizeSearchZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/assessment/visualizeSearchZaWeb')), 'visualizeSearchZaWeb');
const sourceAnalysisZaWeb = r => require.ensure([], () => r(require('../page/systemIndex/children/datatotal/sourceAnalysisZaWeb')), 'sourceAnalysisZaWeb');
const block = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/block')), 'block');
const urllog = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/urllog')), 'urllog');
const activeOntime = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/activeOntime')), 'activeOntime');
const externalChannel = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/externalChannel')), 'externalChannel');
const madeasm = r => require.ensure([], () => r(require('../page/systemIndex/children/asmconfigure/madeasm')), 'madeasm');

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue

    { //地址为空时跳转home页面
      path: '',
      redirect: '/index'
    },

    //首页
    {
      path: '/index',
      component: index
    },

    //解决方案
    {
      path: '/solution',
      component: solution
    },

    //关于我们
    {
      path: '/aboutUs',
      component: aboutUs
    },

    //联系我们
    {
      path: '/contactUs',
      component: contactUs
    },
    //立即试用落地页
    {
      path: '/registerAccount',
      component: registerAccount
    },
    //用户登录
    {
      path: '/login',
      component: login
    },
    //系统顶层路由
    {
      path: '/systemIndex',
      component: systemIndex,
      children: [ //二级路由。对应systemIndex.vue
        {
          path: 'datatotal/ontime',
          component: ontime,
        },
        {
          path: 'datatotal/ontimeZaWeb',
          component: ontimeZaWeb,
        },
        {
          path: 'datatotal/trendZaWeb',
          component: trendZaWeb,
        },
        {
          path: 'datatotal/totalTrend',
          component: totalTrend,
        },
        {
          path: 'micropro/microOntime',
          component: microOntime
        },
        {
          path: 'analysistool/funnel',
          component: funnel,
        },
        {
          path: 'datatotal/useruse',
          component: useruse,
        },
        {
          path: 'datatotal/useruseZaWeb',
          component: useruseZaWeb,
        },
        {
          path: 'datatotal/stay',
          component: stay,
        },
        {
          path: 'datatotal/activity',
          component: activity,
        },
        {
          path: 'asmconfigure/pageConfig',
          component: pageConfig,
        },
        {
          path: 'asmconfigure/hingeDestinationZaWeb',
          component: hingeDestinationZaWeb,
        },
        {
          path: 'asmconfigure/qrCodeConf',
          component: qrCodeConf,
        },
        {
          path: 'analysistool/onpath',
          component: onpath,
        },
        {
          path: 'analysistool/smartPath',
          component: smartPath,
        },
        {
          path: 'analysistool/smartPathWeb',
          component: smartPathWeb,
        },
        {
          path: 'analysistool/smartPathEdit',
          component: smartPathEdit,
        },
        {
          path: 'configurepage/userControl',
          component: userControl,
        },
        {
          path: 'configurepage/serviceConfiguration',
          component: serviceConfiguration,
        },
        {
          path: 'configurepage/pathManager',
          component: pathManager,
        },
        {
          path: 'appanalysis/pageLoadPer',
          component: pageLoadPer,
        },
        {
          path: 'appanalysis/errorInfoApp',
          component: errorInfoApp,
        },
        {
          path: 'analysistool/earlywarning',
          component: earlyWarning,
        },
        {
          path: 'appanalysis/netAnalysis',
          component: netAnalysis
        },
        {
          path: 'micropro/microTrend',
          component: microTrend
        },
        {
          path: 'micropro/microUseruse',
          component: microUseruse
        },
        {
          path: 'micropro/microStay',
          component: microStay
        },
        {
          path: 'asmconfigure/pageConfigZaWeb',
          component: pageConfigZaWeb
        },
        {
          path: 'asmconfigure/blockZaWeb',
          component: blockZaWeb
        },
        {
          path: 'asmconfigure/hingeDestination',
          component: hingeDestination
        },
        {
          path: 'assessment/visualizeZaWeb',
          component: visualizeZaWeb
        },
        {
          path: 'assessment/visualizeSearchZaWeb',
          component: visualizeSearchZaWeb
        },
        {
          path: 'assessment/visualize',
          component: visualize,
        },
        {
          path: 'datatotal/sourceAnalysisZaWeb',
          component: sourceAnalysisZaWeb
        },
        {
          path: 'asmconfigure/block',
          component: block
        },
        {
          path: 'asmconfigure/urllog',
          component: urllog
        },
        {
          path: 'asmconfigure/activeOntime',
          component: activeOntime
        },
        {
          path: 'asmconfigure/externalChannel',
          component: externalChannel
        },
        {
          path: 'asmconfigure/madeasm',
          component: madeasm
        },
        {
          path: 'blank',
          component: blank
        },
        {
          path: '*',
          redirect: 'blank',
        }
      ]
    },

    // { //地址为其他时跳转home页面
    //   path: '*',
    //   redirect: '/index'
    // },
  ]
}]
