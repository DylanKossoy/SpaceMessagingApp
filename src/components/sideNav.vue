<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

let toggleBar = ref(true)

// function to toggle sidebar in and out with the button
function toggleSidebar() {
    toggleBar.value = !toggleBar.value
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
            console.log('worked')
        }
    } else {
        console.log('HTTP-Error: ' + response.status)
    }
}
</script>

<template>
    <div class="container">
        <div class="nav-container" :class="{ active: toggleBar }">
            <nav class="higher">
                <ul>
                    <li>
                        <RouterLink to="/main">
                            <img src="../../public/home.svg" class="interface-icon" alt="" />
                            <h1>Home</h1>
                        </RouterLink>
                    </li>
                    <li>
                        <img src="../../public/search.svg" class="interface-icon" alt="" />
                        <h1>Search</h1>
                    </li>
                    <li>
                        <RouterLink to="/main/profile">
                            <img
                                src="../../public/user.svg"
                                class="interface-icon shift-left"
                                alt=""
                            />
                            <h1>Profile</h1>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/main/delete">
                            <img src="../../public/delete-user.svg" class="interface-icon" alt="" />
                            <h1>Delete Account</h1>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <nav class="lower">
                <ul>
                    <li>
                        <img src="../../public/signOut.png" class="interface-icon" alt="" />
                        <h1 @click="signOut">Sign out</h1>
                    </li>
                    <li>
                        <img src="../../public/settings.svg" class="interface-icon" alt="" />
                        <h1>Settings</h1>
                    </li>
                </ul>
            </nav>
        </div>
        <button
            class="toggle-sidebar-button"
            @click="toggleSidebar()"
            :class="{ active: toggleBar }"
        ></button>
    </div>
</template>

<style scoped>
.container {
    background: none;
    display: flex;
    flex-direction: row;
    position: relative;
}

.nav-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    width: 300px;
    height: 100%;
    background: rgb(255, 255, 255);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    transform: translateX(-100%);
}

.nav-container.active {
    transform: translateX(0);
}

.nav-container ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
}

.nav-container a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-family: var(--font-header-nav);
    font-size: 10px;
    text-decoration: none;
    color: black;
}

li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-family: var(--font-header-nav);
    font-size: 10px;
}

li:hover {
    cursor: url('../../public/custom-cursor-click.png'), pointer;
    background-color: rgba(48, 52, 51, 0.159);
}

.nav-container .higher li .shift-left {
    margin-left: 1.8rem;
    margin-right: 2.2rem;
}

.interface-icon {
    max-height: 25px;
    margin: 1rem 2rem;
}

/* Sidebar Toggle Button */
.toggle-sidebar-button {
    width: 20px;
    height: 300px;
    position: absolute;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.505);
}

.toggle-sidebar-button.active {
    background-color: rgba(0, 0, 0, 0.505);
}

.toggle-sidebar-button:hover {
    background-color: rgba(0, 0, 0, 0.279);
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

@media (max-width: 1500px) {
    .nav-container {
        width: 250px;
    }
}
@media (max-width: 1350px) {
    .nav-container {
        width: 200px;
    }
}
</style>
