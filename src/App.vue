<template>
  <div class="wrapper">

    <router-view></router-view>
    <ModalContainer></ModalContainer>
    <notification></notification>
  </div>
</template>

<script>
  import Notification from './views/Notification.vue'
  import store from './vuex/store/store'
  import ModalContainer from './containers/ModalContainer.vue'

  export default {
    name: 'app',
    components: {
      Notification,
      ModalContainer
    },

    created: function() {
      store.dispatch('fetchUserRole')
    }

  }
</script>

<style>


body{
  margin: 0;
}
</style>
