import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Layout, Icon, Drawer, Button, Radio, Menu } from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Menu);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// });
