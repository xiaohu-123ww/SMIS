import Vue from 'vue'
import 'lib-flexible'
import Cookies from 'js-cookie'
import Nim from '@/assets/NIM_Web_SDK_v8.9.107'
import './utils/rem'
// import 'lib-flexible-computer'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import ElementUI from 'element-ui'
import { Radio } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/icon.css'
import { getFullname } from '@/utils/getFullname'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import EventBus from './utils/EventBus'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import { getseaechlist, gettag, gettalents } from '@/views/talentSquare/components/mixin'
import * as filters from './filters' // global filters
import { constTime, dateFormat, disposeImg, disposeTime, formateDate, handleTree, arrTrans, millisecond } from './utils/ruoyi'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import BaiduMap from 'vue-baidu-map'
import { VueJsonp } from 'vue-jsonp'

import Vant from 'vant'
import 'vant/lib/index.css'
// import './assets/icons/svg/index'

// import * as RongIMLib from '@rongcloud/imlib-v4'
// Vue.use(RongIMLib)
// 全局注册富文本编辑器
// import SvgIcon from '@/components/SvgIcon/index.vue'
// Vue.component('svg-icon', SvgIcon) // 全局注册SvgIcon
Vue.use(Vant)
Vue.use(VueQuillEditor)
Vue.use(VueJsonp)
Vue.use(ElementUI)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.use(Radio)
Vue.use(BaiduMap, {

  ak: '0dZK03G6kSF0M16RXLWrrLkWWORcLsyV'
})
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.NIM = Nim.NIM
Vue.config.productionTip = false
Vue.prototype.gettalents = gettalents
Vue.prototype.getseaechlist = getseaechlist
Vue.prototype.gettag = gettag
Vue.prototype.trees = handleTree
Vue.prototype.disposeImg = disposeImg
Vue.prototype.arrTrans = arrTrans
Vue.prototype.formateDate = formateDate
Vue.prototype.dateFormat = dateFormat
Vue.prototype.millisecond = millisecond

Vue.prototype.disposeTime = disposeTime
Vue.prototype.getFullname = getFullname
Vue.prototype.constTime = constTime
Vue.prototype.EventBus = EventBus
// Vue.config.productionTip = false
// window.addEventListener('beforeunload', (event) => {
//   console.log('页面正在刷新')

//   // 如果需要在页面刷新时显示一个确认对话框，可以这样做：
//   // event.preventDefault()
//   // event.returnValue = ''
// })

// console.log = console.warn = () => { }
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
