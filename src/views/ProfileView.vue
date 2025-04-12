<template>
  <div>
    <h3>Profile</h3>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="userLog.email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Password (leave blank if unchanged)</label>
        <input v-model="userLog.password" type="password" class="form-control" />
      </div>

      <div class="mb-3">
        <label>First Name</label>
        <input v-model="userLog.first_name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Last Name</label>
        <input v-model="userLog.last_name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Address</label>
        <input v-model="userLog.address" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Phone</label>
        <input v-model="userLog.phone" type="text" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import userService from '../services/userService'
import { useAuth } from '../services/useAuth'
const userLog = ref(JSON.parse(localStorage.getItem('userme') || '{}'))

const { user, setUser } = useAuth()
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const updateProfile = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Buat payload tanpa password jika kosong
    const payload = { ...userLog.value }
    if (!payload.password) {
      delete payload.password
    }

    const updatedUser = await userService.update(userLog.value.id, payload)
    // // Update user di state auth tanpa mengubah password
    setUser({
      ...updatedUser.data,
      password: '' // Reset password field setelah update
    })
    
    successMessage.value = 'Profile updated successfully!'
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    console.error('Failed to update profile:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to update profile'
  } finally {
    loading.value = false
  }
}
</script>