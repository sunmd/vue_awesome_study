<template>
    <li>
        <slot name="pre-icon"></slot>
        <slot name="mid" :del="del" :content="content"></slot>
        <span v-if="!del" >{{content}}</span>
        <span v-else style="text-decoration: line-through">{{content}}</span>
        <button v-show="!del" @click.stop="handleClick">删除</button>
        <slot name="suf-icon"></slot>
    </li>
    
</template>
<script>
export default {
    name: "TodoItem",
    props: {
        content: String,
        del: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
        }
    },
    methods: {
        handleClick() {
            console.log("点击删除!")
            this.$emit("delete", this.content)
        }
    }
}
</script>
