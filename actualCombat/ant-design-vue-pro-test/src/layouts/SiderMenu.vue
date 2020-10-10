<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from "ant-design-vue";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" /><span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    console.log("is over");
    console.log(menuData);
    return {
      collapsed: false,
      menuData
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(item => {
        //有name属性且不隐藏的情况
        if (item.name && !item.hiddenInMenu) {
          const newItem = { ...item };
          delete newItem.children;
          //有子属性的情况,且子属性不隐藏
          if (item.children && !item.hiddenChildrenInMenu) {
            newItem.children = this.getMenuData(item.children);
          }
          menuData.push(newItem);
          // 没有名字不隐藏,子属性也不隐藏,且有子属性
        } else if (
          !item.hiddenInMenu &&
          !item.hiddenChildrenInMenu &&
          item.children
        ) {
          menuData.push(...this.getMenuData(item.children));
        }
      });

      /* routes.forEach(item => { */
      /*   if (item.name && !item.hiddenInMenu) { */
      /*     const newItem = [...item]; */
      /*     delete newItem.children; */
      /*     console.log(newItem); */
      /*     if (item.children && !item.hiddenChildrenInMenu) { */
      /*       newItem.children = this.getMenuData(item.children); */
      /*     } */
      /*     menuData.push(newItem); */
      /*     }else if(item.children && !item.hiddenInMenu && !item.hiddenChildrenInMenu) { */
      /*       menuData.push(...this.getMenuData(item.children)); */
      /*     } */
      /* }); */
      return menuData;
    }
  }
};
</script>
