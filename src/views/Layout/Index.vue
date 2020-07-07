<template>
  <div id="layout">
    <layout-aside />
    <div class="container">
      <layout-nav />
      <layout-content />
    </div>
  </div>
</template>
<script>
import layoutAside from "./Component/Aside";
import layoutNav from "./Component/Nav";
import layoutContent from "./Component/Content";

import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    layoutAside,
    layoutNav,
    layoutContent
  }
})
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
#layout {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .container {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
