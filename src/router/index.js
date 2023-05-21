import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },

  {
    path: "/entity",
    name: "entity",
    component: () => import("../views/Entity.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
