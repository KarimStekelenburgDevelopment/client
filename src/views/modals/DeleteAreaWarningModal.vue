<template>

  <modal :callback="deleteArea" okClass="btn-danger" okText="Delete"  cancel-text="Dismiss" title="Edit Table"
         v-model="showModal"
         @ok="showModal = false"
         effect="fade/zoom">
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">Wait!</h4>
    </div>
    <div class="modal-body">
      Are you absolutely 100% super ultra sure you want to delete this area? All related table and order records
      will be deleted permanently. This cannot be undone!
    </div>


  </modal>

</template>

<script type="text/babel">
  import modal from 'vue-strap/src/Modal'
  import {EventBus} from '../../event_bus/global-event-bus';

  export default {
    name: 'DeleteAreaWarningModal',
    data() {
      return {
        areaId: null,
        showModal: false,
      }
    },
    methods: {
      deleteArea(){
        this.$http.delete(
                'area/' + this.areaId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  this.$notify.alert('Success!','Table information has been updated', 'alert-success')
                  this.$update.areas()

                })
      },


    },

    components: {
      modal
    },

    mounted() {
      EventBus.$on('delete-area-modal', areaId => {
        this.areaId = areaId;
        this.showModal = true;
      })


    }
  }
</script>

<style>

</style>