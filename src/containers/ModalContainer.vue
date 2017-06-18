<template>
  <div id="modalContainer">
    <EditUserModal></EditUserModal>
    <AddTableModal></AddTableModal>
    <EditTableModal></EditTableModal>
    <AddAreaModal></AddAreaModal>
    <EditAreaModal></EditAreaModal>
    <DeleteAreaWarningModal></DeleteAreaWarningModal>
  </div>
</template>

<script type="text/babel">
  import EditUserModal from '../views/modals/EditUserModal.vue'
  import AddTableModal from '../views/modals/AddTableModal.vue'
  import EditTableModal from '../views/modals/EditTableModal.vue'
  import AddAreaModal from '../views/modals/AddAreaModal.vue'
  import EditAreaModal from '../views/modals/EditAreaModal.vue'
  import DeleteAreaWarningModal from '../views/modals/DeleteAreaWarningModal.vue'



  export default {
    data() {
      return {}
    },
    components: {
      EditUserModal,
      AddTableModal,
      EditTableModal,
      AddAreaModal,
      EditAreaModal,
      DeleteAreaWarningModal

    }
  }
</script>

<style>

</style>