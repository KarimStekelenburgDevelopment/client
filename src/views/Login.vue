<template xmlns:v-on="http://www.w3.org/1999/xhtml">


    <div id="container" class="app flex-row align-items-baseline">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card-group mb-0">
              <div class="card p-4">
                <div class="card-block">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <div class="input-group mb-3">
                    <span class="input-group-addon"><i class="icon-user"></i></span>
                    <input type="text" class="form-control" placeholder="Username" v-model="user.username"
                           v-on:keyup="keymonitor" autocapitalize="none">
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                    <input type="password" class="form-control" placeholder="Password" v-model="user.password"
                           v-on:keyup="keymonitor" autocapitalize="none">
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button type="button" class="btn btn-primary px-4" v-on:click='requestLogin'>Login</button>
                    </div>
                    <!--<div class="col-6 text-right">-->
                    <!--<button type="button" class="btn btn-link px-0">Forgot password?</button>-->
                    <!--</div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: {}
      }
    },
    methods: {
      keymonitor: function(event) {
        if (event.key == "Enter") {
          this.requestLogin()
        }
      },
      requestLogin() {
        if (!this.user.username || !this.user.password) {
          this.$notify.alert('Oops!', 'Looks like you forgot something. Try again!', 'alert-danger')
        } else {


          let loginRequest = {
            username: this.user.username,
            password: this.user.password
          }

          this.$http.post('login', loginRequest)
                  .then(response => {
                    if (response.body.error) {
                      this.$notify.alert('Oops!',
                              response.body.error, 'alert-danger')

                    }
                    else if (response.body.token) {
                      this.$auth.setToken(response.body.token);
                      this.errorBool = false;
                      this.$router.push('/')

                    } else {
                      this.$notify.alert('Oops!',
                              'The server did not sent an error, but no access token is received either.', 'alert-danger')
                    }

                  })
        }

      },
      hideError(){
      }
    },

  }
</script>
<style scoped>
  #container{
    /*min-height: 60vh;*/
    height: 20vh;
  }

  #errorMessage {
    text-align: center;
  }

  #errorButton {
    margin: 0 auto;
    display: block;
  }
</style>