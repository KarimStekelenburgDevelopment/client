<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view me></router-view>
        </div>
      </main>

    </div>

    <AppFooter/>



  </div>
</template>

<script type="text/babel">
import AppHeader from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import AppFooter from '../components/Footer.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

export default {
  name: 'full',
  data(){
    return{}
  }
  ,
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  computed: {
    name () {
      return this.$route.name
    },

    list () {
      return this.$route.matched
    }
  }
}
</script>

<style>

</style>
