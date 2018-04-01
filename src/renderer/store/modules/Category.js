const state = {
    currentCategory: 0,
    categories: {}
  }
  
  const mutations = {
    SET_CURRENT_CATEGORY (state, payload) {
      state.currentCateogy = payload.currentCateogy;
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
    }
  }
  
  const actions = {
    someAsyncTask ({ commit }) {
      // do something async
      commit('INCREMENT_MAIN_COUNTER')
    }
  }
  
  export default {
    state,
    mutations,
    actions
  }
  