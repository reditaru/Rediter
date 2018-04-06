import * as FeedApi from '../../services/Feed'
import Vue from 'vue'
const state = {
    currentFeed: 0,
    feeds: {
        1: {
            1: {
                id: 1,
                name: 'Guoker',
                address: 'https://www.appinn.com/feed/'
            },
            2: {
                id: 2,
                name: 'Test Feed2',
                address: 'http://feed.williamlong.info/'
            }
        },
        2: {
            3: {
                id: 3,
                name: 'T Fed'
            }
        }
    },
    loading: false,
    status: false,
    msg: ""
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
    },
    SET_FEEDS (state, payload) {
        let result = payload.feeds.reduce((a, b) => {
            a[b.id] = b;
            return a;
        }, {});
        Vue.set(state.feeds, payload.id, result);
    },
    CLEAR_FEEDS (state) {
        Vue.set(state, 'feeds', {});
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
    async requestNewPosts ({ commit }, payload) {
        commit('OPERATION_REQUEST');
        let data = await FeedApi.getFeedPosts(payload);
        if (data && data.success) {
                commit('OPERATION_SUCCESS');
                commit('Post/SET_POSTS', { feedId: payload.id, posts: data.items }, { root: true });
        } else {
                commit('OPERATION_FAIL', { msg: 'Request failed!' });
        };
    },
    async addNewFeed ({ commit }, payload) {
        commit('OPERATION_REQUEST');
        let data = await FeedApi.createFeed({ categoryId: payload.category, address: payload.address });
        if (data && data.data) {
            data = data.data;
            if (data.success) {
                commit('ADD_NEW_FEED', { categoryId: payload.category, feed: data.res });
                commit('OPERATION_SUCCESS');
            } else {
                commit('OPERATION_FAIL', { msg: data.msg || 'Meet some unknown error!'});
            }
        } else {
            commit('OPERATION_FAIL', { msg: 'Meet some unknown error!'});
        }
    },
    async getFeeds({ commit }, payload) {
        commit('OPERATION_REQUEST');
        let data = await FeedApi.getFeeds(payload);
        if (data && data.data) {
            data = data.data;
            if (data.success) {
                commit('SET_FEEDS', { id: data.res.id, feeds: data.res.feeds });
                commit('OPERATION_SUCCESS');
            } else {
                commit('OPERATION_FAIL', { msg: data.msg || 'Meet some unknown error!'});
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
  