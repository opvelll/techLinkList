import Vue from "vue";
import VueRouter from "vue-router";
import Page from "../views/Page.vue";
import DataList from "../views/DataList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Page,
  },
  {
    path: "/:pageName",
    name: "Page",
    component: DataList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
