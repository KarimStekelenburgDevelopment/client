<template>

  <div id="container">

    <table class="table table-sm table-responsive">
      <thead>
      <tr>
        <th class="tableText" style="width: auto;">ID</th>
        <th class="" style="width: auto;">Username</th>
        <th class="">Function</th>
        <th class=""></th>
      </tr>
      </thead>
      <!--<div id="tableBody">-->

        <tbody>
        <tr v-for="user in filterBy(users, filterInput)">
          <td class="tableText">{{user.id}}</td>
          <td class="" style="max-width: 2vw; word-break: break-all;">{{user.username}}</td>
          <td class="">{{user.role.name}}</td>
          <td class=" vertAlign">
            <button type="button" class="btn btn-primary btn-sm" @click="setUserEditModal(user.id)">View</button>

            <!--<button type="button" class="btn btn-primary">Primary</button>-->
          </td>
          <td class=" vertAlign">
            <button type="button" class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
            <!--<button type="button" class="btn btn-primary">Primary</button>-->
          </td>
        </tr>
        </tbody>
      <!--</div>-->
    </table>


  </div>
</template>

<script>
  import {EventBus} from '../event_bus/global-event-bus';


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

      deleteUser (userId) {
        this.$http.delete(
                'user/'+userId,
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
                    this.$notify.alert('Success!', 'User removed.', 'alert-success')
                    this.fetchUsers();
                  }
                })
      },

      setUserEditModal (userId){
        console.log(userId)
        this.$modals.showEditUserModel(userId);
      },

      fetchUsers () {
        this.$http.get(
                'user',
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
      EventBus.$on('update-user-table', () => {
        this.fetchUsers()
      })
    }
  }
</script>

<style scoped>
  .vertAlign{
    margin: auto;
    vertical-align: middle;
  }

  #container {
    height: 50vh;
    overflow: auto;
  }

  .tableText {
    /*margin: 0 auto;*/
    padding-left: 30px;
    /*text-align: left;*/
    /*padding: 0 auto;*/
  }

  table thead tr th {
    border-top-style: none;
  }

  table tbody tr td {
    text-align: left;
    margin-top: 15px;
  }
</style>
