<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const router = useRouter()

const check = (event) => {
    event.preventDefault()

    const inputs = document.querySelectorAll('form input')
    let isFull = true

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.placeholder += ' **'
            input.placeholder.style = 'red'
            isFull = false
            return
        }
    })

    if (isFull) {
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
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    required
                />
                <br />
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    required
                />
                <br />
                <input type="email" id="email" name="email" placeholder="Enter Email" required />
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Create Username"
                    required
                />
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create Password"
                    required
                />
                <br />
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                />
                <br />
                <button type="submit" id="joinButton" @click="check">Join</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
}

form {
    width: 400px;
    height: 500px;
    background: rgba(137, 139, 144, 0.036);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    border: 2px solid var(--color-form-border);
}

input {
    width: 300px;
    height: 40px;
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 15px;
    padding-left: 0.5rem;
    font-family: var(--font-primary);
    background: rgba(107, 105, 105, 0.226);
    border: 1px solid var(--color-input-border);
    color: var(--color-primary);
}

input::placeholder {
    font-size: 15px;
    padding-left: 0.5rem;
    font-family: var(--font-primary);
}

button {
    width: 150px;
    height: 50px;
    background: var(--color-submit-button);
    border: none;
    outline: none;
    border-radius: 10px;
    font-size: 20px;
    margin: 1rem;
    color: var(--color-primary);
    cursor: pointer;
    transition: color 0.5s ease;
}

button:hover {
    color: white;
}
</style>
