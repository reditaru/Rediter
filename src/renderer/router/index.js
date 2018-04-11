import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: require('@/components/Layout').default,
      beforeEnter:(to,from,next)=>{
        let user = JSON.parse(localStorage.getItem('user'));
        store.commit('Auth/SET_CURRENT_USER', user);
        next(store.dispatch('Category/getCategories', null));
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
