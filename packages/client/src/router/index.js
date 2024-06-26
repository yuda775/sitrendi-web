import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/registrasi",
      name: "registrasi",
      // route level code-splitting
      // this generates a separate chunk (registrasi.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/RegistrasiView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/AdminView.vue"),
    },
  ],
});

export default router;
