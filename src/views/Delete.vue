<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'

const deleteInput = ref('')
const errorText = ref('')
const deleteInputValue = ref(false)
const router = useRouter()

const triggerShake = (field) => {
    field.value = true
    setTimeout(() => {
        field.value = false
    }, 300)
}

const check = async () => {
    if (deleteInput.value.trim() !== 'DELETE') {
        triggerShake(deleteInputValue)
        errorText.value = '* Must spell "DELETE" to continue *'
        return
    }

    const url = 'https://hap-app-api.azurewebsites.net/user'
    const token = localStorage.getItem('token')

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await fetch(url, options)

    if (response.status === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('email')
        localStorage.removeItem('username')

        router.push({
            name: 'home',
        })
        return
    } else if (response.status === 401) {
        triggerShake(deleteInputValue)
        errorText.value = '* Unauthorized *'
        return
    } else {
        console.log('server 500')
    }
}
</script>

<template>
    <main>
        <div class="delete-container">
            <div class="message-container">
                <h3>** You Sure About This **</h3>
                <h4>This is Permanent</h4>
            </div>
            <div class="input-container">
                <p>Enter "DELETE" to continue</p>
                <input type="text" placeholder="DELETE" />
            </div>

            <div class="error-container">
                <span>* error *</span>
            </div>
        </div>
    </main>
</template>

<style scoped>
.delete-container {
    display: flex;
    border: 2px solid white;
    height: 100vh;
}
</style>
