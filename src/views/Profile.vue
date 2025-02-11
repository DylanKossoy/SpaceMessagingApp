<script setup>
import { useRouter } from 'vue-router'
import { ref, useTemplateRef } from 'vue'
import Modal from '../components/Modal.vue'

const modal = useTemplateRef('name-modal')

const router = useRouter()

const firstName = localStorage.getItem('firstName')
const lastName = localStorage.getItem('lastName')
const username = localStorage.getItem('username')
const email = localStorage.getItem('email')

const newFirstName = ref()
const newLastName = ref()
const newEmail = ref()
const newUsername = ref()

async function editUser() {
    const data = {
        email: newEmail.value || email,
        userName: newUsername.value || username,
        firstName: newFirstName.value || firstName,
        lastName: newLastName.value || lastName,
    }

    console.log(data)

    const url = 'https://hap-app-api.azurewebsites.net/user'

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    }

    const response = await fetch(url, options)

    if (response.status === 200) {
        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('firstName', data.user.firstName)
            localStorage.setItem('lastName', data.user.lastName)
            localStorage.setItem('email', data.user.email)
            localStorage.setItem('username', data.user.userName)
        }

        console.log(data)

        router.push({
            path: '/main',
        })
    } else {
        console.log('error')
    }
}

function cancel(e) {
    modal.value.close(e)
}

function save(e) {
    editUser()
    modal.value.close(e)
}
</script>

<template>
    <div class="profile-container">
        <div class="back-button-container">
            <div tabindex="0" @click="router.back()">
                <img class="arrow" src="../../public//arrow-small-left.svg" alt="" />
            </div>

            <button class="edit" @click="modal.open">edit</button>
        </div>
        <div class="profile-image-container">
            <img src="../../public/circle-user-2.png" class="profile-pic" alt="" />
        </div>
        <div class="profile-data-container">
            <div class="firstLast">
                <div class="first">
                    <label for="firstName">First</label>
                    <span class="data-text">{{ firstName }}</span>
                </div>
                <div class="last">
                    <label for="firstName">Last</label>
                    <span class="data-text">{{ lastName }}</span>
                </div>
            </div>
            <div class="data">
                <div class="username">
                    <label for="username">Username</label>
                    <span class="data-text">{{ username }}</span>
                </div>
                <div class="email">
                    <label for="firstName">Email</label>
                    <span class="data-text">{{ email }}</span>
                </div>
            </div>
        </div>
        <Modal ref="name-modal">
            <template #header>
                <h1 class="primary-heading">Title</h1>
            </template>
            <template #main>
                <div class="firstLast">
                    <input
                        type="text"
                        v-model="newFirstName"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        v-model="newLastName"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <div class="user-info-container">
                    <input
                        type="email"
                        v-model="newEmail"
                        id="userEmail"
                        name="userEmail"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        v-model="newUsername"
                        id="username"
                        name="username"
                        placeholder="Username"
                    />
                </div>
            </template>
            <template #footer>
                <button @click.stop="cancel">Cancel</button>
                <button @click.stop="save">Save</button>
            </template>
        </Modal>
    </div>
</template>

<style scoped>
.profile-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    border-radius: 40px;
    backdrop-filter: blur(10px);
    box-shadow: 1rem 1rem 15rem 1rem black;
    cursor: url('../../public/custom-cursor.png'), pointer;
}

.profile-data-container {
    width: 70%;
    height: 50%;
    display: flex;
    flex-direction: column;
    width: 90%;
}

.profile-data-container span {
    height: 50px;
    color: white;
    outline: none;
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    background: rgba(133, 120, 120, 0.156);
    font-family: var(--font-header-nav);
    box-sizing: border-box;
    padding-left: 1rem;
    font-size: 20px;
}

.first,
.last,
.username,
.email {
    display: flex;
    flex-direction: column;
}

.firstLast {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

span {
    padding-top: 0.7rem;
}

.profile-data-container label {
    font-size: 15px;
    margin-bottom: 5px;
    font-family: var(--font-header-nav);
    color: var(--color-primary-orange);
    cursor: url('../../public/custom-cursor.png'), pointer;
}

.firstLast span {
    width: 200px;
}

span:hover,
.arrow:hover {
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

.username {
    margin-bottom: 2rem;
}
.profile-pic {
    max-height: 200px;
}

.back-button-container {
    display: flex;
    justify-content: space-around;
}

.back-button-container div {
    width: 250px;
    max-height: 50px;
}

.back-button-container div img {
    height: 100%;
    margin-left: 2rem;
}

/* editing button */

.edit {
    margin-inline: 2rem;
    border-radius: 20px;
    outline: none;
    border: none;
    background: var(--color-primary-orange);
    width: 150px;
    height: 45px;
    color: white;
    font-size: 20px;
    font-family: var(--font-header-nav);
}

.profile-image-container {
    display: flex;
}

.edit:hover {
    background-color: rgba(255, 116, 3, 0.391);
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}
</style>
