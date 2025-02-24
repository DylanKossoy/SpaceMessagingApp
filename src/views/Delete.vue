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
            path: '/',
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
    <div class="delete-container">
        <div class="back-button-container">
            <div tabindex="0" @click="router.back()" class="arrow-container">
                <img class="arrow" src="../../public/arrow-small-left.svg" alt="" />
            </div>
        </div>
        <div class="message-container">
            <h3>** You Sure About This **</h3>
            <h4>This is Permanent</h4>
        </div>
        <div class="input-container">
            <p>Enter "DELETE" to continue</p>
            <input
                :class="{ shake: deleteInputValue }"
                type="text"
                placeholder="DELETE"
                v-model="deleteInput"
            />
            <button @click="check">Delete</button>
        </div>

        <div class="error-container">
            <span>{{ errorText }}</span>
        </div>
    </div>
</template>

<style scoped>
/* main container of delete account */
.delete-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.041);
    border-left: 1px solid rgba(255, 255, 255, 0.041);
    height: calc(100vh - 150px);
}

.message-container {
    margin-top: 2rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    color: var(--color-error-message);
    align-items: center;
}

.message-container h3 {
    font-size: 30px;
}

.message-container h4 {
    font-size: 20px;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-container p {
    font-size: 20px;
    color: var(--color-error-message);
}

.input-container input {
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

.input-container button {
    margin-top: 1rem;
    border-radius: 20px;
    outline: none;
    border: none;
    background: var(--color-primary-orange);
    width: 150px;
    height: 45px;
    color: white;
    font-size: 15px;
    font-family: var(--font-header-nav);
}

.input-container button:hover {
    background-color: rgba(255, 116, 3, 0.391);
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

.back-button-container {
    width: 100%;
    margin-inline: 2rem;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-start;
}

.back-button-container div {
    max-height: 50px;
}

.back-button-container div img {
    height: 100%;
    margin-left: 2rem;
}

.error-container {
    margin-top: 2rem;
    font-size: 20px;
    color: var(--color-error-message);
}

/* arrow size */

.arrow-container {
    height: 100px;
    width: 100px;
}

.arrow {
    width: 70px;
    height: 70px;
}
</style>
