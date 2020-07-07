<template>
  <nav>
    <div class="menu-button" @click="toggle">
      <svg-icon icon="menu"></svg-icon>
    </div>
    <div class="user-actions">
      管理员
    </div>
    <div class="menu-button" @click="loginOff">
      <svg-icon icon="power"></svg-icon>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class LayoutNav extends Vue {
  toggle() {
    this.$store.commit("app/TOGGLE_ASIDE");
  }
  loginOff() {
    this.$router.replace("/login");
  }
}
</script>
<style lang="scss" scoped>
nav {
  display: flex !important;
  flex: 0 0 75px;
  align-items: stretch;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba($color: #000000, $alpha: 0.1);
  padding: 32px;
  justify-content: space-between;

  & > * {
    align-items: center;
  }

  .menu-button {
    flex: 0 0 75px;
    font-size: 28px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
  }

  .user-actions {
    width: 100%;
    justify-content: end;
    border-right: 1px solid #ededed;
    text-align: right;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
