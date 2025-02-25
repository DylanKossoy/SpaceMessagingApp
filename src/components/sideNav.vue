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
                            <img
                                src="../../public/house-chimney.png"
                                class="interface-icon"
                                alt=""
                            />
                            <h1 class="list-heading">Dashboard</h1>
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/main/profile">
                            <img
                                src="../../public/user.png"
                                class="interface-icon shift-left"
                                alt=""
                            />
                            <h1 class="list-heading">User Profile</h1>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/main/delete">
                            <img src="../../public/delete-user.png" class="interface-icon" alt="" />
                            <h1 class="list-heading">Delete User</h1>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <nav class="lower">
                <ul>
                    <li>
                        <img src="../../public/signOutIcon.png" class="interface-icon" alt="" />
                        <h1 class="list-heading" @click="signOut">Sign out</h1>
                    </li>
                    <li>
                        <img src="../../public/settings.png" class="interface-icon" alt="" />
                        <h1 class="list-heading">Settings</h1>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
/* full container */
.container {
    display: flex;
    position: relative;
    height: calc(100vh - 150px);
}

/* nav container filling the full container */
.nav-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    padding: 1rem;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    transform: translateX(-100%);
}

/* nav container is visible with the bottom left corner being at 0 */
.nav-container.active {
    transform: translateX(0);
}

/* styling the navigation text */
.nav-container ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style: none;
}

/* list heading for font and color */
.list-heading {
    color: white;
    font-size: 17px;
    font-weight: 1;
    font-family: var(--font-header-nav);
}

/* lower container of sidenav */
.nav-container .lower {
    margin-bottom: 1rem;
}

/* top container of sidenav */
.nav-container .higher {
}

/* need the li items to be more visible */
.nav-container li {
    width: 100%;
}

.nav-container a,
li {
    display: flex;
    text-decoration: none;
    width: 100%;
}

li:hover {
    cursor: url('../../public/custom-cursor-click.png'), pointer;
    background-color: rgba(35, 39, 38, 0.336);
}

.interface-icon {
    max-height: 30px;
    width: 30px;
    margin: 1rem 2rem;
}
</style>
