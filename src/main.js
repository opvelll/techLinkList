import Vue from "vue";
import { ModalPlugin } from "bootstrap-vue";
Vue.use(ModalPlugin);
import { TablePlugin } from "bootstrap-vue";
Vue.use(TablePlugin);
import { FormPlugin } from "bootstrap-vue";
Vue.use(FormPlugin);
import { BadgePlugin } from "bootstrap-vue";
Vue.use(BadgePlugin);
import { ButtonPlugin } from "bootstrap-vue";
Vue.use(ButtonPlugin);
import { FormTagsPlugin } from "bootstrap-vue";
import { FormInputPlugin } from "bootstrap-vue";
Vue.use(FormInputPlugin);
Vue.use(FormTagsPlugin);
import { FormGroupPlugin } from "bootstrap-vue";
Vue.use(FormGroupPlugin);
import { CardPlugin } from "bootstrap-vue";
Vue.use(CardPlugin);
import { NavPlugin } from "bootstrap-vue";
Vue.use(NavPlugin);
import { SpinnerPlugin } from "bootstrap-vue";
Vue.use(SpinnerPlugin);
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";

Vue.config.productionTip = false;

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
import { components } from "aws-amplify-vue";
import router from './router'
Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules);

// vue-moment
const moment = require("moment");
require("moment/locale/ja");
Vue.use(require("vue-moment"), { moment });

new Vue({
  render: h => h(App),
  router,

  components: {
    ...components
  }
}).$mount("#app");
