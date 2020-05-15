<template>
    <div name="app">
            <h3>
               插槽（slot）的概念很简单，其实就是分发内容。
               插槽分为：普通插槽、作用域插槽、默认插槽
               插槽的作用：传递复杂内容的方式
               作用域插槽的函数理解：
               作用域插槽则可以理解为，本质上是返回组件的函数，我们可以把下面一整段标签当成是一个函数
               然后我们在组件的内部通过`slot`的形式，去调用这个函数，并且给这个函数传递了一个
               value 值：slot:
               templateFunction(value)，在这个函数内，我们可以根据传递的 value
               值来指定各种操作，如：函数返回了一个 span 标签，并在其中显示
               value 值。
               当然我们也可以做其他各种各样的事情，譬如判断 value
               值
            </h3>
            <h3>1.匿名插槽直接什么都直接写</h3>
            <h3>2.具名插槽要协商属性slot</h3>
            <h3>3.作用域插槽里面模板上带上v-if会报错有待研究</h3>
            <ul>
                <todo-item :del="del" :content="content"></todo-item>
            </ul>

            <todo-list>
                <todo-item v-for="item in list" :del="item.del" :key="item.title" :content="item.title" @delete="handleDelete">
                    <span slot="pre-icon"> --前--</span>
                    <template #mid="{del, content}">
                        <span>{{del}}{{content}}</span>
                    </template>
                    <template v-slot:suf-icon>
                        <span > --后--</span>
                    </template>
                </todo-item>
            </todo-list>
        </div>
</template>

<script>
import TodoItem from './components/TodoItem.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoItem,
    TodoList
  },
    data() {
      return{

        content: "123 template",
        del: false,
        list:[

            {
                del: false,
                title: "this is 8"
            },
            {
                del: true,
                title: "this is 9"
            },
            {
                del: true,
                title: "this is 10"
            },
            {
                del: true,
                title: "this is 11"
            },
            {
                del: false,
                title: "this is 12"
            },
            {
                del: false,
                title: "this is 13"
            }
                
            ]
          }
    },
    methods: {

                handleDelete(val) {
                    console.log("handleDelete", val)
                
             }
             
                     
    }
}
</script>

<style>
</style>
