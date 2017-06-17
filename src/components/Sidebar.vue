<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link"><i class="fa fa-tachometer"></i> Dashboard
          </router-link>
        </li>

        <li class="nav-item">
          <router-link v-show="$isAllowed('viewUserLink')" :to="'/users'" class="nav-link"><i class="fa fa-user"></i>
            Users
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-show="$isAllowed('viewUserLink')" :to="'/areas'" class="nav-link"><i class="fa fa-th"></i>
            Areas
          </router-link>
        </li>


      </ul>
    </nav>
  </div>
</template>
<script>

import sidebarPerimeter from '../vuex/perimeters/sidebarPerimeter';

export default {

  name: 'app-sidebar',
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  },
  perimeters: [
    sidebarPerimeter,
  ],
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
