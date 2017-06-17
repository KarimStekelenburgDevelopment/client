<template>
  <div id="container">
    <div class="card text-center">
      <div class="card-header">
        <h2 style="text-align: left">Areas</h2>
        <div class="card-block">
        <OneArea id="oneArea" aId="2"></OneArea>
        </div>

      </div>
    </div>
  </div>

</template>

<script type="text/babel">
  import OneArea from './AreaWidgetComponents/OneArea.vue'

  export default {
    data() {
      return {}
    },
    components: {
      OneArea
    }
  }
</script>

<style>
  #oneArea{
    margin-right: 0;
    width: auto;
    display: inline-block;
    /*max-width: 700px;*/
  }

</style>