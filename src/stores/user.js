import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const token = ref(null)
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const username = ref('')
    const id = ref('')

    const setUser = (data) => {
        token.value = data.token
        firstName.value = data.user.firstName
        lastName.value = data.user.lastName
        email.value = data.user.email
        username.value = data.user.userName
        id.value = data.user['_id']
    }

    const clearUser = () => {
        token.value = null
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        username.value = ''
        id.value = ''
    }

    return { token, firstName, lastName, email, username, id, setUser, clearUser }
})
