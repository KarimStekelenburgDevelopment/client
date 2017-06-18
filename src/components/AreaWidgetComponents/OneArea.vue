<template>
  <div class="card">
    <div class="card-block">
      <h2 id="title">{{area.name}}</h2>
      <div id="buttonGroup" class="btn-group">
        <button
                type="button"
                class="btn btn-link oneAreaButtonGroup"
                @click="showEditAreaModal()"
        >
          <span class="fa fa-edit fa-lg"></span>
        </button>

        <button
                type="button"
                class="btn btn-link oneAreaButtonGroup"
                @click="deleteArea()"
                style="color: #db272a;"
        >
          <span class="fa fa-remove fa-lg"></span>
        </button>
      </div>

      <hr style="clear: both"/>
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
  import {EventBus} from '../../event_bus/global-event-bus';

  export default {
    props: ['aId'],
    data() {
      return {
        area: {},
        areaId: this.aId,
      }
    },
    methods: {
      showEditAreaModal(){
        this.$modals.showEditAreaModal(this.areaId)
      },
      deleteArea(){
        this.$modals.showAreaDeleteWarning(this.areaId)
      },

      getArea(){
        this.$http.get(
                'area/' + this.areaId,
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
      }
    },
    components: {
      AreaTablesTable,
      AreaUsersTable
    },
    mounted(){
     this.getArea()
      EventBus.$on('update-area', () => {
        this.getArea();
      })
    }
  }
</script>

<style scoped>

  .card-block {
    overflow: hidden;
    display: inline-block;

  }

  #buttonGroup{
    margin: 15px 0 0 5px;
    float: left;
    width: auto;
  }

  #tablesBlock {

    /*margin: 0 auto;*/
  }

  #tablesTable {
    margin-right: 10px;
    float: left;
    display: table-cell;
    /*max-height: vh;*/

  }

  #usersTable {
    display: inline-block;
    margin-right: 0px;
    float: left;
    /*float: left;*/
    /*width: 20%;*/
    /*max-height: vh;*/
    /*margin-right: auto;*/

  }

  .oneAreaButtonGroup{
    padding: 5px;
  }

  #title {
    text-align: left;
    float: left;
  }
</style>