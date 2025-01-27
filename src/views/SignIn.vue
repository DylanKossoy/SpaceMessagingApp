<script setup>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import emailValidator from 'email-validator'

const router = useRouter()

const check = (event) => {
    event.preventDefault()

    const inputs = document.querySelectorAll('form input')
    let isFull = true

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isFull = false
            input.classList.add('empty')
            input.addEventListener('animationend', () => {
                input.classList.remove('empty')
            })
        }
    })

    // check valid email
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

    if (isFull && emailPass) {
        router.push({
            name: 'main',
        })
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
                <div class="input-signin">
                    <input type="email" id="userEmail" placeholder="Email" />
                    <input type="password" id="userPass" placeholder="Password" />
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
</style>
