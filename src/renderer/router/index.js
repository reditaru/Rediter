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
        next(store.dispatch('Category/getCategories', { test: true }));
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
