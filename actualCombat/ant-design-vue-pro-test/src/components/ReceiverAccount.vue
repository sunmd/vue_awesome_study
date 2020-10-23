<template>
  <div>
    <a-input-group compact>
      <a-select style="width: 130px;" v-model="type" @change="handleTypeChange">
        <a-select-option value="alipay">
          支付宝
        </a-select-option>
        <a-select-option value="bank">
          银行
        </a-select-option>
      </a-select>
      <a-input
        style="width: calc(100% - 130px)"
        v-model="number"
        @change="handleNumberChane"
      />
    </a-input-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value(val) {
      Object.assign(this, val);
    }
  },
  data() {
    const { type, number } = this.value || {};
    console.log("this.value", this.value);
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChane(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    }
  }
};
</script>

<style></style>
