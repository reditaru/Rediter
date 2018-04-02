const state = {
    currentPost: 0,
    posts: {

    },
    loading: false,
    status: false,
    msg: ""
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
    requestNewPosts ({ commit }) {
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
  