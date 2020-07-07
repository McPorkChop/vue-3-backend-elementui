import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "views/Layout/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Index.vue")
  },
  {
    path: "/layout",
    name: "layout",
    redirect: "dashboard",
    meta: { name: "控制台", icon: "dashboard" },
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard/Index.vue"),
        meta: {
          name: "首页"
        }
      }
    ]
  },
  {
    path: "/info",
    name: "info",
    redirect: "info-list",
    meta: { name: "信息管理", icon: "file" },
    component: Layout,
    children: [
      {
        path: "/info",
        name: "info—list",
        component: () => import("../views/Info/Index.vue"),
        meta: {
          name: "信息列表"
        }
      },
      {
        path: "/info/category",
        name: "category",
        component: () => import("../views/Info/Category.vue"),
        meta: {
          name: "信息分类"
        }
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    redirect: "user-list",
    meta: { name: "用户管理", icon: "user" },
    component: Layout,
    children: [
      {
        path: "/user",
        name: "user-list",
        component: () => import("../views/User/Index.vue"),
        meta: {
          name: "用户列表"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

export { routes };
