import { createWebHistory, createRouter } from "vue-router";
import { defineAsyncComponent } from "vue";
import PageLayoutView from "@/views/PageLayoutView.vue";
const routes = [
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/app",
    component: PageLayoutView,
    name: "home",
    // redirect: "/app/layout",
    // children: [
    //   {
    //     path: "layout",
    //     name: "layout",
    //     component: defineAsyncComponent(
    //       () => import("../views/PageLayoutView.vue")
    //     ),
    //   },
    // ],
  },
  {
    path: "/runner",
    name: "runner",
    component: defineAsyncComponent(() => import("../views/RunnerView.vue")),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
