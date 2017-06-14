<template>

  <div id="container">

    <table class="table table-sm table-responsive">
      <thead>
      <tr>
        <th class="tableText" style="width: auto;">ID</th>
        <th class="tableText" style="width: auto;">Username</th>
        <th class="tableText">Function</th>
        <th class="tableText"></th>
      </tr>
      </thead>
      <!--<div id="tableBody">-->

        <tbody>
        <tr v-for="user in filterBy(users, filterInput)">
          <td class="tableText">{{user.id}}</td>
          <td class="tableText" style="max-width: 2vw; word-break: break-all;">{{user.username}}</td>
          <td class="tableText">{{user.role.name}}</td>
          <td class="tableText">
            <button type="button" class="btn btn-primary" @click="setUserEditModal(user.id)">View</button>

            <!--<button type="button" class="btn btn-primary">Primary</button>-->
          </td>
          <td class="tableText">
            <router-link class="btn btn-default" v-bind:to="'/users/'+user.id">Delete</router-link>
            <!--<button type="button" class="btn btn-primary">Primary</button>-->
          </td>
        </tr>
        </tbody>
      <!--</div>-->
    </table>


  </div>
</template>

<script>

  export default {
    name: 'app-user-table',
    data () {
      return {
        users: [],
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      setUserEditModal (userId){
        console.log(userId)
        this.$modals.showEditUserModel(userId);
      },

      fetchUsers () {
        this.$http.get(
                'http://localhost:8080/user',
                {
                  headers: {
                    'Authorization': this.$auth.getToken()
                  }
                }
        )
                .then(function (response) {

                  console.log(response.body)
                  this.users = response.body
                })
      },

      filterBy (list, value) {
        value = value.charAt(0) + value.slice(1)
        return list.filter(function (user) {
          return user.username.indexOf(value) > -1
        })
      }
    },
    created: function () {
      this.fetchUsers()
    }

  }
</script>

<style scoped>
  #container {
    height: 50vh;
    overflow: auto;
  }

  .tableText {
    padding-left: 30px;
    text-align: left;
  }

  table thead tr th {
    border-top-style: none;
  }

  table tbody tr td {
    margin-top: 15px;
  }
</style>
