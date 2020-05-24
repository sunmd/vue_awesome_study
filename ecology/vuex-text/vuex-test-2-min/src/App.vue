<template>
  <div id="app">
    count: {{count}}
    <button @click="increment">count++</button>
    <p>111 {{countTwo}}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    count() {
      return this.$store.state.count;
    },
    countTwo() {
      return this.$store.getters.doubleCount;
    }
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    }
  }
};
</script>

<style>
</style>
