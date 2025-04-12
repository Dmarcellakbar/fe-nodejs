import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(JSON.parse(localStorage.getItem('userme') || '{}'))

export function useAuth() {
  const router = useRouter()
  
  const setUser = (newUser) => {
    localStorage.setItem('userme', JSON.stringify(newUser))
    user.value = { ...newUser }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userme')
    user.value = {}
    router.push('/login') // Navigasi ke halaman login setelah logout
  }

  return {
    user,
    setUser,
    logout
  }
}