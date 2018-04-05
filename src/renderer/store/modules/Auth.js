    import * as AuthAPI from '../../services/Auth'
    import auth from '../../utils/auth'
    const state = {
        user:{

        },
        loading: false,
        status: false,
        msg: "",
        isLogin: false
    }
  
  const mutations = {
    SET_CURRENT_USER (state, payload) {
      state.user = payload;
    },
    SET_LOGIN_STATUS (state, isLogin) {
      state.isLogin = isLogin;
    },
    OPERATION_REQUEST (state) {
      state.loading = true
    },
    OPERATION_SUCCESS (state) {
      state.loading = false;
      state.status = true;
    },
    OPERATION_FAIL (state, payload) {
      state.loading = false;
      state.status = false;
      state.msg = payload.msg;
    }
  }
  
  const actions = {
    async login ({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = (await AuthAPI.login(payload)).data;
      if (data.success) {
        commit('SET_CURRENT_USER', data.res);
        auth.setAuth(data.res.token);
        commit('SET_LOGIN_STATUS', true);
        commit('OPERATION_SUCCESS');
      } else {
        commit('OPERATION_FAIL', data);
      }
    },
    async register({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = (await AuthAPI.register(payload)).data;
      if (data.success) {
        commit('OPERATION_SUCCESS');
      } else {
        commit('OPERATION_FAIL', data);
      }
    },
    async logout({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await AuthAPI.logout(payload);
      auth.clearAuth();
      commit('OPERATION_SUCCESS');
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  