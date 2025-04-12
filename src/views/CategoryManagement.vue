<template>
    <div>
      <h3>Category Management</h3>
      <button class="btn btn-primary mb-3" @click="openModal()">+ Add Category</button>
  
      <table class="table table-bordered">
        <thead><tr><th>Name</th><th>Level</th><th>Actions</th></tr></thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.level }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="openModal(category)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Category Modal -->
      <div class="modal fade" id="categoryModal" tabindex="-1">
        <div class="modal-dialog">
          <form @submit.prevent="saveCategory">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ selectedCategory.id ? 'Edit Category' : 'Create Category' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Code</label>
                  <input v-model="selectedCategory.code" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input v-model="selectedCategory.name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Level</label>
                  <input
                        type="number"
                        v-model.number="selectedCategory.level"
                        class="form-control"
                        required
                    />               
                 </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
                <button class="btn btn-success" type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import categoryService from '../services/categoryService'
  import * as bootstrap from 'bootstrap'

  const categories = ref([])
  const selectedCategory = ref({})
  
  const fetchCategories = async () => {
    const res = await categoryService.getAll()
    categories.value = res.data
  }
  
  const openModal = (category = {}) => {
    selectedCategory.value = { ...category }
    const modal = new bootstrap.Modal(document.getElementById('categoryModal'))
    modal.show()
  }
  
  const saveCategory = async () => {
    if (selectedCategory.value.id) {
      await categoryService.update(selectedCategory.value.id, selectedCategory.value)
    } else {
      await categoryService.create(selectedCategory.value)
    }
    await fetchCategories()
    bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide()
  }
  
  const deleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await categoryService.delete(id)
      await fetchCategories()
    }
  }
  
  onMounted(fetchCategories)
  </script>
  