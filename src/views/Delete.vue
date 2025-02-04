<script setup>
import Header from '@/components/Header.vue'
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
    <Header>
        <nav>
            <RouterLink to="/main">Back</RouterLink>
        </nav>
    </Header>

    <main>
        <div class="container flex">
            <div class="box-container flex">
                <div class="error-container flex">
                    <div v-if="errorText" class="errorText">{{ errorText }}</div>
                </div>
                <div class="message-container flex">
                    <h1>** You Sure About This **</h1>
                    <h3>This is Permenant</h3>
                </div>
                <div class="delete-container flex">
                    <h3>Enter "DELETE" to Continue</h3>
                    <input
                        type="text"
                        v-model="deleteInput"
                        :class="{ shake: deleteInputValue }"
                        placeholder="DELETE"
                    />
                    <button type="submit" class="deleteButton" @click="check()">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    width: 100%;
    margin-top: 2rem;
    justify-content: center;
    align-items: center;
    font-family: var(--font-header-nav);
}

img {
    max-width: 40px;
}

.delete-container {
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 25%;
}

.delete-container h3 {
    color: var(--color-error-message);
}

.delete-container input {
    margin: 0.7rem 0.5rem;
    height: 45px;
    color: white;
    outline: none;
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    background: rgba(133, 120, 120, 0.156);
    font-family: var(--font-header-nav);
    box-sizing: border-box;
    padding-left: 1rem;
    font-size: 15px;
}

input::placeholder {
    color: rgb(163, 151, 142);
}

input:focus {
    background-color: rgba(114, 75, 54, 0.384);
}

.deleteButton {
    margin-top: 1rem;
    border-radius: 20px;
    outline: none;
    border: none;
    background: var(--color-primary-orange);
    width: 150px;
    height: 45px;
    color: white;
    font-size: 13px;
    font-family: var(--font-header-nav);
    cursor: pointer;
}

.deleteButton:hover {
    background-color: rgba(255, 116, 3, 0.391);
}

.message-container {
    flex-direction: column;
    align-items: center;
    color: var(--color-error-message);
}

.message-container h1 {
    font-size: 25px;
}

.error-container {
    position: absolute;
    bottom: 10%;
    color: var(--color-error-message);
}

.box-container {
    width: 400px;
    height: 500px;
    box-sizing: border-box;
    background-color: rgba(81, 74, 74, 0.158);
    backdrop-filter: blur(7px);
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: var(--color-primary-orange);
    position: relative;
}
</style>
