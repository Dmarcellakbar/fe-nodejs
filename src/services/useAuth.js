import { ref } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('userme') || '{}'))

export function useAuth() {
  const setUser = (newUser) => {
    localStorage.setItem('userme', JSON.stringify(newUser))
    user.value = { ...newUser }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userme')
    user.value = {}
  }

  return {
    user,
    setUser,
    logout
  }
}
