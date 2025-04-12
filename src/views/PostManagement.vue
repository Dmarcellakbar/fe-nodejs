<template>
    <div>
      <h3>Post Management</h3>
      <button class="btn btn-primary mb-3" @click="openModal()">+ Add Post</button>
  
      <!-- Post Table -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Post By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.name }}</td>
            <td>{{ post.category_name }}</td>
            <td>{{ post.user_first_name }} {{ post.user_last_name }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="openModal(post)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deletePost(post.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Post Modal -->
      <div class="modal fade" id="postModal" tabindex="-1">
        <div class="modal-dialog">
          <form @submit.prevent="savePost">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ selectedPost.id ? 'Edit Post' : 'Create Post' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Code</label>
                  <input v-model="selectedPost.code" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input v-model="selectedPost.name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category</label>
                  <select v-model="selectedPost.post_category_id" class="form-select" required>
                    <option value="" disabled>Select Category</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Detail</label>
                  <textarea v-model="selectedPost.description" class="form-control" rows="4"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Image</label>
                  <input type="file" class="form-control" @change="handleFileUpload" />
                </div>
                <div class="mb-3" v-if="imagePreview || selectedPost.image_file_path">
                <label class="form-label">Preview</label>
                <div>
                    <img
                    :src="imagePreview || `http://localhost:5004/${selectedPost.image_file_path}`"
                    alt="Image Preview"
                    class="img-fluid"
                    style="max-height: 200px"
                    />
                </div>
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
  import postService from '../services/postService'
  import categoryService from '../services/categoryService'
  import { useAuth } from '../services/useAuth'
  import * as bootstrap from 'bootstrap'
  import uploadService from '../services/uploadService'

  const { user } = useAuth()
  const posts = ref([])
  const selectedPost = ref({})
  const categories = ref([])
  const imagePreview = ref(null)
  
  const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
    const res = await uploadService.upload(file)
    selectedPost.value.image_id = res.file.id
    selectedPost.value.image_file_path = res.file.file_path
  }
}

  const fetchPosts = async () => {
    const res = await postService.getAll()
    posts.value = res.data
  }
  
  const fetchCategories = async () => {
    const res = await categoryService.getAll()
    categories.value = res.data
  }
  
  const openModal = (post = null) => {
  selectedPost.value = post
    ? { ...post }
    : {
        code: '',
        name: '',
        description: '',
        post_category_id: '',
        post_by: user.value.id,
        image_id: null,
        image_file_path: null
      }

  imagePreview.value = null // Reset preview untuk new or existing
  const modal = new bootstrap.Modal(document.getElementById('postModal'))
  modal.show()
}

  
  const savePost = async () => {
    if (selectedPost.value.id) {
      await postService.update(selectedPost.value.id, selectedPost.value)
    } else {
      await postService.create(selectedPost.value)
    }
  
    await fetchPosts()
    bootstrap.Modal.getInstance(document.getElementById('postModal')).hide()
    imagePreview.value = null
  }
  
  const deletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await postService.delete(id)
      await fetchPosts()
    }
  }
  
  onMounted(() => {
    fetchPosts()
    fetchCategories()
  })
  </script>
  