// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueKindergarten from 'vue-kindergarten';
import Auth from './packages/auth/Auth.js'
import Notify from './packages/notify/Notify.js'
import Update from './packages/updater/Update.js'
import store from './vuex/store/store.js';
import Modal from './packages/modal/Modals.js'
import child from './vuex/child';
import '../node_modules/jquery/dist/jquery.min'

Vue.use(VueResource);
Vue.use(Auth);
Vue.use(Notify);
Vue.use(Modal);
Vue.use(Update);
Vue.use(store);

// set server root urlzz
Vue.http.options.root = 'http://localhost:8080'; // development server
// Vue.http.options.root = 'https://mysterious-woodland-66869.herokuapp.com'; // deployment server

// set authorization for all calls
Vue.http.headers.common['Authorization'] = Vue.auth.getToken();

window.addEventListener("load",function() {
  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
});


Vue.use(VueKindergarten, {
  child,
});
//
router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)){
      if (Vue.auth.isAuthenticated()){

        Vue.use(VueKindergarten, {
          child,
        });

        next({
          path: '/'
        })
      } else next()
    } else if (to.matched.some(record => record.meta.forAuth)){
      if (!Vue.auth.isAuthenticated()){
        next({
          path: '/login'
        })
      } else next()
    } else next()
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
