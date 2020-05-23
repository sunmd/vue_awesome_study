import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {STORE_MUSTATION} from './store/mutation-types'

Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0,
        todos: [{id: 1, text: "1", done: true},
                {id: 2, text: "2", done: false},
                {id: 3, text: "3", done: true},
                {id: 4, text: "4", done: false},
                {id: 5, text: "5", done: true},
                {id: 6, text: "6", done: false},
        ]
    },
    mutations: {
        [STORE_MUSTATION.ADD_COUNT](state) {
            state.count++;
        },
        [STORE_MUSTATION.ADD_NUMBER] : (state, payload) => state.count += payload.acount
    },
    getters: {
        doneTodos: state => state.todos.filter(todo => todo.done ),
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },
        getTodosByid: state => id => state.todos.find(todo => todo.id === id)
    },
    actions: {
        increment: (context) => context.commit(STORE_MUSTATION.ADD_COUNT),
        incrementAsync: ({commit}, payload) => setTimeout(() => commit(STORE_MUSTATION.ADD_NUMBER, payload), 1000),
        incrementAsync2({dispatch}) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("this is async2");
                    dispatch("incrementAsync", {acount:2})
                    resolve("resolve")
                }, 1000)
            })
        },
        actionAysnc({dispatch}) {
            dispatch('incrementAsync2').then((templog) => console.log(templog))
        }

    }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
