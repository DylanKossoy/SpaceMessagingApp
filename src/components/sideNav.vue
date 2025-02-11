<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

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
        <div class="nav-container">
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
    </div>
</template>

<style scoped>
.container {
    background: none;
}

.nav-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background: rgba(255, 255, 255, 0.495);
    width: 250px;
    height: 100%;
    backdrop-filter: blur(10px);
}

.nav-container ul {
    display: flex;
    flex-direction: column;
    list-style: none;
}

.nav-container a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    list-style: none;
    font-family: var(--font-header-nav);
    font-size: 10px;
    text-decoration: none;
    color: black;
}

.nav-container .lower ul,
.nav-container .higher ul {
    padding: 0;
}

li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    list-style: none;
    font-family: var(--font-header-nav);
    font-size: 10px;
}

li:hover {
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

.nav-container .higher li .shift-left {
    margin-left: 1.8rem;
    margin-right: 2.2rem;
}

.interface-icon {
    max-height: 25px;
    padding: 0;
    margin: 1rem 2rem 1rem 2rem;
}
</style>
