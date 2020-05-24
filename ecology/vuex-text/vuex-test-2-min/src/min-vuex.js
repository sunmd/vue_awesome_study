import Vue from 'vue'
const Store = function Store(options = {}) {
  console.log(options);
  const{state = {}, mutations = {}, getters = {}} = options;
  const computed = {};
  const store = this;
  store.getters = {};

  // 通过Object.entries,获取参数中getters,然后写入本地的getters
  // 注意for循环里面用的时of不是in,同时注意fn的参数fn(store.state,
  // store.getters)
  for (let [key, fn] of Object.entries(getters)) {
    console.log("key", key)
    console.log("fn", fn)
    computed[key] = function() { return fn(store.state, store.getters); };
    Object.defineProperty(store.getters, key, {
      get: function() {
        return store._vm[key];
      }
    });
  }

  this._vm = new Vue({
    data: {
      $$state: state,
    },
    computed
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
  }else if(options.parent && options.parent.$store) {//很重要的一步,应该和递归有关系.
          this.$store = options.parent.$store;
  }
  console.log(456, this.$store)
}
export default {Store, install}
