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
    async login ({ dispatch, commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await AuthAPI.login(payload);
      if (data && data.data) {
        data = data.data;
        if (data.success) {
          commit('SET_CURRENT_USER', data.res);
          auth.setAuth(data.res.token);
          localStorage.setItem('user', JSON.stringify(data.res));
          dispatch('Category/getCategories', null, { root: true });
          commit('SET_LOGIN_STATUS', true);
          commit('OPERATION_SUCCESS');
        } else {
          commit('OPERATION_FAIL', data);
        }
      } else {
        commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
      }
    },
    async register({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await AuthAPI.register(payload);
      if (data && data.data) {
        data = data.data;
        if (data.success) {
          commit('OPERATION_SUCCESS');
        } else {
          commit('OPERATION_FAIL', data);
        }
      } else {
        commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
      }
    },
    async logout({ commit }, payload) {
      commit('OPERATION_REQUEST');
      //let data = await AuthAPI.logout(payload);
      commit('SET_CURRENT_USER', {});
      commit('SET_LOGIN_STATUS', false);
      commit('Category/CLEAR_CATEGORIES', null, { root: true });
      commit('Feed/CLEAR_FEEDS', null, { root: true });
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
  