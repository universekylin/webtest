<template>
  <div class="row">
    <div class="col-md-6 offset-md-2">
      <h1>Sign Up</h1>
      <hr />
      <form @submit.prevent="SignUp">
        <div class="form-group mt-3">
          <label for="Username">Username</label>
          <input
            type="text"
            class="form-control mt-3"
            id="Username"
            minlength="2"
            required
            v-model="SignUpFormData.username"
          />
        </div>
        <div class="form-group mt-3">
          <label for="Email">Email</label>
          <input
            type="email"
            class="form-control mt-3"
            id="Email"
            required
            v-model="SignUpFormData.email"
          />
        </div>
        <div class="form-group mt-3">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control mt-3"
            id="password"
            minlength="4"
            maxlength="11"
            required
            v-model="SignUpFormData.password"
            @input="validatePassword"
          />
          <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
        </div>
        <div class="form-group mt-3">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            class="form-control mt-3"
            id="confirmPassword"
            required
            v-model="SignUpFormData.confirmPassword"
            @input="validateConfirmPassword"
          />
          <small v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError }}</small>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block mt-3"
          :disabled="passwordError || confirmPasswordError"
        >
          Submit
        </button>
        <br />
        <button type="button" class="btn btn-dark btn-block mt-3" @click="signUpWithGoogle">
          Sign Up With Google
        </button>
      </form>

      <p class="mt-3">
        Already have an account? Click <span><router-link to="Login">Here</router-link></span> to
        login
      </p>

      <p v-if="errorMessage" class="alert text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const SignUpFormData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const passwordError = ref(null)
const confirmPasswordError = ref(null)

const validatePassword = () => {
  const password = SignUpFormData.value.password
  const uppercaseRegex = /[A-Z]/
  const specialCharRegex = /[!@#\\$%\\^&\\*]/

  if (!uppercaseRegex.test(password)) {
    passwordError.value = 'Password must contain at least one uppercase letter.'
  } else if (!specialCharRegex.test(password)) {
    passwordError.value = 'Password must contain at least one special character (!@# etc.).'
  } else {
    passwordError.value = null
  }

  validateConfirmPassword()
}

const validateConfirmPassword = () => {
  if (SignUpFormData.value.password !== SignUpFormData.value.confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match.'
  } else {
    confirmPasswordError.value = null
  }
}

const errorMessage = ref('')

const SignUp = () => {
  if (!passwordError.value && !confirmPasswordError.value) {
    createUserWithEmailAndPassword(
      getAuth(),
      SignUpFormData.value.email,
      SignUpFormData.value.password
    )
      .then((userCredential) => {
        console.log('Succesfully registered')
        console.log(userCredential)
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.errorMessage
        console.log(errorCode, errorMessage)
      })
  }
}

const signUpWithGoogle = () => {
  console.log('Sign Up With Google')
  const googleProvider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), googleProvider)
    .then((userCredential) => {
      console.log('Successfully signed up with Google')
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
