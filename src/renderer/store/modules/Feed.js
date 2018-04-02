import * as FeedApi from '../../services/Feed'

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
                name: 'Test Feed2'
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
    async requestNewPosts ({ commit }, payload) {
        console.log('enter');
        commit('OPERATION_REQUEST');
        let data = await FeedApi.getFeedPosts(payload);
        if (data.success) {
            commit('OPERATION_SUCCESS');
            console.log(data);
        }
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  