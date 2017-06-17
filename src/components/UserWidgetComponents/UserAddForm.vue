<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="container">

    <form v-on:submit="validateRequest">
      <div class="form-group" v-bind:class="usernameStateClass">
        <label for="usernameField">Username</label>
        <input type="text" class="form-control" id="usernameField" aria-describedby="emailHelp"
               placeholder="username" v-model="user.username" autocapitalize="none">
      </div>
      <div class="form-group" v-bind:class="passwordStateClass">
        <label for="passwordField">Password</label>
        <input type="password" class="form-control" id="passwordField" placeholder="Password"
               v-model="user.password" autocapitalize="none">
      </div>
      <div class="form-group">
        <label for="exampleSelect1">Function</label>
        <select class="form-control" id="exampleSelect1" v-model="user.role">
          <option v-for="role in roles" v-bind:value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>

      <button v-on:click="validateRequest" type="button" class="btn btn-primary">Add user</button>
      </form>



  </div>

</template>

<script>
  import {EventBus} from '../../event_bus/global-event-bus';

  export default {
    name: 'app-user-add-form',
    data () {
      return {
        user: {},
        roles: [],
        usernameStateClass: '',
        passwordStateClass: '',
      }
    },
    methods: {

      clearFields () {
        document.getElementById("usernameField").value = "";
        document.getElementById("passwordField").value = "";
      },

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
                  this.roles = response.body
                })
      },

      validateRequest: function (e) {
        function checkPassword(str) {
          var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
          return re.test(str)
        }

        if (!this.user.username || !this.user.password) {
          this.$notify.alert('Oops!', 'Looks like you forgot something. Try again!', 'alert-danger')
        } else {
          var re = /^\w+$/
          if (!re.test(this.user.username)) {
            this.$notify.alert('Oops!', 'Username must contain only letters, numbers and underscores. ' +
                    'Try Again!', 'alert-danger')
          } else {
            if (!checkPassword(this.user.password)) {
              this.$notify.alert('Oops!', 'Password has a minimum of six characters and must contain ' +
                      'both letters and numbers', 'alert-danger')

            } else {
              let newUser = {
                username: this.user.username,
                password: this.user.password,
                role: {
                  id: this.user.role
                }
              }

              this.$http.post('user', newUser, {
                headers: {
                  'Authorization': this.$auth.getToken()
                }
              })
                      .then(function (response) {
                        if (response.body.error) {
                          var error = response.body.error.split(':')
                          this.$notify.alert('alert-danger', error[0])

                        } else {

                          this.errorBool = false;
                          this.$router.push({path: '/', query: {alert: 'Customer Added'}})
                          this.$notify.alert('Success!','user added', 'alert-success')

                          this.clearFields();

                        }
                      })

              e.preventDefault()
            }
          }
        }
      }
    },
    created: function () {
      this.fetchRoles()
    }
  }

</script>

<style scoped>

  #container {
    padding: 15px;
  }

  label {
    float: left;
  }

  input {

  }

  form {
    margin: 0 auto;
    width: 80%;
  }

  .alert {
    margin-top: 15px;
  }

</style>
