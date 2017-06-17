<template>

  <modal :callback="addTable" ok-text="Add" cancel-text="Dismiss" title="Add Table" v-model="showModal"
         @ok="showModal = false"
         effect="fade/zoom">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">Add table</h4>
    </div>
    <form>
      <!--Ugly fix to avoid chrome from autofilling password field-->
      <input style="display:none">
      <input type="password" style="display:none">

      <div class="form-group">
        <label for="numOfSeats">Number of seats:</label>
        <input type="text" class="form-control" id="numOfSeats" onkeypress='return event.charCode >= 48 && event.charCode <= 57'
               :placeholder="table.numofseats"
               v-model="table.numofseats" autocapitalize="none">
      </div>
    </form>
  </modal>

</template>

<script type="text/babel">
  import modal from 'vue-strap/src/Modal'
  import {EventBus} from '../../event_bus/global-event-bus';

  export default {
    name: 'AddTableModal',
    data() {
      return {

        area: {},
        table: {
          numofseats: null
        },
        showModal: false,
      }
    },
    methods: {


      addTable() {

        let newTable = {
          numofseats: this.table.numofseats,
        };
        console.log(newTable)
        this.$http.post('table/' +this.area.id, newTable, {
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
                  this.$notify.alert('Success!','Table information has been updated', 'alert-success')
                  this.$update.areaTablesTable();

                }
              })
      },


    },

    components: {
      modal
    },

    mounted() {
      EventBus.$on('table-add-modal', areaId=> {
        this.$http.get('area/'+areaId, {
          headers: {
            'Authorization': this.$auth.getToken()
          }
        })
                .then(function (response) {
                  if (response.body.error) {
                    var error = response.body.error.split(':')
                    this.$notify.alert('alert-danger', error[0])
                  } else {
                    this.area = response.body
                    console.log(this.area)
                  }
                })




        this.showModal = true;

      })


    }
  }
</script>

<style>

</style>