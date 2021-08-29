import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Default from './layouts/Default.vue'
import NoSidebar from './layouts/NoSiderBar.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.component('default-layout',Default)
Vue.component('no-sidebar-layout',NoSidebar)

Vue.config.productionTip = false
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBVqHA6bwUaXNEfp-g2zyp9NoGSA4qq-5U',
    libraries: 'places',
  }
});

// import x5GMaps from "x5-gmaps";
// Vue.use(x5GMaps, {
//   key: "AIzaSyCL0RSk2kEqUA7I81aaTFpjLC-v8-Ai5xM",
//   libraries: ["visualization"]
// });


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
