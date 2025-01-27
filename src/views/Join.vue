<script setup>
import { RouterLink, useRouter } from 'vue-router'
import emailValidator from 'email-validator'
import Header from '../components/Header.vue'

const router = useRouter()

const check = (event) => {
    event.preventDefault()

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

    // check email with npm email-validator
    const userEmail = document.querySelector('#userEmail').value
    let emailPass = false

    if (emailValidator.validate(userEmail)) {
        emailPass = true
    } else {
        document.querySelector('#userEmail').classList.add('mismatch')
        document.querySelector('#userEmail').addEventListener('animationend', () => {
            document.querySelector('#userEmail').classList.remove('mismatch')
        })
        emailPass = false
    }

    const userPass = document.querySelector('#userPass')
    const confirmPass = document.querySelector('#confirmPass')
    let passMatch = false

    // checks if passcodes are both the same
    if (!userPass) {
        passMatch = false
    } else {
        if (userPass.value.trim() === confirmPass.value.trim()) {
            passMatch = true
        } else {
            userPass.classList.add('mismatch')
            confirmPass.classList.add('mismatch')

            userPass.addEventListener('animationend', () => {
                userPass.classList.remove('mismatch')
            })

            confirmPass.addEventListener('animationend', () => {
                confirmPass.classList.remove('mismatch')
            })
            passMatch = false
        }
    }

    if (isFull && passMatch && emailPass) {
        const firstName = document.querySelector('#firstName').value
        localStorage.setItem('firstName', firstName)
        router.push({
            name: 'main',
        })
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
                    <button id="submit" @click="check" type="submit">Submit</button>
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
</style>
