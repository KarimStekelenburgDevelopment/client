<template>
    <modal :callback="updateUser" cancel-text="Dismiss" title="Edit user" v-model="showModal" @ok="showModal = false"
           effect="fade/zoom">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">Modal title</h4>
      </div>

      <label for="userId">User ID:&nbsp;</label>
      <label id="userId">{{userEditModalDataObject.userInfo.userId}}</label>
      <form @submit="updateUser">
        <!--Ugly fix to avoid chrome from autofilling password field-->
        <input style="display:none">
        <input type="password" style="display:none">

        <div class="form-group">
          <label for="usernameField">Username:</label>
          <input type="text" class="form-control" id="usernameField"
                 v-bind:placeholder="userEditModalDataObject.userInfo.username"
                 v-model="userEditModalDataObject.userInfo.username" autocapitalize="none">
        </div>
        <div class="form-group">

          <label for="passwordField">Password:&nbsp;</label>
          <input autocomplete="off" type="password" class="form-control" id="passwordField"
                 v-bind:placeholder="userEditModalDataObject.userInfo.password"
                 v-model="userEditModalDataObject.userInfo.password">
          <input type="checkbox" id="checkbox" v-model="updatePassword" autocapitalize="none">
          <label for="checkbox" style="font-weight: normal"> set new password</label>
        </div>
        <div class="form-group">
          <label for="exampleSelect1">Function:</label>
          <select class="form-control" id="exampleSelect1" v-model="userEditModalDataObject.userInfo.role.id">
            <option v-for="role in allRoles"
                    :value="role.id" :selected="role.id === userEditModalDataObject.userInfo.role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
      </form>
    </modal>

</template>

<script>
import modal from 'vue-strap/src/Modal'
import { EventBus } from '../../event_bus/global-event-bus';

export default {
  name: 'EditUserModal',
  components: {
    modal
  },
  data () {
    return {
      updatePassword: false,
      allRoles: [],
      userEditModalDataObject: {
        userInfo: {
          userId: null,
          username: null,
          password: null,
          role: {
            id: null,
            name: null
          },
        }
    },
      showModal: false,
    }
  },
  methods:{

    fetchRoles () {
      this.$http.get(
              'role',
              {
                headers: {
                  'Authorization': this.$auth.getToken()
                }
              }
      )
              .then(function (response) {
                this.allRoles = response.body
              })
    },

    initUserEditModal(){
      this.$http.get(
              'user/'+this.userEditModalDataObject.userInfo.userId,
              {
                headers: {
                  'Authorization': this.$auth.getToken()
                }
              }
      )
              .then(function (response) {
                this.userEditModalDataObject.userInfo.username = response.body.username;
                this.userEditModalDataObject.userInfo.role = response.body.role;
              })
    },

    updateUser(){

      let updatedUser = {
        id: this.userEditModalDataObject.userInfo.userId,
        username: this.userEditModalDataObject.userInfo.username,
        password: this.userEditModalDataObject.userInfo.password,
        role: this.userEditModalDataObject.userInfo.role
      };

      if (this.updatePassword == true){
        updatedUser.password = this.userEditModalDataObject.userInfo.password;
      }

      this.$http.put('user', updatedUser, {
        headers: {
          'Authorization': this.$auth.getToken()
        }
      })
              .then(function (response) {
                if (response.body.error) {
                  var error = response.body.error.split(':')
                  this.$notify.alert('alert-danger', error[0])

                } else {

                  this.$router.push({path: '/', query: {alert: 'User_Updated'}})
                  this.$notify.alert('Success!','User information updated', 'alert-success')
                  this.$update.userTable();

                  this.clearFields();

                }
              })
    }
  },

  mounted() {
    EventBus.$on('user-edit-modal', userId => {
      this.userEditModalDataObject.userInfo.userId = userId;
      this.fetchRoles();
      this.initUserEditModal();
      this.showModal = true;

    })
  }
}
</script>

<style>

  label{
    font-weight: bold;
  }

  #userId{
    font-weight: normal;
  }

  /*#wrapper{*/
    /*z-index: 1;*/
    /*position: fixed;*/
    /*bottom: 50%;*/
    /*left: 50%;*/
    /*width: auto;*/

    /*transform: translate(-50%, 0);*/
  /*}*/
</style>
