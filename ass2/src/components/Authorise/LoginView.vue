<template>
  <div class="row">
    <div class="col-md-6 offset-md-2">
      <h1>Login</h1>
      <hr />
      <form @submit.prevent="login">
        <div class="form-group mt-3">
          <label for="Email">Email</label>
          <input
            type="Email"
            class="form-control mt-3"
            id="Email"
            required
            v-model="LoginFormData.Email"
          />
        </div>
        <div class="form-group mt-3">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control mt-3"
            id="password"
            required
            v-model="LoginFormData.password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
        <br />
        <button type="button" class="btn btn-dark btn-block mt-3" @click="loginWithGoogle">
          Login With Google
        </button>
        <p v-if="errorMessage" class="alert text-danger">{{ errorMessage }}</p>
      </form>

      <p class="mt-3">
        Don't have an account? Click <span><router-link to="SignUp">Here</router-link></span> to
        Register
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const LoginFormData = ref({
  Email: '',
  password: ''
})

const errorMessage = ref('')

const login = () => {
  console.log(LoginFormData.value)
  signInWithEmailAndPassword(getAuth(), LoginFormData.value.Email, LoginFormData.value.password)
    .then((userCredential) => {
      console.log('Login Successful')
      console.log(userCredential)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code, error.message)
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'invalid email'
          break
        default:
          errorMessage.value = 'email or password is incorrect'
      }
    })
}

const loginWithGoogle = () => {
  console.log('Login With Google')
  const googleProvider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), googleProvider)
    .then((userCredential) => {
      console.log('Successfully login with Google')
      console.log(userCredential)
      router.push('/')
    })
    .catch((error) => {
      const googleCredential = GoogleAuthProvider.credentialFromError(error)
      console.log(error.code, error.message, error.email, googleCredential)
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email'
          break
        default:
          errorMessage.value = 'Email or password is incorrect'
      }
    })
}
</script>

<style scoped></style>
