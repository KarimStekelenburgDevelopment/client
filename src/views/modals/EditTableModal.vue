<template>

  <modal :callback="updateTable" cancel-text="Dismiss" title="Edit Table" v-model="showModal" @ok="showModal = false"
         effect="fade/zoom">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">Modal title</h4>
    </div>

    <label for="tableId">Table ID:&nbsp;</label>
    <label id="tableId">{{table.id}}</label>
    <form>
      <!--Ugly fix to avoid chrome from autofilling password field-->
      <input style="display:none">
      <input type="password" style="display:none">

      <div class="form-group">
        <label for="numOfSeats">Number of seats:</label>
        <input type="text" class="form-control" id="numOfSeats"
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
    name: 'EditTableModal',
    data() {
      return {
        table: {
          id: null,
          numofseats: null
        },
        showModal: false,
      }
    },
    methods: {
      getTable(tableId){
        this.$http.get(
                'table/' + tableId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  console.log(response.body)
                  this.table = response.body
                })
      },

      updateTable() {

        let updatedTable = {
          id: this.table.id,
          numofseats: this.table.numofseats
        };

        this.$http.put('table', updatedTable, {
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
                  this.$update.userTable();
                  this.$update.areaTablesTable();
                  this.clearFields();

                }
              })
      },


    },

    components: {
      modal
    },

    mounted() {
      EventBus.$on('table-edit-modal', tableId => {
        this.getTable(tableId);
        this.showModal = true;

      })


    }
  }
</script>

<style>

</style>