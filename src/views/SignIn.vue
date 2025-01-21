<script setup>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const checkFields = (event) => {
    event.preventDefault()

    const inputs = document.querySelectorAll('form input')
    let isFull = true

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.placeholder += '**'
            isFull = false
            return
        }
    })

    if (isFull) {
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
                <input type="text" id="username" name="username" placeholder="Username" required />
                <br />

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <br />
                <button type="submit" @click="checkFields">Sign In</button>
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
    justify-content: end;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    border: 2px solid var(--color-form-border);
}

input {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    outline: none;
    border: none;
    margin: 1rem;
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
    color: var(--color-primary);
    margin: 3rem;
    margin-top: 7rem;
    cursor: pointer;
    transition: color 0.5s ease;
}

button:hover {
    color: white;
}
</style>
