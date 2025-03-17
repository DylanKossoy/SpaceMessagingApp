<script setup>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import emailValidator from 'email-validator'

const router = useRouter()
const userStore = useUserStore()

const validText = ref('***')
const errorText = ref('')

const email = ref('')
const password = ref('')

const passwordInputValue = ref(false)
const emailInputValue = ref(false)

//async function that fetches

const triggerShake = (field) => {
    field.value = true
    setTimeout(() => {
        field.value = false
    }, 300)
}

async function signIn(email, password) {
    const data = { email, password }

    const url = 'https://hap-app-api.azurewebsites.net/user/login'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        const data = await response.json()

        localStorage.setItem('token', data.token)
        localStorage.setItem('firstName', data.user.firstName)
        localStorage.setItem('username', data.user.userName)

        userStore.setUser(data)
        console.log(userStore)

        router.push({
            path: '/main',
        })
    } else if (response.status === 400) {
        triggerShake(emailInputValue)
        triggerShake(passwordInputValue)
        errorText.value = '* Invalid user *'
        validText.value = ''
    }
}

const check = async (event) => {
    event.preventDefault()

    // checks if inputs are empty

    let error = false

    if (!email.value.trim()) {
        triggerShake(emailInputValue)
        error = true
    }

    if (!password.value.trim()) {
        triggerShake(passwordInputValue)
        error = true
    }

    if (error) {
        errorText.value = '* Empty Fields *'
        validText.value = ''
        return
    }

    if (!emailValidator.validate(email.value)) {
        errorText.value = '* Invalid Email *'
        validText.value = ''
        triggerShake(emailInputValue)
        return
    }

    await signIn(email.value, password.value)
}
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/join">Join</RouterLink>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </Header>

    <main>
        <div class="container">
            <form>
                <div class="error-container">
                    <span class="validText" v-if="validText">{{ validText }}</span>
                    <span class="errorText" v-if="errorText">{{ errorText }}</span>
                </div>
                <div class="input-signin">
                    <input
                        v-model="email"
                        type="email"
                        :class="{ shake: emailInputValue }"
                        id="userEmail"
                        placeholder="Email"
                    />
                    <input
                        v-model="password"
                        type="password"
                        :class="{ shake: passwordInputValue }"
                        id="userPass"
                        placeholder="Password"
                    />
                </div>

                <div class="button-signin">
                    <button class="signin-button" @click="check">Sign in</button>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
.container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    width: 400px;
    height: 500px;
    box-sizing: border-box;
    background-color: rgba(81, 74, 74, 0.158);
    backdrop-filter: blur(7px);
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.input-signin {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 325px;
}

input::placeholder {
    color: rgb(163, 151, 142);
}

input:focus {
    background-color: rgba(114, 75, 54, 0.384);
}

input {
    margin: 1rem;
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

.signin-button {
    margin-top: 3rem;
    border-radius: 20px;
    outline: none;
    border: none;
    background: var(--color-primary-orange);
    width: 150px;
    height: 45px;
    color: white;
    font-size: 15px;
    font-family: var(--font-header-nav);
    cursor: pointer;
}

.signin-button:hover {
    background-color: rgba(255, 116, 3, 0.391);
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

.error-container {
    margin: 1rem;
}

.validText {
    color: var(--color-valid-message);
}

.errorText {
    color: var(--color-error-message);
}
</style>
