import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// import { isUserLoggedIn } from '@/auth/utils'
// import Home from "../views/index.vue";
// import map from "./routers/map";
import ditich from "@/views/ditich.vue";
import disanvanhoa from "@/views/disanvanhoa.vue";
import thamquan from "@/views/thamquanao.vue";

import { ROUTE_MAP } from "@/utils/constants";


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    // {
    //   path: "/:maptype",
    //   // alias: ['/','/index.html',ROUTE_MAP.DITICH,ROUTE_MAP.DISAN, ROUTE_MAP.THAMQUAN],
    //   name: "Home",
    //   component: Home,
    // },
    // ...map,
    {
      path: ROUTE_MAP.DITICH,
      name: "ditich",
      component: ditich,
    },
    {
      // path: "/",
      path: ROUTE_MAP.DISAN,
      // alias: '/',
      name: "disanvanhoa",
      component: disanvanhoa,
    },
    {
      path: ROUTE_MAP.THAMQUAN,
      name: "thamquan",
      component: thamquan,
    },
    // {
    //   path: "*",
    //   redirect: "error-404",
    // },
  ],
});


export default router;
