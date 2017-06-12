<template>
  <div class="animated fadeIn">

    <UserWidget/>
  </div>
</template>

<script>
  import UserWidget from '../components/UserWidget.vue'

  export default {
    name: 'app-dashboard',
    components: {
      UserWidget
    }
  }
</script>

<style>
  .card-block{
    overflow: auto;
  }

</style>
