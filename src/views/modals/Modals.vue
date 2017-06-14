<template>

    <modal title="Modal title" v-model="myModal" @ok="myModal = false" effect="fade/zoom">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">Modal title</h4>
      </div>
      <form @submit="updateUser">
        <div class="form-group">
          <label for="usernameField">Username</label>
          <input type="text" class="form-control" id="usernameField"
                 v-bind:placeholder="userEditModalDataObject.userInfo.username"
                 v-model="userEditModalDataObject.userInfo.username">
        </div>
        <div class="form-group">
          <label for="passwordField">Password</label>
          <input autocomplete="off" type="password" class="form-control" id="passwordField"
                 v-bind:placeholder="userEditModalDataObject.userInfo.password"
                 v-model="userEditModalDataObject.userInfo.password">
        </div>
        <div class="form-group">
          <label for="exampleSelect1">Example select</label>
          <select class="form-control" id="exampleSelect1" v-model="userEditModalDataObject.allRoles">
            <option v-for="role in userEditModalDataObject.allRoles"
                    :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>

        <button @click="updateUser" type="button" class="btn btn-primary">Add user</button>
      </form>
    </modal>


</template>

<script>
import modal from 'vue-strap/src/Modal'
import { EventBus } from '../../event_bus/global-event-bus';

export default {
  name: 'modals',
  components: {
    modal
  },
  data () {
    return {
      userEditModalDataObject: {
        allRoles: [],
        userInfo: {
          userId: null,
          username: null,
          password: "",
          role: null,
        }
    },
      myModal: false,
      largeModal: false,
      smallModal: false,
      primaryModal: false,
      successModal: false,
      warningModal: false,
      dangerModal: false,
      infoModal: false
    }
  },
  methods:{

    fetchRoles () {
      this.$http.get(
              'http://localhost:8080/role',
              {
                headers: {
                  'Authorization': this.$auth.getToken()
                }
              }
      )
              .then(function (response) {
                console.log(response.body)
                this.userEditModalDataObject.allRoles = response.body
              })
    },

    initUserEditModal(){
      this.$http.get(
              'http://localhost:8080/user/'+this.userEditModalDataObject.userInfo.userId,
              {
                headers: {
                  'Authorization': this.$auth.getToken()
                }
              }
      )
              .then(function (response) {
                console.log(response)
                this.userEditModalDataObject.userInfo.username = response.body.username;
                this.userEditModalDataObject.userInfo.role = response.body.role;
              })
    },

    updateUser(){

    }
  },

  mounted() {
    EventBus.$on('user-edit-modal', userId => {
      this.fetchRoles();
      this.userEditModalDataObject.userInfo.userId = userId;

      this.initUserEditModal();
      console.log("joijdoijd"+this.userEditModalDataObject.allRoles)
      this.myModal = true;

    })
  }
}
</script>

<style>
  /*#wrapper{*/
    /*z-index: 1;*/
    /*position: fixed;*/
    /*bottom: 50%;*/
    /*left: 50%;*/
    /*width: auto;*/

    /*transform: translate(-50%, 0);*/
  /*}*/
</style>
