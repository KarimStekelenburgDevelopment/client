<template>
  <div id="modalContainer">
    <EditTableModal></EditTableModal>
    <EditUserModal></EditUserModal>
    <AddTableModal></AddTableModal>
  </div>
</template>

<script type="text/babel">
  import EditUserModal from '../views/modals/EditUserModal.vue'
  import EditTableModal from '../views/modals/EditTableModal.vue'
  import AddTableModal from '../views/modals/AddTableModal.vue'

  export default {
    data() {
      return {}
    },
    components: {
      EditUserModal,
      EditTableModal,
      AddTableModal

    }
  }
</script>

<style>

</style>