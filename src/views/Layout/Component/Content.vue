<template>
  <div id="container">
    <div id="container-wrap">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class LayoutContent extends Vue {}
</script>
<style lang="scss" scoped>
#container {
  flex: 1 1 auto;
  padding: 30px;
  background-color: #f7f7f7;
  #container-wrap {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 30px;
  }
}
</style>
