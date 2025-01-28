<script setup>
import { RouterLink, useRouter } from 'vue-router'
import emailValidator from 'email-validator'
import Header from '../components/Header.vue'

const router = useRouter()

async function createUserJoin(firstName, lastName, username, password, email) {
    // user information

    const data = {
        email: email,
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
    }

    //url
    const url = 'https://hap-app-api.azurewebsites.net/user'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    let response = await fetch(url, options)

    if (response.status === 201) {
        const data = await response.json()

        localStorage.setItem('token', data.token)
        localStorage.setItem('firstName', data.user.firstName)

        router.push({
            name: 'main',
        })
    } else if (response.status === 400) {
        console.log('invalid email or password')
    }
}

const check = (event) => {
    event.preventDefault()

    const firstName = document.querySelector('#firstName')
    const lastName = document.querySelector('#lastName')
    const email = document.querySelector('#userEmail')
    const username = document.querySelector('#username')
    const password = document.querySelector('#userPass')
    const confirmPassword = document.querySelector('#confirmPass')

    const validText = document.querySelector('#validMessage')
    const errorText = document.querySelector('#errorMessage')

    const inputs = document.querySelectorAll('form input')
    let isFull = true

    // check if inputs are empty
    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.classList.add('empty')
            input.addEventListener('animationend', () => {
                input.classList.remove('empty')
            })

            isFull = false
        }
    })

    //check if valid email
    const emailPass = emailValidator.validate(email.value)

    // checks if passcodes are both the same and at least 8 characters

    const passMatch = password.value === confirmPassword.value
    const passLength = password.value.length >= 8

    if (isFull && passMatch && emailPass && passLength) {
        createUserJoin(firstName.value, lastName.value, username.value, password.value, email.value)
    } else {
        if (!isFull) {
            errorText.innerHTML = '* Empty Fields *'
            validText.style.display = 'none'
            errorText.style.display = 'flex'
        } else if (!emailPass) {
            errorText.innerHTML = '* Not Valid Email *'
            validText.style.display = 'none'
            errorText.style.display = 'flex'
            email.classList.add('mismatch')
            email.addEventListener('animationend', () => {
                email.classList.remove('mismatch')
            })
        } else if (!passLength) {
            errorText.innerHTML = '* Password must be 8 characters *'
            validText.style.display = 'none'
            errorText.style.display = 'flex'
            password.classList.add('mismatch')
            confirmPassword.classList.add('mismatch')
            password.addEventListener('animationend', () => {
                password.classList.remove('mismatch')
            })

            confirmPassword.addEventListener('animationend', () => {
                confirmPassword.classList.remove('mismatch')
            })
        } else if (!passMatch) {
            errorText.innerHTML = '* Password does not match *'
            validText.style.display = 'none'
            errorText.style.display = 'flex'
            password.classList.add('mismatch')
            confirmPassword.classList.add('mismatch')
            password.addEventListener('animationend', () => {
                password.classList.remove('mismatch')
            })

            confirmPassword.addEventListener('animationend', () => {
                confirmPassword.classList.remove('mismatch')
            })
        } else {
            validText.style.display = 'flex'
            localStorage.setItem('userName', username.value)
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
                    <span class="validMessage" id="validMessage">***</span>
                    <span class="errorMessage" id="errorMessage"></span>
                </div>
                <div class="firstLast">
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" />
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" />
                </div>
                <div class="user-info-container">
                    <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        placeholder="Email"
                        required
                    />
                    <input type="text" id="username" name="username" placeholder="Username" />
                    <input type="password" id="userPass" name="userPass" placeholder="Password" />
                    <input
                        type="password"
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
    display: none;
    color: var(--color-error-message);
}

.validMessage {
    display: flex;
    color: var(--color-valid-message);
}
</style>
