<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="username">Username</label>
              <input
                id="username"
                v-model="formData.username"
                class="form-control"
                type="text"
                @blur="validateForm"
                @input="validateForm"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="password">Password</label>
              <input
                id="password"
                v-model="formData.password"
                class="form-control"
                type="password"
                @blur="validateForm"
                @input="validateForm"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="email">Email</label>
              <input
                id="email"
                v-model="formData.email"
                class="form-control"
                type="email"
                @blur="validateForm"
                @input="validateForm"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="col-md-6">
              <div class="form-check">
                <input
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="gender">Gender</label>
              <select id="gender" v-model="formData.gender" class="form-select">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="reason">Reason for joining</label>
              <textarea
                id="reason"
                v-model="formData.reason"
                class="form-control"
                rows="3"
              ></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            </div>
          </div>
          <div class="text-center">
            <button class="btn btn-primary me-2" type="submit">Submit</button>
            <button class="btn btn-secondary" type="button" @click="clearForm">Clear</button>
          </div>
        </form>
        <div class="card" style="margin-top: 20px">
          <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="isAustralian" header="Australian Resident"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { z } from 'zod'

// 定义 Zod schema
const schema = z.object({
  username: z.string().min(3, 'Name must be at least 3 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/\d/, 'Password must contain at least one number.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),
  email: z.string().email('Invalid email format'),
  isAustralian: z.boolean().optional(),
  reason: z.string().optional(),
  gender: z.string().nonempty('Gender is required')
})

const formData = ref({
  username: '',
  password: '',
  email: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const errors = ref({
  username: null,
  password: null,
  email: null,
  gender: null,
  reason: null
})

const validateForm = () => {
  try {
    schema.parse(formData.value)
    errors.value = {} // 清除错误信息
  } catch (e) {
    const formattedErrors = {}
    e.errors.forEach((error) => {
      formattedErrors[error.path[0]] = error.message
    })
    errors.value = formattedErrors
  }
}

const submittedCards = ref([])

const submitForm = () => {
  validateForm()
  if (Object.keys(errors.value).length === 0) {
    submittedCards.value.push({
      ...formData.value
    })
    clearForm()
    alert('Form submitted!')
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    email: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
  errors.value = {}
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>
