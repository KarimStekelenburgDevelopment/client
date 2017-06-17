<template>
  <div class="tableEnclosure">

    <table class="table table-sm table-responsive">

      <col align="left">
      <col align="left">
      <col align="left">
      <col align="left">
      <col align="left">

      <thead>
      <tr>
        <th class="tableText">ID</th>
        <th class="">Username</th>
        <th class="">Function</th>
        <th class=""></th>
        <th class=""></th>
      </tr>
      </thead>
      <!--<div id="tableBody">-->

      <tbody>
      <tr v-for="user in filterBy(users, filterInput)">
        <td class="tableText">{{user.id}}</td>
        <td class="" style="word-break: break-all;">{{user.username}}</td>
        <td class="">{{user.role.name}}</td>
        <td class=" vertAlign">
          <button type="button" class="btn btn-primary btn-sm" @click="showUserEditModal(user.id)">Edit</button>

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
  import {EventBus} from '../../event_bus/global-event-bus';


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
                'user/' + userId,
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

      showUserEditModal (userId){
        this.$modals.showEditUserModal(userId);

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


  .vertAlign {
    margin: auto;
    vertical-align: middle;
  }

  table {
    /*min-width: 20vw;*/
    /*min-height: 20vh;*/

    /*max-width: 30vw;*/
    /*max-height: 30vh;*/

  }

  table thead tr th{
    max-width: 2%;
    border-top-style: none;
  }

  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto
  }

  table tbody tr td {
    text-align: left;
    margin-top: 15px;
    border-top-style: solid;
  }


</style>
