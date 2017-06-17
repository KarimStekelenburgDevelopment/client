<template>
  <div id="container">
    <h4 style="text-align: left; float: left">Users</h4>


    <select class="dropdown" id="exampleSelect1" @change="addUser()" v-model="selectedUser">
      <option selected disabled hidden>Add user</option>
      <option v-for="user in avalibleUsers"
              :value="user" >
        {{ user.username }}
      </option>
    </select>

    <table class="table table-sm table-responsive">

      <col align="left">
      <col align="left">

      <thead>
      <tr>
        <th class="tableText" >Username</th>
        <th class=""></th>
      </tr>
      </thead>
      <!--<div id="tableBody">-->

      <tbody>
      <tr v-for="user in users">
        <td class="tableText">{{user.username}}</td>
        <td class="vertAlign">
          <button
                  type="button"
                  class="btn btn-link"
                  @click="removeUser(user)"
                  style="color: #db272a;"
          >
            <span class="fa fa-remove"></span>
          </button>
        </td>
      </tr>
      </tbody>
      <!--</div>-->
    </table>


  </div>

</template>

<script type="text/babel">

  export default {
    props: ['aId'],
    data() {
      return {
        selectedUser: null,
        areaId: this.aId,
        avalibleUsers: [],
        users: []
      }
    },

    methods: {

      addUser(){
        this.$http.put(
                'area/addUser/' + this.areaId, this.selectedUser,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  this.fetchUsersForArea()
                  this.fetchAvalibleUsersForArea()
                  this.users = response.body
                })
      },

      removeUser(user){
        delete user['url'];
        delete user['root'];
        delete user['method'];

        this.$http.delete(
                'area/removeUser/' + this.areaId,
                {
                  body: user,
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  this.fetchUsersForArea()
                  this.fetchAvalibleUsersForArea()
                })
      },

      fetchUsersForArea () {
        this.$http.get(
                'area/getUsers/' + this.areaId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  this.users = response.body
                })
      },
      fetchAvalibleUsersForArea(){
        this.$http.get(
                'area/getAvalibleUsers/' + this.areaId,
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {
                  console.log(response.body)
                  this.avalibleUsers = response.body
                })
      }
    },
    created: function () {
      this.fetchUsersForArea()
      this.fetchAvalibleUsersForArea()
    },


    components: {}
  }
</script>

<style scoped>

  #exampleSelect1{
    float: right;
    margin-top: 5px;
    width: 20px;
  }

  .vertAlign {
    margin: 0 auto;
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

  }

  table tbody tr td {
    text-align: left;
    /*margin-top: 15px;*/
    border-top-style: solid;
    /*vertical-align: middle;*/
  }
</style>