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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans
  },
  {
    path: '/swap-plan',
    name: 'SwapPlan',
    component: SwapPlan
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    props : route => ({ plan: route.query.plan })
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

export default router
