<script setup>
import { useRouter } from 'vue-router'
import { ref, useTemplateRef, onMounted } from 'vue'
import Modal from '../components/Modal.vue'

const modal = useTemplateRef('name-modal')

const router = useRouter()

const firstName = ref()
const lastName = ref()
const userName = ref()
const email = ref()

const newFirstName = ref()
const newLastName = ref()
const newEmail = ref()
const newUsername = ref()

async function getUserData() {
    const url = 'https://hap-app-api.azurewebsites.net/user'

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    const response = await fetch(url, options)

    if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        firstName.value = data.firstName
        lastName.value = data.lastName
        userName.value = data.userName
        email.value = data.email
    }
}

onMounted(() => {
    getUserData()
})

async function editUser() {
    const data = {
        email: newEmail.value || email.value,
        userName: newUsername.value || userName.value,
        firstName: newFirstName.value || firstName.value,
        lastName: newLastName.value || lastName.value,
    }

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
        localStorage.setItem('email', data.email)
        localStorage.setItem('username', data.userName)
        localStorage.setItem('firstName', data.firstName)
        localStorage.setItem('lastName', data.lastName)
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
            <div class="arrow-container" tabindex="0" @click="router.back()">
                <img class="arrow" src="../../public//arrow-small-left.svg" alt="" />
            </div>
            <div class="edit-button-container">
                <button class="edit" @click="modal.open">edit</button>
            </div>
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
                    <span class="data-text">{{ userName }}</span>
                </div>
                <div class="email">
                    <label for="firstName">Email</label>
                    <span class="data-text">{{ email }}</span>
                </div>
            </div>
        </div>
        <Modal ref="name-modal">
            <template #header>
                <h1 class="primary-heading">Edit Profile</h1>
            </template>
            <template #main>
                <div class="firstLastModal">
                    <input
                        type="text"
                        v-model="newFirstName"
                        id="firstName"
                        name="firstName"
                        placeholder="New First Name"
                    />
                    <input
                        type="text"
                        v-model="newLastName"
                        id="lastName"
                        name="lastName"
                        placeholder="New Last Name"
                    />
                </div>
                <div class="user-info-container">
                    <input
                        type="email"
                        v-model="newEmail"
                        id="userEmail"
                        name="userEmail"
                        placeholder="New Email"
                        required
                    />
                    <input
                        type="text"
                        v-model="newUsername"
                        id="username"
                        name="username"
                        placeholder="New Username"
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
/* main container with all the content */
.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.041);
    border-left: 1px solid rgba(255, 255, 255, 0.041);
    height: calc(100vh - 150px);
    box-sizing: border-box;
}

/* back button container holding back button and edit button */
.back-button-container {
    width: 100%;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* arrow icon in back button container */
.arrow-container {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 2rem;
}
.arrow {
    max-height: 70px;
}

/* edit button container */
.edit-button-container {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
}

/* button styling */
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

/* big profile logo in middle of screen */
.profile-image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.profile-image-container .profile-pic {
    height: 200px;
}

/* info layer 3rd container below profile pic */
.profile-data-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
}

/* Ensure flexible resizing for username and email */
.profile-data-container .data {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-right: 4rem;
    padding-left: 4rem;
}

/* Let username and email containers flexibly resize */
.profile-data-container .data .username,
.profile-data-container .data .email {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 745px; /* Ensures consistency on larger screens */
}

/* Let data-text flexibly resize */
.profile-data-container .data .data-text {
    margin-top: 0.3rem;
    margin-bottom: 1.5rem;
    flex: 1; /* Allows dynamic resizing */
    min-width: 350px; /* Prevents shrinking too much */
    max-width: 745px; /* Ensures a reasonable max width */
    min-height: 55px;
    color: white;
    outline: none;
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    background: rgba(133, 120, 120, 0.156);
    font-family: var(--font-header-nav);
    box-sizing: border-box;
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-size: 15px;
    position: relative;
}

/* Ensure first and last name stay aligned */
.profile-data-container .firstLast {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    padding: 4rem;
}

/* Consistent size for first and last name fields */
.profile-data-container .first,
.profile-data-container .last {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px; /* Ensures consistency */
}

/* data text like username first name last name and email */
.profile-data-container .firstLast .data-text {
    margin-top: 0.3rem;
    width: 100%;
    max-width: 350px;

    height: 55px;
    color: white;
    outline: none;
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    background: rgba(133, 120, 120, 0.156);
    font-family: var(--font-header-nav);
    box-sizing: border-box;
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-size: 15px;
    position: relative;
}

/* username and email in data turn to column */
.profile-data-container .data .username,
.profile-data-container .data .email {
    display: flex;
    flex-direction: column;
}

/* in the firstLast container and data both take up 50% */
.firstLast,
.data {
    width: 50%;
}

/* labels above spans */
label {
    margin-left: 1rem;
    color: white;
    font-family: var(--font-primary);
}

/* modal editing */
.modal .firstLastModal {
    display: flex;
    flex-direction: column;
}

.modal .user-info-container {
    display: flex;
    flex-direction: column;
}

.modal input {
    margin: 0.7rem 0.5rem;
    height: 45px;
    color: white;
    outline: none;
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    background: rgba(174, 40, 40, 0.274);
    font-family: var(--font-header-nav);
    box-sizing: border-box;
    padding-left: 1rem;
    font-size: 15px;
}

/* Modal button styling */
.modal button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    color: white;
    font-size: 15px;
    font-family: var(--font-header-nav);
    background: transparent;
    backdrop-filter: blur(5px);
    border: 2px solid var(--color-primary-orange);
    cursor: url('../../public/custom-cursor.png'), pointer;
}

.modal button:hover {
    background: rgba(174, 40, 40, 0.274);
}

/* primary heading in modal */
.primary-heading {
    color: white;
    font-size: 30px;
    font-family: var(--font-header-nav);
}
</style>
