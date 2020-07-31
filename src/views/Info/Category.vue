<template>
  <div class="container">
    <div></div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

class Category {}

@Component
export default class Dashboard extends Vue {
  private Categories: Array<Category> = new Array<Category>();
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}
</style>
