<template>
  <aside :class="{ collapse: collapsed }">
    <el-menu
      class="aside-menu"
      default-active="1-4-1"
      active-text-color="#fff"
      text-color="#fff"
      background-color="transparent"
      :collapse="collapsed"
      router
    >
      <el-submenu
        popper-class="aside-submenu"
        v-for="(menu, index) in menus"
        :key="menu.id"
        :index="index.toString()"
      >
        <template slot="title">
          <svg-icon :icon="menu.meta.icon"></svg-icon>
          <span slot="title">{{ menu.meta.name }}</span>
        </template>
        <el-menu-item
          v-for="child in menu.children"
          :key="child.id"
          :index="child.path"
        >
          {{ child.meta.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </aside>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { routes } from "@/router/index";

@Component
export default class LayoutAside extends Vue {
  private menus = routes.filter(item => item.meta);

  get collapsed() {
    return this.$store.state.app.asideCollapse;
  }
}
</script>
<style lang="scss" scoped>
aside {
  flex: 0 0 250px;
  background-color: #344a5f;
  transition: all 0.1s ease 0s;

  .svg-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  &.collapse {
    width: 65px;
    flex-basis: 65px;
  }
}
</style>
