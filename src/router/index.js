import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Files from '../views/Files.vue'
import SignIn from '../views/SignIn.vue'
import Plans from '../views/Plans.vue'
import Checkout from '../views/Checkout.vue'
import MyAccount from '../views/MyAccount.vue'

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
    path: '/plans',
    name: 'Plans',
    component: Plans
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
