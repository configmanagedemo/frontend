import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/user/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "config",
        name: "Config",
        component: () => import("../views/config/Config.vue"),
      },
      {
        path: "config/upload",
        name: "ConfigUpload",
        component: () => import("../views/config/Upload.vue"),
      },
      {
        path: "config/:filename",
        name: "ConfigView",
        component: () => import("../views/config/View.vue"),
      },
      {
        path: "users",
        name: "UserList",
        component: () => import("../views/user/UserList.vue"),
      },
      {
        path: "user/:uid",
        name: "User",
        component: () => import("../views/user/User.vue"),
      },
      {
        path: "roles",
        name: "RoleList",
        component: () => import("../views/role/RoleList.vue"),
      },
      {
        path: "role/:role_id",
        name: "RoleInfo",
        component: () => import("../views/role/RoleInfo.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
