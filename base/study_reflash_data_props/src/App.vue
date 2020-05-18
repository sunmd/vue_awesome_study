<template>
  <div id="app">
    <p>
        <button @click="handleNameChange"> change this.name</button>
        <button @click="handleInfoChange"> change this.info</button>
        <button @click="handleListChange"> change this.list</button>
    </p>
    <p>
        <PropsAndData :list="list" :name="name" :info="info" > </PropsAndData>
    </p>
  </div>
</template>

<script>
import PropsAndData from "./components/PropsAndData.vue"
let name = "world!"
let number = 1
export default {
    name: 'App',
    components: {
        PropsAndData
    },
    data() {
        this.name = name;
        return {
            name: this.name,
            info: {
                // number: undefined
                  },
            list: []
        };
    },
    methods: {
         handleNameChange() {
            this.name = name + Date.now()
            console.log("this.name is change", this.name)
         },
         handleInfoChange() {
            number = number + 1
            this.info.number = number
            console.log("this.info.number is change", this.info.number)
         },
         handleListChange() {
            this.list.push(1, 2, 3)
            console.log("this.list is change", this.list)
         }

     }

}
</script>

