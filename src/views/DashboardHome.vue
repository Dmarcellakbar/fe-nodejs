<template>
    <div class="container py-5">
      <h2 class="mb-4">Timeline</h2>
      <div class="timeline">
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="timeline-item pb-2 d-flex align-items-start"
        >
          <div class="me-4">
            <img :src="item.image" alt="image" class="rounded img-fixed-square" />
        </div>
          <div>
            <h5 class="mb-1">{{ item.title }} - {{ item.category }}</h5>
            <small class="text-muted">{{ item.date }}</small>
            <p class="text-muted">post by: {{ item.post_by }}</p>
            <p class="mt-2">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue'
import postService from '../services/postService'
import categoryService from '../services/categoryService'
import dayjs from 'dayjs'

const url = import.meta.env.VITE_ENDPOINT_URL_DATABASE
const posts = ref([])
const categories = ref([])

const fetchPosts = async () => {
  const res = await postService.getAll()
  posts.value = res.data
}

const fetchCategories = async () => {
  const res = await categoryService.getAll()
  categories.value = res.data
}

const timelineItems = computed(() =>
  posts.value.map(item => ({
    title: item?.name,
    description: item?.description,
    image: `${url}/${item.image_file_path}`,
    date: dayjs(item?.updated_at).format('DD-MM-YYYY HH:mm'),
    category: item?.category_name,
    post_by: `${item?.user_first_name} ${item?.user_last_name}`
  }))
)

onMounted(() => {
  fetchPosts()
  fetchCategories()
})
</script>

  
  <style scoped>
  .timeline-item {
    border-left: 4px solid #0d6efd;
    padding-left: 20px;
    position: relative;
  }
  
  .timeline-item::before {
    content: "";
    width: 16px;
    height: 16px;
    background-color: #0d6efd;
    border-radius: 50%;
    position: absolute;
    left: -10px;
    top: 10px;
  }

.img-fixed-square {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
  </style>
  