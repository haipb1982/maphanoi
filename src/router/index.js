import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// import { isUserLoggedIn } from '@/auth/utils'
import Home from "../views/index.vue";


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});


export default router;
