<template>
  <svg :class="CLS">
    <use :xlink:href="ICON"></use>
  </svg>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({ name: "svg-icon" })
export default class SvgIcon extends Vue {
  @Prop()
  private icon!: string;
  @Prop()
  private cls?: string;

  get ICON() {
    return `#icon-${this.icon}`;
  }
  get CLS() {
    return `svg-icon ${this.cls || ""}`.trim();
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
  fill: currentColor;
  display: inline-block;
  line-height: 1;
}
</style>
