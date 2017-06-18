<template>
  <div class="app">
    <AppHeader/>

    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <breadcrumb id="bc" :list="list"/>
        <div class="container-fluid" id="fluidContainer">
          <router-view me id="sexy" @click="sidebarToggle"></router-view>
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
  methods: {
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
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

  @media only screen and (max-width: 530px) {
    #bc{
      margin-bottom: 0;
    }

    #fluidContainer{
      padding: 0;

    }
  }


</style>
