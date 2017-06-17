<template>
  <div class="animated fadeIn">
    <AreaWidget id="areaWidget"></AreaWidget>

  </div>
</template>

<script type="text/babel">

  import AreaWidget from '../components/AreaWidget.vue'


  export default {
    data() {
      return {
        name: 'app-areas'
      }
    },
    components: {
      AreaWidget,
    }
  }
</script>

<style>
#areaWidget{
  margin: 0;
  display: inline-block;
}

</style>