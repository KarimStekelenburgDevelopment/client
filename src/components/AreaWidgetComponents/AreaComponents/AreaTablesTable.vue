<template>

  <div id="container">
    <div>
    <h4 style="text-align: left; float: left; margin-right: 0px; ">Tables</h4>
    </div>
    <button id="addUserButton"
            type="button"
            class="btn btn-link"
            @click="showTableAddModal()"
    >
      <span class="fa fa-plus-circle"></span>
    </button>
    <table class="table table-sm table-responsive">



      <col align="left">
      <col align="left">
      <col align="left">
      <col align="left">
      <col align="left">

      <thead>
      <tr>
        <th class="tableText" >ID</th>
        <th class="" >Seats</th>
        <th class=""></th>
        <th class=""></th>
      </tr>
      </thead>
      <!--<div id="tableBody">-->

      <tbody>
      <tr v-for="table in tables">
        <td class="tableText">{{table.id}}</td>
        <td class="" style="word-break: break-all;">{{table.numofseats}}</td>
        <td class=" vertAlign">
          <button
                  type="button"
                  class="btn btn-link"
                  @click="showTableEditModal(table.id)"
          >
            <span class="fa fa-edit"></span>
          </button>
        </td>
        <td class=" vertAlign">
          <button
                type="button"
                class="btn btn-link"
                @click="deleteTable(table.id)"
                style="color: #db272a;"
          >
          <span class="fa fa-remove"></span>
        </button>
          <!--<button type="button" class="btn btn-primary">Primary</button>-->
        </td>
      </tr>
      </tbody>
      <!--</div>-->
    </table>


  </div>

</template>

<script type="text/babel">
  import {EventBus} from '../../../event_bus/global-event-bus';


  export default {
    props: ['aId'],
    data() {
      return {
        areaId: this.aId,
        tables: [],
      }
    },
    components: {},
    methods: {
      fetchTables () {
        this.$http.get(
                'area/getTables/' + this.areaId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  console.log(response.body)
                  this.tables = response.body
                })
      },
      showTableEditModal(tableId){
        this.$modals.showEditTableModal(tableId);
      },
      showTableAddModal(){
        this.$modals.showAddTableModal(this.areaId);
      },



      deleteTable(tableId){
        this.$http.delete(
                'table/' + tableId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  if (response.body.error) {
                    this.$notify.alert('Oops!', response.body.error, 'alert-danger')
                  } else {
                    this.$notify.alert('Success!', 'Table has been removed.', 'alert-success')
                    this.fetchTables();
                  }
                })
      }

    },


    created: function () {
      this.fetchTables();
      EventBus.$on('update-area-tables-table', () => {
        this.fetchTables();
      })
    }
  }
</script>



<style scoped>

  #addUserButton{
    color: #43974f;
    margin-top: 6px;
    margin-right: 0;
  }

  .vertAlign {
    margin: 0 auto;
    /*padding: 9px;*/
    vertical-align: middle;
  }

  button{
    margin: 0;
    padding: 0;
    vertical-align: inherit;
    display: inline-block;
  }


  table thead tr th{
    max-width: 2%;
    border-top-style: solid;
  }


  table {
    /*border-style: solid;*/
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
    padding: 0;

  }
td{}
  table tbody tr td {
    text-align: left;
    /*margin-top: 15px;*/
    border-top-style: solid;
    /*vertical-align: middle;*/

  }
</style>