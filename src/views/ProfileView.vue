<template>
    <div>
      <h3>Profile</h3>
  
      <form @submit.prevent="updateProfile">
        <div class="mb-3">
          <label>Email</label>
          <input v-model="user.email" type="email" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label>Password (leave blank if unchanged)</label>
          <input v-model="user.password" type="password" class="form-control" />
        </div>
  
        <div class="mb-3">
          <label>First Name</label>
          <input v-model="user.first_name" type="text" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label>Last Name</label>
          <input v-model="user.last_name" type="text" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label>Address</label>
          <input v-model="user.address" type="text" class="form-control" />
        </div>
  
        <div class="mb-3">
          <label>Phone</label>
          <input v-model="user.phone" type="text" class="form-control" />
        </div>
  
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import userService from '../services/userService'
  import { useAuth } from '../services/useAuth'

  const { user, setUser } = useAuth()

  const updateProfile = () => {
  // setelah update ke backend
  setUser({
    ...updatedUserFromServer,
    password: ''
  })
}
  </script>
  