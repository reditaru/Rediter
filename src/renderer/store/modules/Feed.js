const state = {
    currentFeed: 0,
    feeds: {

    }
  }
  
  const mutations = {
    SET_CURRENT_FEED (state, payload) {
        state.currentFeed = payload.currentFeed;
    },
    ADD_NEW_FEED (state, payload) {
        state.feeds = {
            ...state.feeds,
            [payload.categoryId]: { 
                ...(state.feeds[payload.categoryId] || {}),
                [payload.feed.id]: payload.feed 
            }
        }
    },
    DELETE_FEED (state, payload) {
        delete state[payload.id][payload.feedId];
        state.feeds = {
            ...state.feeds
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
  