<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import emailValidator from 'email-validator'
import Header from '../components/Header.vue'

const router = useRouter()

// Reactive state variables for toggling messages
const errorText = ref('')
const validText = ref('***')

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const email = ref('')
const confirmPassword = ref('')

//these will be the toggle for the shake empty class
const firstNameInput = ref(false)
const lastNameInput = ref(false)
const usernameInput = ref(false)
const passwordInput = ref(false)
const emailInput = ref(false)
const confirmInput = ref(false)

const triggerShake = (field) => {
    field.value = true
    setTimeout(() => {
        field.value = false
    }, 300)
}

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
        localStorage.setItem('lastName', data.user.lastName)
        localStorage.setItem('email', data.user.email)
        localStorage.setItem('username', data.user.userName)

        console.log(data)

        router.push({
            name: 'main',
        })
    } else if (response.status === 400) {
        triggerShake(emailInput)
        triggerShake(usernameInput)
        errorText.value = ' * Invalid User -- Change Email or Username *'
        validText.value = ''
    }
}

const check = async (event) => {
    event.preventDefault()

    // Check if inputs are null
    let error = false

    if (!firstName.value.trim()) {
        triggerShake(firstNameInput)
        error = true
    }

    if (!lastName.value.trim()) {
        triggerShake(lastNameInput)
        error = true
    }
    if (!email.value.trim()) {
        triggerShake(emailInput)
        error = true
    }
    if (!username.value.trim()) {
        triggerShake(usernameInput)
        error = true
    }
    if (!password.value.trim()) {
        triggerShake(passwordInput)
        error = true
    }
    if (!confirmPassword.value.trim()) {
        triggerShake(confirmInput)
        error = true
    }

    if (error) {
        errorText.value = '* Empty Fields *'
        validText.value = ''
        return
    }

    // Validate email
    if (!emailValidator.validate(email.value)) {
        triggerShake(emailInput)
        errorText.value = '* Invalid Email *'
        validText.value = ''
        return
    }

    // Validate passwords
    if (password.value.length < 8) {
        triggerShake(passwordInput)
        errorText.value = '* Password must be at least 8 characters *'
        validText.value = ''
        return
    }

    if (password.value !== confirmPassword.value) {
        triggerShake(passwordInput)
        triggerShake(confirmInput)
        errorText.value = '* Passwords do not match *'
        validText.value = ''
        return
    }

    await createUserJoin(
        firstName.value,
        lastName.value,
        username.value,
        password.value,
        email.value,
    )
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
                    <span v-if="validText" class="validText">{{ validText }}</span>
                    <span v-if="errorText" class="errorText">{{ errorText }}</span>
                </div>
                <div class="firstLast">
                    <input
                        type="text"
                        v-model="firstName"
                        id="firstName"
                        name="firstName"
                        :class="{ shake: firstNameInput }"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        v-model="lastName"
                        id="lastName"
                        name="lastName"
                        :class="{ shake: lastNameInput }"
                        placeholder="Last Name"
                    />
                </div>
                <div class="user-info-container">
                    <input
                        :class="{ shake: emailInput }"
                        type="email"
                        v-model="email"
                        id="userEmail"
                        name="userEmail"
                        placeholder="Email"
                        required
                    />
                    <input
                        :class="{ shake: usernameInput }"
                        type="text"
                        v-model="username"
                        id="username"
                        name="username"
                        placeholder="Username"
                    />
                    <input
                        :class="{ shake: passwordInput }"
                        type="password"
                        v-model="password"
                        id="userPass"
                        name="userPass"
                        placeholder="Password"
                    />
                    <input
                        :class="{ shake: confirmInput }"
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
    margin-top: 2rem;
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
    cursor: url('../../public/custom-cursor-click.png'), pointer;
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

.errorText {
    color: var(--color-error-message);
}

.validText {
    color: var(--color-valid-message);
}
</style>
