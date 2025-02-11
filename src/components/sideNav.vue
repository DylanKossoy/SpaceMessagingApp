<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

// Sidebar toggle state
const sidebarValue = ref(false)

// Function to toggle sidebar visibility
function toggleSidebar() {
    sidebarValue.value = !sidebarValue.value
}

// Sign out function
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
            // Remove user data from local storage
            localStorage.removeItem('token')
            localStorage.removeItem('firstName')

            // Redirect to home page
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
        <!-- Sidebar Navigation -->
        <div class="nav-container" :class="{ active: sidebarValue }">
            <nav class="higher">
                <ul>
                    <!-- Search -->
                    <li>
                        <img src="../../public/search.svg" class="interface-icon" alt="" />
                        <h1>Search</h1>
                    </li>

                    <!-- Profile Link -->
                    <li>
                        <RouterLink to="/main/profile">
                            <img src="../../public/user.svg" class="interface-icon shift-left" alt="" />
                            <h1>Profile</h1>
                        </RouterLink>
                    </li>

                    <!-- Delete Account Link -->
                    <li>
                        <RouterLink to="/main/delete">
                            <img src="../../public/delete-user.svg" class="interface-icon" alt="" />
                            <h1>Delete Account</h1>
                        </RouterLink>
                    </li>
                </ul>
            </nav>

            <!-- Lower Navigation (Sign Out & Settings) -->
            <nav class="lower">
                <ul>
                    <!-- Sign Out -->
                    <li>
                        <img src="../../public/signOut.png" class="interface-icon" alt="" />
                        <h1 @click="signOut">Sign out</h1>
                    </li>

                    <!-- Settings -->
                    <li>
                        <img src="../../public/settings.svg" class="interface-icon" alt="" />
                        <h1>Settings</h1>
                    </li>
                </ul>
            </nav>
            <button class="toggle-nav-container" @click="toggleSidebar"></button>
        </div>
    </div>
</template>

<style scoped>
/* Container styling */
.container {

    background: none;
}

/* Sidebar Navigation */
.nav-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background: rgba(94, 190, 231, 0.331);
    width: 250px;
    height: 100%;
    backdrop-filter: blur(10px);
    box-shadow: 0.5rem 0.5rem 2rem 1rem rgba(26, 17, 12, 0.57);
    transform: translateX(-250px);
    transition: transform 2s ease;
    position: relative;
}

/* sidebar nav when active */
.active {
    transform: translateX(0);
}




/* List styles */
.nav-container ul {
    display: flex;
    flex-direction: column;
    list-style: none;
}

/* Navigation links */
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

/* Remove padding for cleaner layout */
.nav-container .lower ul,
.nav-container .higher ul {
    padding: 0;
}

/* List item styles */
li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    list-style: none;
    font-family: var(--font-header-nav);
    font-size: 10px;
}

/* Hover effect */
li:hover {
    cursor: url('../../public/custom-cursor-click.png'), pointer;
    background-color: grey;
}

/* Adjust icon spacing */
.nav-container .higher li .shift-left {
    margin-left: 1.8rem;
    margin-right: 2.2rem;
}

/* Icon styling */
.interface-icon {
    max-height: 25px;
    padding: 0;
    margin: 1rem 2rem 1rem 2rem;
}


/* button to toggle nav bar */

.toggle-nav-container {
    width: 20px;
    height: 150px;
    transform: translateX(250px);
    background: rgba(94, 231, 183, 0.467);
    border: none;
    position: absolute;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    top: 30%;

}


.toggle-nav-container:hover {
    background-color: rgba(94, 231, 183, 0.218);
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}






</style>
