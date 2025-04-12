<template>
    <div class="container mt-5">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Register</button>
      </form>
  
      <div v-if="success" class="alert alert-success mt-3">
        Registration successful! <router-link to="/login">Go to login</router-link>
      </div>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const success = ref(false)
  const error = ref(null)
  
  const handleRegister = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_ENDPOINT_URL_DATABASE}/api/auth/register`, {
        email: email.value,
        password: password.value
      })
      success.value = true
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      success.value = false
    }
  }
  </script>
  