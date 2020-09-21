import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import List from '@/components/List'
import Newone from '@/components/Newone'
import Show from '@/components/Show'
import Mylist from '@/components/Mylist'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/newone',
      name: 'Newone',
      component: Newone
    },
    {
      path: '/show/:postId',
      name: 'Show',
      component: Show
    },
    {
      path: '/mylist',
      name: 'Mylist',
      component: Mylist
    },
    {
      path: '/edit/:postId',
      name: 'Edit',
      component: Edit
    }

  ]
})
