<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="container">
    <form v-on:submit="validateRequest">
      <div class="form-group" v-bind:class="usernameStateClass">
        <label for="exampleInputEmail1">Username</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
               placeholder="username" v-model="user.username">
      </div>
      <div class="form-group" v-bind:class="passwordStateClass">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
               v-model="user.password">
      </div>
      <div class="form-group">
        <label for="exampleSelect1">Example select</label>
        <select class="form-control" id="exampleSelect1" v-model="user.role">
          <option v-for="role in roles" v-bind:value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>


      <button type="submit" class="btn btn-primary">Submit</button>
    </form>


    <div v-show="errorBool" class="alert alert-danger" role="alert">
      <strong>Oops!</strong> {{errorMessage}}
    </div>



  </div>

</template>

<script>
  export default {
    name: 'app-user-add-form',
    data () {
      return {
        user: {},
        roles: [],
        usernameStateClass: '',
        passwordStateClass: '',
        errorBool: false,
        errorMessage: ''
      }
    },
    methods: {
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
                  this.roles = response.body
                })
      },

      validateRequest: function (e) {
        function checkPassword (str) {
          var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
          return re.test(str)
        }

        if (!this.user.username || !this.user.password) {
          this.errorMessage = 'Looks like you forgot something. Try again!'
          this.errorBool = true
        } else {
          var re = /^\w+$/
          if (!re.test(this.user.username)) {
            this.errorMessage = 'Username must contain only letters, numbers and underscores. ' +
                    'Try Again!'
            this.errorBool = true
          } else {
            if (!checkPassword(this.user.password)) {
              this.errorMessage = 'Password has a minimum of six characters and must contain ' +
                      'both letters and numbers'
              this.errorBool = true
            } else {
              let newUser = {
                username: this.user.username,
                password: this.user.password,
                role: {
                  id: this.user.role
                }
              }

              this.$http.post('http://localhost:8080/user', newUser, {
                headers: {
                  'Authorization': this.$auth.getToken()
                }
              })
                      .then(function (response) {
                        console.log(response.body.error)
                        if (response.body.error) {
                          var error = response.body.error.split(':')

                          this.errorMessage = error[0]
                          this.errorBool = true
                        }
                        this.$router.push({path: '/', query: {alert: 'Customer Added'}})
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
  label {
    float: left;
  }

  .alert {
    margin-top: 15px;
  }

</style>
