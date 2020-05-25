<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price }} 数量:{{product.inventory}}
      <br />
      <button :disabled="getTempProduct(product).count<=0" @click="subTempCart(product)">-</button>
      &nbsp;
      {{getTempProduct(product).count}}
      &nbsp;
      <button
        :disabled="product.inventory <= 0"
        @click="addTempCart(product)"
      >+</button>
      &nbsp;
      <button
        :disabled="getTempProduct(product).count<=0"
        @click="addProductToCart(getTempProduct(product))"
      >加入购物车</button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  inject: ["tempProductList"],
  computed: {
    ...mapState({ products: state => state.products.all })
  },
  // computed: {
  //   products(){
  //     return this.$store.state.products.all
  //   }
  // },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    ...mapActions("products", ["subProductInventory", "addProductInventory"]),
    getTempProduct(product) {
      let temp = this.tempProductList.find(
        tempCart => tempCart.id === product.id
      );
      if (!temp) {
        temp = { id: product.id, count: 0 };
        this.tempProductList.push(temp);
      }
      return temp;
    },
    subTempCart(product) {
      this.addProductInventory(product);
      this.getTempProduct(product).count--;
    },
    addTempCart(product) {
      this.subProductInventory(product);
      this.getTempProduct(product).count++;
    }
  },
  // methods: {
  //   addProductToCart(product){
  //     this.$store.dispatch('cart/addProductToCart', product)
  //   }
  // },
  created() {
    this.$store.dispatch("products/getAllProducts");
  }
};
</script>
