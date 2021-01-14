import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Role } from "@/common";
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
        path: "catalogue/dailyreport",
        name: "DailyReport",
        component: () => import("../views/catalogue/report/DailyReport"),
        meta: { authorize: [Role.Admin, Role.User, Role.Reviewer] }
      },
      {
        path: "catalogue/address/view/:state",
        name: "AddressList",
        component: () => import("../views/catalogue/address/AddressList"),
        meta: { authorize: [Role.Admin, Role.User, Role.Reviewer] }
      },
      {
        path: "catalogue/address/edit/:state",
        name: "AddressEdit",
        component: () => import("../views/catalogue/address/AddressEdit"),
        meta: { authorize: [Role.Admin, Role.User, Role.Reviewer] }
      },
      {
        path: "catalogue/dug",
        name: "DugList",
        component: () => import("../views/catalogue/dug/DugList"),
        meta: { authorize: [Role.Admin, Role.User, Role.Reviewer] }
      },
      {
        path: "catalogue/dug/add",
        name: "DugAdd",
        component: () => import("../views/catalogue/dug/DugAdd"),
        meta: { authorize: [Role.Admin, Role.User, Role.Reviewer] }
      },
      {
        path: "catalogue/dug/edit/:id",
        name: "DugEdit",
        component: () => import("../views/catalogue/dug/DugEdit"),
        meta: { authorize: [Role.Admin, Role.User, Role.Reviewer] }
      },
      {
        path: "settings/users",
        name: "UserList",
        component: () => import("../views/settings/user/UserList"),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "settings/users/edit/:id",
        name: "UserEdit",
        component: () => import("../views/settings/user/UserEdit"),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "settings/users/delete/:id",
        name: "UserDelete",
        component: () => import("../views/settings/user/UserDelete"),
        meta: { authorize: [Role.Admin] }
      },
      {
        path: "settings/users/add/",
        name: "UserAdd",
        component: () => import("../views/settings/user/UserAdd"),
        meta: { authorize: [Role.Admin] }
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
  // redirect to unauthorized page if not logged and trying to access a restricted page
  const { authorize } = to.meta;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const serverError = store.getters["error/serverError"];
  const userRole = store.getters["auth/role"];

  if (!serverError && authorize.length) {
    if (!isAuthenticated || !authorize.includes(userRole)) {
      store.dispatch("message/warning", "Non sei autorizzato ad accedere!");
      router.push("/");
    }
  }

  next();
});

export default router;
