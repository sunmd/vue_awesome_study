import Vue from 'vue'
import App from './App.vue'
import Vuex from './min-vuex'

Vue.config.productionTip = false;
console.log(222,typeof Vuex);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state => state.count++
  }
})

// Vue.prototype.$store = store
console.log(1111,store);
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
