<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import emailValidator from 'email-validator'
import Header from '../components/Header.vue'

const router = useRouter()

// Reactive state variables for toggling messages
const errorMessage = ref('')
const validMessage = ref('***')

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const email = ref('')
const confirmPassword = ref('')

const emailInput = ref('')
const passwordInput = ref('')
const confirmPasswordInput = ref('')

const inputs = ref([])

async function createUserJoin(firstName, lastName, username, password, email) {
    const data = {
        email,
        userName: username,
        password,
        firstName,
        lastName,
    }

    const url = 'https://hap-app-api.azurewebsites.net/user'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    const response = await fetch(url, options)

    if (response.status === 201) {
        const data = await response.json()

        localStorage.setItem('token', data.token)
        localStorage.setItem('firstName', data.user.firstName)

        router.push({
            name: 'main',
        })
    } else if (response.status === 400) {
        errorMessage.value = 'Invalid email or password'
    }
}

const check = (event) => {
    event.preventDefault()

    const inputs = document.querySelectorAll('form input')
    let isFull = true

    // Check if inputs are empty
    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.classList.add('empty')
            input.addEventListener('animationend', () => {
                input.classList.remove('empty')
            })
            isFull = false
        }
    })

    // Validate email
    const emailPass = emailValidator.validate(email.value)

    // Validate passwords
    const passMatch = password.value === confirmPassword.value
    const passLength = password.value.length >= 8

    if (isFull && emailPass && passMatch && passLength) {
        createUserJoin(firstName.value, lastName.value, username.value, password.value, email.value)
    } else {
        validMessage.value = ''
        if (!isFull) {
            errorMessage.value = '* Empty Fields *'
        } else if (!emailPass) {
            errorMessage.value = '* Not Valid Email *'
            emailInput.value.classList.add('mismatch')
            emailInput.value.addEventListener('animationend', () => {
                emailInput.value.classList.remove('mismatch')
            })
        } else if (!passLength) {
            errorMessage.value = '* Password must be at least 8 characters *'
            passwordInput.value.classList.add('mismatch')
            confirmPasswordInput.value.classList.add('mismatch')
            passwordInput.value.addEventListener('animationend', () => {
                passwordInput.value.classList.remove('mismatch')
            })
            confirmPasswordInput.value.addEventListener('animationend', () => {
                confirmPasswordInput.value.classList.remove('mismatch')
            })
        } else if (!passMatch) {
            errorMessage.value = '* Passwords do not match *'
            passwordInput.value.classList.add('mismatch')
            confirmPasswordInput.value.classList.add('mismatch')
            passwordInput.value.addEventListener('animationend', () => {
                passwordInput.value.classList.remove('mismatch')
            })
            confirmPasswordInput.value.addEventListener('animationend', () => {
                confirmPasswordInput.value.classList.remove('mismatch')
            })
        }
    }
}
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/signin">Sign in</RouterLink>
        </nav>
    </Header>

    <main>
        <div class="container">
            <form>
                <div class="error-container">
                    <span v-if="validMessage" class="validMessage">{{ validMessage }}</span>
                    <span v-if="errorMessage" class="errorMessage">{{ errorMessage }}</span>
                </div>
                <div class="firstLast">
                    <input
                        type="text"
                        v-model="firstName"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        v-model="lastName"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <div class="user-info-container">
                    <input
                        ref="emailInput"
                        type="email"
                        v-model="email"
                        id="userEmail"
                        name="userEmail"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        v-model="username"
                        id="username"
                        name="username"
                        placeholder="Username"
                    />
                    <input
                        ref="passwordInput"
                        type="password"
                        v-model="password"
                        id="userPass"
                        name="userPass"
                        placeholder="Password"
                    />
                    <input
                        ref="confirmPasswordInput"
                        type="password"
                        v-model="confirmPassword"
                        id="confirmPass"
                        name="confirmPass"
                        placeholder="Confirm Password"
                    />
                </div>

                <div class="button-container">
                    <button id="submit" @click="check">Join</button>
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
}

.firstLast,
.user-info-container {
    display: flex;
}

.user-info-container {
    flex-direction: column;
}

.firstLast input {
    width: 153px;
}

.user-info-container input {
    width: 325px;
}

input {
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

#submit {
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
    cursor: pointer;
}

#submit:hover {
    background-color: rgba(255, 116, 3, 0.391);
}

.error-container {
    width: 300px;
    height: 40px;
    padding: 0.0125rem;
    visibility: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
}

.errorMessage {
    color: var(--color-error-message);
}

.validMessage {
    color: var(--color-valid-message);
}
</style>
