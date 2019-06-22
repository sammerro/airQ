import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import coloringFunctionFactory from "@/helpers";

Vue.config.productionTip = false;
Vue.directive("colorParameter", {
  bind(el, binding, vnode) {
    console.log("------------------------------------------------------------");
    console.log(el);
    console.log("------------------------------------------------------------");
    console.log(binding);
    console.log("------------------------------------------------------------");
    console.log(vnode);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
