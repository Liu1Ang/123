import Vue from 'vue';
import Router from 'vue-router';
import pos from '@/components/page/pos';
import foods from '@/components/page/foods';
import poscfig from '@/components/page/poscfig';
import tongJi from '@/components/page/tongJi';
import vip from '@/components/page/vip';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: pos
    },
    {
      path: '/foods',
      name: 'foods',
      component: foods
    },
    {
      path: '/poscfig',
      name: 'poscfig',
      component: poscfig
    },
    {
      path: '/tongJi',
      name: 'tongJi',
      component: tongJi
    },
    {
      path: '/vip',
      name: 'vip',
      component: vip
    }
  ]
})
