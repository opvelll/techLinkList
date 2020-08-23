import Vue from "vue";
import VueRouter from "vue-router";
import DataList from "../views/DataList.vue";
import TagSearch from "../views/TagSearch.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: DataList,
  },
  {
    path: "/tag/",
    name: "TagSearch",
    component: TagSearch,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
