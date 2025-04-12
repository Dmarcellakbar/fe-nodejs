<template>
  <div class="container py-5">
    <h2 class="mb-4">Timeline</h2>
    <div class="timeline">
      <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item pb-2 d-flex align-items-start">
        <div class="me-4">
          <img :src="item.image" alt="image" class="rounded img-fixed-square" />
        </div>
        <!-- Inside .timeline-item div -->
        <div>
          <h5 class="mb-1">{{ item.title }} - {{ item.category }}</h5>
          <small class="text-muted">{{ item.date }}</small>
          <p class="text-muted">post by: {{ item.post_by }}</p>
          <p class="mt-2">{{ item.description }}</p>

          <div class="mb-2">
            <button class="btn btn-outline-primary btn-sm" @click="handleLike(item.id)">
              👍 Like ({{ reviews[item.id]?.likes || 0 }})
            </button>
          </div>

          <div class="mb-2">
            <input v-model="newComments[item.id]" class="form-control mb-1" placeholder="Add a comment..." />
            <button class="btn btn-outline-success btn-sm" @click="handleComment(item.id)">Comment</button>
          </div>

          <div class="mt-2" v-if="reviews[item.id]?.comments?.length">
            <strong>Comments:</strong>
            <ul class="list-unstyled">
              <li v-for="(comment, i) in reviews[item.id].comments" :key="i" class="small border-bottom pb-1 mb-1">
                {{ comment }}
              </li>
            </ul>
          </div>
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
const reviews = ref({}) // keyed by post_id
const newComments = ref({}) // for user input per post

// Load reviews from localStorage
const loadReviewsFromStorage = () => {
  const storedReviews = localStorage.getItem('postReviews')
  if (storedReviews) {
    reviews.value = JSON.parse(storedReviews)
  }
}

// Save reviews to localStorage
const saveReviewsToStorage = () => {
  localStorage.setItem('postReviews', JSON.stringify(reviews.value))
}

const loadReview = (postId) => {
  if (!reviews.value[postId]) {
    reviews.value[postId] = {
      likes: 0,
      comments: []
    }
  }
}

const fetchPosts = async () => {
  const res = await postService.getAll()
  posts.value = res.data
  // Initialize reviews for each post
  posts.value.forEach(post => loadReview(post.id))
}

const fetchCategories = async () => {
  const res = await categoryService.getAll()
  categories.value = res.data
}

const handleLike = (postId) => {
  if (!reviews.value[postId]) {
    reviews.value[postId] = { likes: 0, comments: [] }
  }
  reviews.value[postId].likes += 1
  saveReviewsToStorage()
}

const handleComment = (postId) => {
  const comment = newComments.value[postId]
  if (comment && comment.trim()) {
    if (!reviews.value[postId]) {
      reviews.value[postId] = { likes: 0, comments: [] }
    }
    reviews.value[postId].comments.push(comment)
    newComments.value[postId] = ''
    saveReviewsToStorage()
  }
}

const timelineItems = computed(() =>
  posts.value.map(item => ({
    id: item.id,
    title: item?.name,
    description: item?.description,
    image: `${url}/${item.image_file_path}`,
    date: dayjs(item?.updated_at).format('DD-MM-YYYY HH:mm'),
    category: item?.category_name,
    post_by: `${item?.user_first_name} ${item?.user_last_name}`
  }))
)

onMounted(() => {
  loadReviewsFromStorage()
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