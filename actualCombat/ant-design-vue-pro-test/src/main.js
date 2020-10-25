import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authoried from "./components/Authoried.vue";
import Auth from "./directives/auth";
import {
  Layout,
  Icon,
  Drawer,
  Button,
  Radio,
  Menu,
  Input,
  Form,
  Select
} from "ant-design-vue";

Vue.config.productionTip = false;

// 这种方式使用的是ali的服务器下载svg数据
const IconNotFound = Icon.createFromIconfontCN({ scriptUrl: "//at.alicdn.com/t/font_2156610_c9xb6j1kzmw.js"});

Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Auth);
Vue.use(Input);
Vue.use(Form);
Vue.use(Select);

Vue.component("Authoried", Authoried);
Vue.component("IconNotFound", IconNotFound);

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
