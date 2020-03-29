import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules);

// vue-moment
const moment = require("moment");
require("moment/locale/ja");
Vue.use(require("vue-moment"), { moment });

new Vue({
  render: h => h(App)
}).$mount("#app");
