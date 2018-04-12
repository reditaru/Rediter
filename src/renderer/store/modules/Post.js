import Vue from 'vue'
import * as FeedApi from '../../services/Feed'
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
        Vue.set(state.posts[payload.currentFeed][payload.currentPost], 'status', true);
    },
    ADD_NEW_POST (state, payload) {
        state.posts[payload.feedId] = {
            ...(state.posts[payload.feedId] || {}),
            [payload.post.link]: payload.post
        }
    },
    SET_POSTS (state, payload) {
        let data = payload.posts;
        if (Object.prototype.toString.call(payload.posts) === '[object Array]') {
            data = {};
            for (let post of payload.posts){
                let status = state.posts[payload.feedId] && state.posts[payload.feedId][post.link] && state.posts[payload.feedId][post.link].status;
                data[post.link] = { ...post, status: status };
            }
        }
        state.posts = {
            ...state.posts,
            [payload.feedId]: {
                ...(state.posts[payload.feedId] || {}),
                ...data
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
    async saveToLocal ({ commit, state }) {
        await FeedApi.setLocalPosts(state.posts);
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  