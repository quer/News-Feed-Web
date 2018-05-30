// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
window.Vue = Vue;
Vue.use(VueResource);
Vue.config.productionTip = true

/* eslint-disable no-new */
window.testVue = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})