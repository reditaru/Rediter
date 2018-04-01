const state = {
    currentPost: 0,
    posts: {

    }
  }
  
  const mutations = {
    SET_CURRENT_POST (state, payload) {
        state.currentPost = payload.currentPost;
    },
    ADD_NEW_POST (state, payload) {
        state.posts = {
            ...state.posts,
            [payload.feedId]: { 
                ...(state.posts[payload.feedId] || {}),
                [payload.post.link]: payload.post
            }
        }
    },
    DELETE_POST (state, payload) {
        delete state[payload.feedId][payload.link];
        state.posts = {
            ...state.posts
        }
    }
  }
  
  const actions = {
    requestNewPosts ({ commit }) {
      // do something async
      commit('INCREMENT_MAIN_COUNTER')
    }
  }
  
  export default {
    state,
    mutations,
    actions
  }
  