<template>
    <div>
        <p>props.info: {{info}} </p>
        <p>props.name: {{name}} </p>
        <p>props.list: {{list}} </p>
        <p>data.a: {{ a }} </p>
        <p>
            <button @click="handleDataB">change data.b</button>
        </p>

    </div> 
</template>

<script>
export default {
    name: "PropsAndData",
    props: {
        info: Object,
        name: String,
        list: Array
    }, 
    data() {
        return{
            a: "hello",
            b: "world!"
        };
    },
    updated() {
        console.log("当前数据已经刷新, updatud触发了");
    },
    methods: {
         handleDataB() { 
            this.b = "vue" + Date.now()
            console.log("change data b:", this.b)
         }
    }
}
</script>
