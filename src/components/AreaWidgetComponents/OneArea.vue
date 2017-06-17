<template>
  <div class="card">
  <div class="card-block">
    <h2 id="title">Area #: name</h2>
    <hr/>
    <div id="tablesBlock"></div>
    <AreaTablesTable id="tablesTable" :aId="areaId"></AreaTablesTable>
    <AreaUsersTable id="usersTable" :aId="areaId"></AreaUsersTable>
  </div>
  </div>
  </div>
</template>

<script type="text/babel">
  import AreaTablesTable from './AreaComponents/AreaTablesTable.vue'
  import AreaUsersTable from './AreaComponents/AreaUsersTable.vue'


  export default {
    props: ['aId'],
    data() {
      return {
        areaId: this.aId,
      }
    },
    components: {
      AreaTablesTable,
      AreaUsersTable
    }
  }
</script>

<style scoped>

  .card-block{
    overflow:hidden;
    display: inline-block;

  }

  #tablesBlock{

    /*margin: 0 auto;*/
  }


  #tablesTable{
    margin-right: 10px;
    float: left;
    display: table-cell;
    /*max-height: vh;*/

  }


  #usersTable{
    display: table-cell;
    margin-right: 10px;
    float: left;
    /*float: left;*/
    /*width: 20%;*/
    /*max-height: vh;*/
    /*margin-right: auto;*/

  }

  #title{
    text-align: left;
  }
</style>