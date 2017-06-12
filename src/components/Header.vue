<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <navbar>
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      &#9776;</button>    <h5 id="menu_heading">PocketOrder</h5>
    <ul class="nav navbar-nav d-md-down-none mr-auto">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarToggle">&#9776;</a>
      </li>
    </ul>
    <button id="logoutButton" type="button" class="btn btn-primary" v-on:click='logout'>Log out</button>
  </navbar>
</template>
<script>

import navbar from './Navbar'
import { dropdown } from 'vue-strap'

export default {
  name: 'app-header',
  components: {
    navbar,
    dropdown
  },
  methods: {
    logout () {
      this.$auth.destroyToken()
      this.$router.go('/')
    },

    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>

<style scoped>

  #logoutButton{
    margin-right: 10px;
  }

  #menu_heading{
    color: #263238;
    margin-left: 15px;
    margin-top: 5px;
    margin-right: 20px;
  }
</style>
