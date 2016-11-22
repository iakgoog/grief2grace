import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../components/Home'
import SmallImages from '../components/SmallImages'
import PlayAnimation from '../components/PlayAnimation'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/small-images', component: SmallImages },
    { path: '/play-animation', component: PlayAnimation },
    /* {
      path: '/time-entries',
      component: TimeEntries,
      children: [
        { path: 'log-time', component: LogTime }
      ]
    }, */
    { path: '*', redirect: '/' }
  ]
})
