import * as CategoryAPI from '../../services/Category'
import Vue from 'vue'
const state = {
    currentCategory: 0,
    categories: {

    },
    loading: false,
    status: false,
    msg: ""
  }
  
  const mutations = {
    SET_CURRENT_CATEGORY (state, payload) {
      state.currentCategory = payload.currentCategory;
    },
    DELETE_CATEGORY (state, payload) {
        Vue.delete(state.categories,payload.id);
    },
    SET_CATEGORY (state, payload) {
        state.categories = {
            ...state.categories,
            [payload.id]: payload
        }
    },
    CLEAR_CATEGORIES (state) {
      Vue.set(state, 'categories', {});
    },
    SET_CATEGORIES (state, payload) {
      let result = payload.reduce((a,b) => {
        a[b.id] = b;
        return a;
      },{});
      Vue.set(state, 'categories', result);
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
    async getCategories ({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await CategoryAPI.getCategories();
      if (data && data.data) {
        data = data.data;
        if (data.success) {
          commit('SET_CATEGORIES', data.res);
          commit('OPERATION_SUCCESS');
        } else {
          commit('OPERATION_FAIL', data);
        }
      } else {
        commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
      }
    },
    async createCategory({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await CategoryAPI.createCategory(payload);
      if (data && data.data) {
        data = data.data;
        if (data.success) {
          commit('SET_CATEGORY', data.res);
          commit('OPERATION_SUCCESS');
        } else {
          commit('OPERATION_FAIL', data);
        }
      } else {
        commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
      }
    },
    async updateCategory({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await CategoryAPI.updateCategory(payload);
      if (data && data.data) {
        data = data.data;
        if (data.success) {
          commit('SET_CATEGORY', data.res);
          commit('OPERATION_SUCCESS');
        } else {
          commit('OPERATION_FAIL', data);
        }
      } else {
        commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
      }
    },
    async deleteCategory({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = await CategoryAPI.deleteCategory(payload);
      if (data && data.data) {
        data = data.data;
        if (data.success) {
          commit('DELETE_CATEGORY', payload);
          commit('OPERATION_SUCCESS');
        } else {
          commit('OPERATION_FAIL', data);
        }
      } else {
        commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
      }
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  