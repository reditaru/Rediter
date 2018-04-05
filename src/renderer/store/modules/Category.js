import * as CategoryAPI from '../../services/Category'
import Vue from 'vue'
const state = {
    currentCategory: 0,
    categories: {
      1: {
        id: 1,
        name: 'Test Category'
      },
      2: {
        id: 2,
        name: 'Y Cate'
      }
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
        delete state[payload.id];
        state.categories = {
            ...state.categories
        }
    },
    SET_CATEGORY (state, payload) {
        state.categories = {
            ...state.categories,
            [payload.id]: payload
        }
    },
    SET_CATEGORIES (state, payload) {
      let result = payload.reduce((a,b) => {
        a[b.id] = b;
        return a;
      },{});
      state = {
        ...state,
        categories: result
      }
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
      let data = (await CategoryAPI.getCategories()).data;
      if (data.success) {
        commit('SET_CATEGORIES', data.res);
        commit('OPERATION_SUCCESS');
      } else {
        commit('OPERATION_FAIL', data);
      }
    },
    async createCategory({ commit }, payload) {
      commit('OPERATION_REQUEST');
      let data = (await CategoryAPI.createCategory(payload)).data;
      if (data.success) {
        commit('SET_CATEGORY', data.res);
        commit('OPERATION_SUCCESS');
      } else {
        commit('OPERATION_FAIL', data);
      }
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  