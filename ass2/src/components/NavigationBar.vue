<template>
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
          <use xlink:href="#bootstrap" />
        </svg>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/" class="nav-link active" aria-current="page">Home</router-link></li>
        <li class="nav-item">
          <router-link to="/Storynav/about-us" class="nav-link active" aria-current="page"
            >About</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/Storynav/our-service" class="nav-link active" aria-current="page"
            >Service</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/Storynav/our-volunteer" class="nav-link active" aria-current="page"
            >Volunteer</router-link
          >
        </li>
      </ul>

      <form class="d-flex">
        <input class="btn btn-light" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-success" type="submit">Search</button>
      </form>

      <div v-if="isLogIN" class="col-md-3 text-end">
        <a href="#" class="btn btn-outline-primary" @click="handleLogout">Log out</a>
      </div>

      <div v-else class="col-md-3 text-end d-flex justify-content-end">
        <router-link to="/Authorise/login" class="btn btn-outline-primary me-2" aria-current="page"
          >Login</router-link
        >
        <router-link to="/Authorise/SignUp" class="btn btn-outline-primary" aria-current="page"
          >Sign Up</router-link
        >
      </div>
    </header>
  </div>
</template>

<script setup>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogIN = ref(false)
let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogIN.value = true
    } else {
      isLogIN.value = false
    }
  })
})

const handleLogout = () => {
  console.log('logout')
  signOut(auth)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style scoped></style>
