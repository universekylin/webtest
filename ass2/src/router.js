import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import AboutUs from './components/Storynav/AboutUs.vue'
import OurService from './components/Storynav/OurService.vue'
import TheVolunteer from './components/Storynav/TheVolunteer.vue'
import LoginView from './components/Authorise/LoginView.vue'
import SignUpView from './components/Authorise/SignUpView.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView
  },
  {
    path: '/Storynav/about-us',
    name: 'about-us',
    component: AboutUs
  },
  {
    path: '/Storynav/our-service',
    name: 'our-service',
    component: OurService
  },
  {
    path: '/Storynav/our-volunteer',
    name: 'our-volunteer',
    component: TheVolunteer
  },
  {
    path: '/Authorise/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Authorise/SignUp',
    name: 'SignUp',
    component: SignUpView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
