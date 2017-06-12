<template xmlns:v-on="http://www.w3.org/1999/xhtml">


    <div class="app flex-row align-items-baseline">
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
                    <input type="text" class="form-control" placeholder="Username" v-model="user.username" v-on:keyup="keymonitor">
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                    <input type="password" class="form-control" placeholder="Password" v-model="user.password" v-on:keyup="keymonitor">
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
        <div class="row justify-content-center">
          <div id="errorMessage" v-show="errorBool" class="alert alert-danger" role="alert">
            <strong>Oops!</strong><br> {{errorMessage}} <br>
            <button id="errorButton" type="button" class="btn btn-link" v-on:click="hideError">dismiss
            </button>
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
        user: {},
        errorBool: false,
        errorMessage: ''
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
          this.errorMessage = 'Looks like you forgot something. Try again!'
          this.errorBool = true
        }

        let loginRequest = {
          username: this.user.username,
          password: this.user.password
        }

        this.$http.post('http://localhost:8080/login', loginRequest)
                .then(response => {
                  if (response.body.error){
                    this.errorMessage = response.body.error;
                    this.errorBool = true
                  }
                  else if (response.body.token) {
                    this.$auth.setToken(response.body.token);
                    this.errorBool = false;
                    this.$router.push('/')

                  } else {
                    this.errorMessage = 'The server did not sent an error, but no access token is received either.';
                    this.errorBool = true
                  }

                })

      },
      hideError(){
        this.errorBool = false;
      }
    }
  }
</script>
<style scoped>
  #errorMessage {
    text-align: center;
  }

  #errorButton {
    margin: 0 auto;
    display: block;
  }
</style>