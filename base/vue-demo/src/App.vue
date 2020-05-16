<template>
    <div name="app">
            <h3>
            单文件组件,用的时nodejs的npm安装vue@cli,后面设置环境变量之后,就可以用vue create里生成数据了
            里面的主界面在pubulic里面,主入口在main.js里面.之后生成实例为app.js,对应的组件都在component里面
            </h3>
            <h3> 添加一个v-module的测试.试一下是否好用就可以</h3>
            <ul>
                <todo-item :del="del" :content="content"></todo-item>
            </ul>
            <h1>{{content}}</h1>
            <input type="text" v-model="content"/>
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
