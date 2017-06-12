<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link"><i class="icon-speedometer"></i> Dashboard </router-link>
          <router-link :to="'/users'" class="nav-link"><i class="icon-user"></i> Users </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'app-sidebar',
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
