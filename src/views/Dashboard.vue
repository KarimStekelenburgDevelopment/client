<template>
  <div class="animated fadeIn">

    <UserWidget id="userWidget"/>
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

  #userWidget{
    margin: 0 auto;
  }

  @media only screen and (max-width: 400px) {
    #userWidget{
      margin: -15px;
    }
  }



  .card-block{
    overflow: auto;
  }

</style>
