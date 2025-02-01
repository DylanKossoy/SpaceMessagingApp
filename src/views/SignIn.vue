<script setup>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import emailValidator from 'email-validator'

const router = useRouter()

const validText = ref('***')
const errorText = ref('')

const email = ref('')
const password = ref('')
const emailInput = ref('')
const passwordInput = ref('')

//async function that fetches

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

        router.push({
            name: 'main',
        })
    } else if (response.status === 400) {
        validText.value = ''
        errorText.value = '* Invalid User *'

        const inputs = document.querySelectorAll('form input')

        inputs.forEach((input) => {
            input.classList.add('mismatch')
            input.addEventListener('animationend', () => {
                input.classList.remove('mismatch')
            })
        })
    }
}

const check = (event) => {
    event.preventDefault()

    const inputs = document.querySelectorAll('form input')
    let isFull = true

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.classList.add('empty')
            input.addEventListener('animationend', () => {
                input.classList.remove('empty')
            })
            isFull = false
        }
    })

    // check valid email

    const emailPass = emailValidator.validate(email.value)

    if (isFull && emailPass) {
        signIn(email.value, password.value)
    } else {
        validText.value = ''
        if (!isFull) {
            errorText.value = '* Empty Fields *'
        } else if (!emailPass) {
            errorText.value = '* Not Valid Email *'

            emailInput.value.classList.add('mismatch')
            emailInput.value.addEventListener('animationend', () => {
                emailInput.value.classList.remove('mismatch')
            })
        }
    }
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
                        ref="emailInput"
                        v-model="email"
                        type="email"
                        class="userEmail"
                        id="userEmail"
                        placeholder="Email"
                    />
                    <input
                        ref="passwordInput"
                        v-model="password"
                        type="password"
                        class="userPass"
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
