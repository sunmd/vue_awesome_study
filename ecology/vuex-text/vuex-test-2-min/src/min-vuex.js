import Vue from 'vue'
const Store = function Store(options = {}) {
  console.log(options);
  const{state  = {}, mutations = {}} = options;
  console.log(state,mutations);
  this._vm = new Vue({
    data: {
      $$state: state
    },
  });
  this._mutations = mutations;
}
Store.prototype.commit = function(type, payload) {
  if(this._mutations[type])
    this._mutations[type](this.state, payload);
}
Object.defineProperties(Store.prototype, {
  state:{
    get: function() {
      return this._vm._data.$$state
    }
  }
});
function install(_vue) {
  console.log(333,typeof _vue, (_vue.version).split('.'));
  console.log(Number((_vue.version).split('.')[0]))
  _vue.mixin({beforeCreate: vuexInit});
}
function vuexInit() {
  let options = this.$options;
  console.log(456, options.store)
  if(options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store() 
      : options.store;
  }else if(options.parent && options.parent.$store) {
          this.$store = options.parent.$store;
  }
  console.log(456, this.$store)
}
// version = Vue.version.splite
export default {Store, install}
