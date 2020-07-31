import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./extension/string.extension";
import "element-ui/lib/theme-chalk/index.css";
import global from "@/utils/GlobalRegister.ts";
import "./router/filter";
import "./extension";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
global();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
