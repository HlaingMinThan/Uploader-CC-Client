import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Files from '../views/Files.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Plans from '../views/Plans.vue'
import Checkout from '../views/Checkout.vue'
import MyAccount from '../views/MyAccount.vue'
import SwapPlan from '../views/SwapPlan.vue'
import DownloadFile from '../views/DownloadFile.vue'
import auth from '@/middlewares/auth.js';
import subscribed from '@/middlewares/subscribed.js';
import guest from '@/middlewares/guest.js';
import store from '@/store/index';
import middlewarePipeline from './middlewarePipeline'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/files',
    name: 'Files',
    component: Files,
    meta : {
      middleware : [auth]
    }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta : {
      middleware : [guest]
    }
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp,
    meta : {
      middleware : [guest]
    }
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans
  },
  {
    path: '/swap-plan',
    name: 'SwapPlan',
    component: SwapPlan,
    meta : {
      middleware : [auth,subscribed]
    }
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta : {
      middleware : [auth]
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    props : route => ({ plan: route.query.plan }),
    meta : {
      middleware : [auth]
    }
  },
  {
    path: '/download/:uuid',
    name: 'DownloadFile',
    component: DownloadFile,
    props : route => ({ uuid: route.params.uuid,token : route.query.token })
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  let middlewares = to.meta.middleware;

  if(!middlewares) {
    return next()
  }

  let context = {store,next};
  return middlewares[0]({
    ...context,
    next : middlewarePipeline(context,middlewares,1)
  });
});

export default router
