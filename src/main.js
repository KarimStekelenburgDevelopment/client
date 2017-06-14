// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Auth from './packages/auth/Auth.js'
import Notify from './packages/notify/Notify.js'
import Modal from './packages/modal/Modals.js'
import Update from './packages/updater/Update.js'

import '../node_modules/jquery/dist/jquery.min'

Vue.use(VueResource);
Vue.use(Auth);
Vue.use(Notify);
Vue.use(Modal);
Vue.use(Update);

Vue.http.options.root = 'http://localhost:8080';
// Vue.http.options.root = 'https://mysterious-woodland-66869.herokuapp.com';

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)){
      if (Vue.auth.isAuthenticated()){
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
  template: '<App/>',
  components: { App }
})
