    const state = {
        user:{

        },
        loading: false,
        status: false,
        msg: ""
    }
  
  const mutations = {
    SET_CURRENT_USER (state, payload) {
      state.user = payload.user;
    },
    OPERATION_REQUEST (state) {
      state.loading = true
    },
    OPERATION_SUCCESS (state) {
      state.loading = false;
      state.status = true;
    },
    OPERATION_FAIL (state,payload) {
      state.loading = false;
      state.status = false;
      state.msg = payload.msg;
    }
  }
  
  const actions = {
    async login ({ commit }) {
      commit('OPERATION_REQUEST');
      
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  