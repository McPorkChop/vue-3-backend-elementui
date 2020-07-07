import router from "./index";
import cookie from "cookie_js";
import { COOKIE } from "../utils/constant";
import store from "@/store";

const whiteList = ["/login"];
const token = () => {
  return cookie.get(COOKIE.token);
};

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    store.commit("app/LOGIN_OFF");
  }
  if (whiteList.indexOf(to.path) > -1) next();
  else if (token()) next();
  else next("/login");
});
