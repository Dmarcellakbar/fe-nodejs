<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <div class="bg-light p-3 vh-100" style="width: 250px">
        <h4 class="mb-4">Dashboard</h4>
        <h5 class="mb-4">{{ userLog.first_name }} {{ userLog.last_name }}</h5>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/posts" class="nav-link">Posts</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/categories" class="nav-link">Categories</router-link>
          </li>
          <li class="nav-item"><router-link class="nav-link" to="/dashboard/profile">Profile</router-link></li>

          <li class="nav-item mt-4">
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
  
      <!-- Page Content -->
      <div class="flex-grow-1 p-4">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuth } from '../services/useAuth'
  import { ref } from 'vue'

  const userLog = ref(JSON.parse(localStorage.getItem('userme') || '{}'))

    const { logout } = useAuth()

  </script>
  