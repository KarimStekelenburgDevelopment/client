import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '../containers/Full.vue'

// Views
import Dashboard from '@/views/Dashboard'
import Users from '@/views/Users'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            forAuth: true
          }
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
          meta: {
            forAuth: true
          }
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {
            forVisitors: true
          }
        }

      ]
    }
  ]
})
