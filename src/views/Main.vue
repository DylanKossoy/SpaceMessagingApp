<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const firstName = localStorage.getItem('firstName')

const sidebarToggle = ref(false)

function toggleSidebar() {
    sidebarToggle.value = !sidebarToggle.value
}

async function signOut(event) {
    event.preventDefault()

    const token = localStorage.getItem('token')

    const url = 'https://hap-app-api.azurewebsites.net/user/logout'

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            localStorage.removeItem('token')
            localStorage.removeItem('firstName')

            router.push({
                name: 'home',
            })
        }
    } else {
        console.log('HTTP-Error: ' + response.status)
    }
}
</script>

<template>
    <Header>
        <nav>
            <a @click="signOut" class="flex">Sign Out</a>
        </nav>
        <nav class="servicesHeader flex">
            <div
                tabindex="0"
                class="hamburger-menu flex"
                @click="toggleSidebar"
                v-bind:class="{ active: sidebarToggle }"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </Header>

    <main>
        <div class="container flex">
            <div class="message-container flex">
                <h1>Welcome {{ `${firstName}` || 'Guest' }}!</h1>
            </div>
            <div class="sidebar flex" :class="{ active: sidebarToggle }">
                <ul>
                    <li><img src="../../public/code-simple.svg" alt="" /><a href="#">Code</a></li>
                    <li><img src="../../public/search.svg" alt="" /><a href="#">Search</a></li>
                    <li><img src="../../public/bell.svg" alt="" /><a href="#">Notifications</a></li>
                    <li>
                        <img src="../../public/trash.svg" alt="" /><RouterLink to="/delete"
                            >Delete Account</RouterLink
                        >
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    margin-top: 2rem;
    justify-content: center;
    align-items: start;
}

.sidebar {
    width: 250px;
    height: 0px;
    background-color: var(--color-form-background);
    border: 1px solid var(--color-primary-orange);
    backdrop-filter: blur(5px);
    border-radius: 30px;
    visibility: hidden;
    right: 0;
    margin-right: 1rem;
    position: absolute;
    transition:
        width 1s ease,
        height 1s ease,
        visibility 1s ease;
    justify-content: center;
    align-items: space-around;
}

.sidebar li {
    display: flex;
    justify-content: space-between;
    opacity: 0;
}

.sidebar.active li {
    opacity: 1;
    transition: opacity 4s ease;
}

ul li {
    list-style: none;
    margin-top: 1rem;
}

ul li a {
    color: var(--color-nav-text);
    font-family: var(--font-sidebar-anchors);
    font-size: 25px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    width: 80%;
    position: relative;
}

ul li a::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: var(--color-primary-orange);
    transition:
        width 1s ease,
        left 1s ease;
}

ul li a:hover::after {
    width: 100%;
    left: 0;
}

ul li img {
    max-height: 30px;
}

.sidebar.active {
    width: 250px;
    height: 240px;
    visibility: visible;
    right: 0;
}

ul {
    width: 100%;
    padding: 0 1.5rem 0 1.5rem;
}

nav {
    justify-content: flex-end;
    align-items: center;
    width: 150px;
}

.servicesHeader {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-right: 3rem;
}

.message-container {
    width: 400px;
    height: 500px;
    box-sizing: border-box;
    background-color: rgba(81, 74, 74, 0.158);
    backdrop-filter: blur(7px);
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-orange);
}

.hamburger-menu {
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
}

.hamburger-menu:hover {
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

.hamburger-menu span {
    transition:
        transform 1s ease,
        opacity 1s ease;
}

.hamburger-menu.active span:nth-child(1) {
    transform: rotate(45deg) translate(7px, 7px);
}
.hamburger-menu.active span:nth-child(2) {
    opacity: 0;
}
.hamburger-menu.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

span {
    width: 40px;
    height: 5px;
    background-color: var(--color-nav-text);
    border-radius: 10px;
}
</style>
