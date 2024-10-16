import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import OurService from './components/Storynav/OurService.vue'
import LoginView from './components/Authorise/LoginView.vue'
import SignUpView from './components/Authorise/SignUpView.vue'
import FeedbackView from './components/Authorise/feedbackView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import TheBooking from './components/Storynav/TheBooking.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView
  },

  {
    path: '/Storynav/our-service',
    name: 'our-service',
    component: OurService
  },
  {
    path: '/Storynav/our-booking',
    name: 'our-booking',
    component: TheBooking
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
  },
  {
    path: '/Authorise/feedback',
    name: 'feedback',
    component: FeedbackView,
    meta: {
      requiresAuth: true,
      requireAdmin: true
    }
  }
]

const getCurrentLoginUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

// const getCurrentAdminUser = () =>{
//   user = await getCurrentLoginUser
// }

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentLoginUser()) {
      next()
    } else {
      alert('You should login first')
      next({ name: 'login' })
    }
  } else {
    next()
  }
  // if (to.matched.some((record) => record.meta.requireAdmin)) {
  //   if (await getCurrentAdminUser()) {
  //     next()
  //   } else {
  //     alert('You should to be admin user')
  //     next({ name: 'login' })
  //   }
  // }
})

export default router
