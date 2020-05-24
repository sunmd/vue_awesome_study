<template>
  <div id="app">
    count: {{count}}
    <button @click="increment">count++</button>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    count() {
      return this.$store.state.count;
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
