<template>
  <div class="wrapper">

    <router-view></router-view>

    <notification></notification>
    <Modal></Modal>
  </div>
</template>

<script>
  import Notification from './views/Notification.vue'
  import Modal from './views/modals/Modals.vue'

  export default {
    name: 'app',
    components: {
      Notification,
      Modal
    }
  }
</script>
<!--
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
