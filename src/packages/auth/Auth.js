/**
 * Created by karimstekelenburg on 12/06/2017.
 */

export default function (Vue) {
  Vue.auth = {
    setToken (token) {
      sessionStorage.setItem('token', token)
    },

    getToken () {
      var token = sessionStorage.getItem('token')

      if (!token) {
        return null
      }

      return token
    },

    destroyToken () {
      sessionStorage.removeItem('token')
    },

    isAuthenticated () {
      if (this.getToken()) {
        return true
      } else {
        return false
      }
    }
  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return Vue.auth
      }
    }

  })
}
