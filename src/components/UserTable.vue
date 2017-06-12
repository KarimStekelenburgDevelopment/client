<template>

  <div id="container">

    <table class="table table-sm table-responsive">
      <thead>
      <tr>
        <th class="tableText" style="width: 100px">ID</th>
        <th class="tableText" style="width: 200px;">Username</th>
        <th class="tableText">Function</th>
        <th class="tableText"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filterBy(users, filterInput)">
        <td class="tableText">{{user.id}}</td>
        <td class="tableText">{{user.username}}</td>
        <td class="tableText">{{user.role.name}}</td>
        <td class="tableText">
          <router-link class="btn btn-default" v-bind:to="'/users/'+user.id">View</router-link>
          <!--<button type="button" class="btn btn-primary">Primary</button>-->
        </td>
      </tr>
      </tbody>
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
//          var roles = {}
//          for (var user in response) {
//            if ((typeof user.role) !== 'number') {
//              roles[user.role.id] = user.role
//            }
//          }
//
//          response = response.map(function (user) {
//            if ((typeof user.role) === 'number') {
//              user.role = roles[user.role]
//            }
//            return user
//          })
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
  .tableText{
    padding-left: 30px;
    text-align: left;
  }



  table thead tr th{
    border-top-style: none;
  }

  table tbody tr td{
    margin-top: 15px;
  }
</style>
