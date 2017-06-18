<template>

  <modal :callback="addArea" ok-text="Add" cancel-text="Dismiss" title="Edit Table" v-model="showModal"
         @ok="showModal = false"
         effect="fade/zoom">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">New area</h4>
    </div>
    <form>

      <div class="form-group">
        <label for="numOfSeats">Area name:</label>
        <input type="text" class="form-control" id="numOfSeats"
               v-model="area.name" autocapitalize="none">
      </div>
    </form>
  </modal>

</template>

<script type="text/babel">
  import modal from 'vue-strap/src/Modal'
  import {EventBus} from '../../event_bus/global-event-bus';

  export default {
    name: 'AddAreaModal',
    data() {
      return {
        area: {
          name: null
        },
        showModal: false,
      }
    },
    methods: {
      addArea() {


        this.$http.post('area/', this.area, {
          headers: {
            'Authorization': this.$auth.getToken()
          }
        })
                .then(function (response) {
                  if (response.body.error) {
                    var error = response.body.error.split(':')
                    this.$notify.alert('alert-danger', error[0])

                  } else {
//                  this.$router.push({path: '/', query: {alert: 'Table_Updated'}})
                    this.$notify.alert('Success!','Area has been added!', 'alert-success')
                    this.$update.areas();
                    this.show = false;
                  }
                })
      },


    },

    components: {
      modal
    },

    mounted() {
      EventBus.$on('area-add-modal', () => {
        this.showModal = true;

      })


    }
  }
</script>

<style>

</style>