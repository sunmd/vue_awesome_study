<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
      :selectable="!collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
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
import { check } from "../utils/auth";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" /><span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path" @click="() =>
          $router.push({ path: item.path, query:$route.query })">
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
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    console.log("is over");
    console.log(menuData);
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        //有name属性且不隐藏的情况
        if (item.name && !item.hiddenInMenu) {
          const newItem = { ...item };
          delete newItem.children;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          this.openKeysMap[item.path] = [...parentKeys, item.path];

          //有子属性的情况,且子属性不隐藏
          if (item.children && !item.hiddenChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
          // 没有名字不隐藏,子属性也不隐藏,且有子属性
        } else if (
          !item.hiddenInMenu &&
          !item.hiddenChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }

      return menuData;
    }
  }
};
</script>
