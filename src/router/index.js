import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("../views/auth/Login"),
    meta: { authorize: [] }
  },
  {
    path: "/register",
    component: () => import("../views/auth/Register"),
    meta: { authorize: [] }
  },
  {
    path: "/error",
    component: () => import("../views/error/Error"),
    meta: { authorize: [] }
  },
  {
    path: "/unauthorized",
    component: () => import("../views/error/Unauthorized"),
    meta: { authorize: [] }
  },
  {
    path: "/",
    redirect: "/catalogue",
    name: "Home",
    component: Home,
    meta: { authorize: [] },
    children: [
      {
        path: "catalogue",
        name: "Catalogue",
        component: () => import("../views/catalogue/Catalogue"),
        meta: { authorize: [] }
      },
      {
        path: "catalogue/address",
        name: "AddressList",
        component: () => import("../views/catalogue/address/AddressList"),
        meta: { authorize: [] }
      },
      {
        path: "catalogue/address/edit/:id",
        name: "AddressEdit",
        component: () => import("../views/catalogue/address/AddressEdit"),
        meta: { authorize: [] }
      },
      {
        path: "catalogue/dug",
        name: "DugList",
        component: () => import("../views/catalogue/dug/DugList"),
        meta: { authorize: [] }
      },
      {
        path: "catalogue/dug/add",
        name: "DugAdd",
        component: () => import("../views/catalogue/dug/DugAdd"),
        meta: { authorize: [] }
      },
      {
        path: "catalogue/dug/edit/:id",
        name: "DugEdit",
        component: () => import("../views/catalogue/dug/DugEdit"),
        meta: { authorize: [] }
      },
      {
        path: "settings/users",
        name: "UserList",
        component: () => import("../views/settings/user/UserList"),
        meta: { authorize: [] }
      },
      {
        path: "settings/users/edit/:id",
        name: "UserEdit",
        component: () => import("../views/settings/user/UserEdit"),
        meta: { authorize: [] }
      },
      {
        path: "settings/users/delete/:id",
        name: "UserDelete",
        component: () => import("../views/settings/user/UserDelete"),
        meta: { authorize: [] }
      },
      {
        path: "settings/users/add/",
        name: "UserAdd",
        component: () => import("../views/settings/user/UserAdd"),
        meta: { authorize: [] }
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to unauthorized page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const userRole = store.getters["auth/role"];

  if (authorize.length) {
    if (!isAuthenticated || !authorize.includes(userRole)) {
      const err = {
        code: 401,
        message: "You cannot access this page!"
      };
      store.dispatch("error/unauthorized", err);
      router.push("/unauthorized");
    }
  }

  next();
});

export default router;
