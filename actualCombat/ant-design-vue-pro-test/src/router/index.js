import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { notification } from "ant-design-vue";
import NotFound from "../views/404";
import Forbidden from "../views/403";
import { check, isLogin } from "../utils/auth";
import findLast from "lodash/findLast";

Vue.use(VueRouter);

const routes = [
  {
    path: "/User",
    hiddenInMenu: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/Register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/baic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分布表单" },
            hiddenChildrenInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hiddenInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hiddenInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  console.log(4444);
  console.log(to.matched);
  const record = findLast(to.matched, function(record) {
    return record.meta.authority;
  });
  console.log(record);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({ path: "/user/login" });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "这个是没有权限的信息"
      });
      next({ path: "/403" });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
