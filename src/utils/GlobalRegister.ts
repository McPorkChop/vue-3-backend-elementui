import Vue from "vue";
import svgIcon from "@/components/SvgIcon.vue";
const requireInst = (instance: __WebpackModuleApi.RequireContext) => {
  return instance.keys().map(instance);
};

const register = {
  svgIcon() {
    Vue.component("svg-icon", svgIcon);
    const resources = require.context("@/assets/svg", false, /\.svg$/);
    requireInst(resources);
  }
};
export default function() {
  register.svgIcon();
}
