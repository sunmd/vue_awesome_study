<template>
  <div id="app">
    <h3>state测试</h3>
    this is count : {{getCount}}
    <br />
    this is count : {{count}}
    <p>
      <button @click="addCount">count++</button>
    </p>
    <p>
      <button @click="addNumber({acount:2})">count+2</button>
    </p>
    <p>
      <button @click="increment">action count++</button>
    </p>
    <p>
      <button @click="incrementAsync({acount:2})">action count+2</button>
    </p>
    <p>
      <button @click="actionAysnc">actionAysnc count+2</button>
    </p>
    <hr />
    <h3>getters测试</h3>
    <p>{{doneTodos}} : {{doneTodosCount}}</p>
    <p>{{getTodosByid(2)}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions} from "vuex";
import { STORE_MUSTATION } from "./store/mutation-types";
export default {
  name: "App",
  computed: {
    getCount() {
      return this.$store.state.count;
    },
    ...mapState({ count: state => state.count }),
    ...mapGetters(["doneTodos", "doneTodosCount", "getTodosByid"])
  },
  methods: {
    ...mapMutations({
      addCount: STORE_MUSTATION.ADD_COUNT,
      addNumber: STORE_MUSTATION.ADD_NUMBER
    }),
    ...mapActions(['increment', 'incrementAsync', 'incrementAsync2', 'actionAysnc'])

    /* addCount() { */
    /*    this.$store.commit(STORE_MUSTATION.ADD_COUNT); */
    /* } */
  }
};
</script>

<style>
</style>
