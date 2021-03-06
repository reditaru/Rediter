import * as FeedApi from '../../services/Feed'
import Vue from 'vue'
const state = {
    currentFeed: 0,
    feeds: {
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
        Vue.delete(state.feeds[payload.category], payload.id);
    },
    SET_FEEDS (state, payload) {
        let result = payload.feeds.reduce((a, b) => {
            a[b.id] = b;
            return a;
        }, {});
        result = { ...state.feeds[payload.id], ...result };
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
        let netRequest = FeedApi.getFeedPosts(payload);
        let localRequest = payload.local ? FeedApi.getLocalPosts(payload):Promise.resolve();
        await Promise.all([ netRequest, localRequest ])
            .then((res) => {
                let data = res[0];
                let localData = res[1];
                if (data && data.success && (!payload.local || (payload.local && localData))) {
                        commit('OPERATION_SUCCESS');
                        commit('Post/SET_POSTS', { feedId: payload.id, posts: data.items }, { root: true });
                        if (payload.local && localData.success)
                            commit('Post/SET_POSTS', { feedId: payload.id, posts: localData.res }, { root: true });
                } else {
                        commit('OPERATION_FAIL', { msg: 'Request failed!' });
                };
            })
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
    },
    async removeFeed({ commit }, payload) {
        commit('OPERATION_REQUEST');
        let data = await FeedApi.deleteFeed(payload);
        if (data && data.data) {
            data = data.data;
            if (data.success) {
                commit('DELETE_FEED', { ...payload });
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
  