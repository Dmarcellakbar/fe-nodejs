<template>
    <div class="container mt-5">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary mr-4">Login</button>
        <router-link to="/register">Go to Register</router-link>
      </form>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  const router = useRouter()
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_ENDPOINT_URL_DATABASE}/api/auth/login`, {
        email: email.value,
        password: password.value
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userme', JSON.stringify(res.data))
      router.push('/dashboard')
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
    }
  }
  </script>
  