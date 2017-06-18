<template>

  <modal :callback="addArea" cancel-text="Dismiss" title="Edit Table" v-model="showModal" @ok="showModal = false"
         effect="fade/zoom">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">Modal title</h4>
    </div>

    <form>
      <div class="form-group">
        <label for="areaName">Area name:</label>
        <input type="text" class="form-control" id="areaName"
               :placeholder="area.name"
               v-model="area.name" autocapitalize="none">
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
        area: {
          id: null,
          name: null
        },
        showModal: false,
      }
    },
    methods: {
      getArea(areaId){
        this.$http.get(
                'area/' + areaId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  console.log(response.body)
                  this.area = response.body
                })
      },

      addArea() {
        this.$http.post('area', this.area, {
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
                    this.$notify.alert('Success!','Area name has been updated', 'alert-success')
                    this.$update.area();
                  }
                })
      },


    },

    components: {
      modal
    },

    mounted() {
      EventBus.$on('area-edit-modal', areaId => {
        this.getArea(areaId);
        this.showModal = true;

      })


    }
  }
</script>

<style>

</style>