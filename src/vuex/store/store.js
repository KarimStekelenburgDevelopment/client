// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    user: {
      roleInfo: {
        id: null,
        role: null,
      },
    },
  },
  getters: {
    currentUser: {
      getRole(state) {
        this.fetchUserRole();
        return state.role;
      },
      getRoleId(state) {
        return state.role.id;
      },
      getRoleName(state) {
        return state.role.name;
      },
    }



  },



  mutations: {
    setUserRole(state, currentRole) {
      state.user.roleInfo.id = currentRole.id;
      state.user.roleInfo.name = currentRole.name;
    },
  },
  actions: {
    fetchUserRole(context){
      console.log("nanana")
      Vue.http.get('user/iHaveRights',
      )
        .then(response => {
          console.log(response.body)

          context.commit('setUserRole', response.body)

        })
    }
  }
});