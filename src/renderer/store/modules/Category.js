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
    UPDATE_CATEGORY (state, payload) {
        state.categories = {
            ...state.categories,
            [payload.category.id]: payload.category
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
    someAsyncTask ({ commit }) {
      // do something async
      commit('INCREMENT_MAIN_COUNTER')
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  