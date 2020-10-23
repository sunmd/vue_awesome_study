<template>
  <div>
    <div>帐号: {{ step.payAccount }}</div>
    <div>密码: {{ step.password }}</div>
    <div>服务器返回: {{ step.message }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  }
};
</script>

<style></style>
