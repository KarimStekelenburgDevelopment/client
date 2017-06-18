<template xmlns:v-for="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="container">
    <div class="card text-center">
      <div class="card-header">
        <h2 style="text-align: left; float:left;">Areas</h2>
        <button id="addUserButton"
                type="button"
                class="btn btn-link"
                @click="showAreaAddModal()"
                style="float: left; color: #43974f; margin-top: -5px;"
        >
          <span class="fa fa-plus-circle fa-2x"></span>
        </button>

        <div style="clear: both;" class="card-block" v-for="area in areas">
        <OneArea id="oneArea" v-bind:OneArea="area" :key="area.id" :aId="area.id"></OneArea>
        </div>

      </div>
    </div>
  </div>

</template>

<script type="text/babel">
  import OneArea from './AreaWidgetComponents/OneArea.vue'
  import {EventBus} from '../event_bus/global-event-bus';


  export default {
    data() {
      return {
        OneArea: {},
        area: {
          id: null,
        },
        key: null,
        areas: []
      }
    },
    methods:{
      getAreas(){
          this.$http.get(
                  'area/',
                  {
                    headers: {
                      'Authorization': this.$auth.getToken()
                    }
                  }
          )
                  .then(function (response) {
                    this.areas = response.body
                    console.log('resp')
                    console.log(this.areas)
                  })
      },
      showAreaAddModal(){
        this.$modals.showAddAreaModal();
      }
    },
    components: {
      OneArea
    },
    created: function () {
      this.getAreas();
      EventBus.$on('update-areas', () => {
        this.getAreas();
      })

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