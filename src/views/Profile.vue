<script setup>

import { useRouter } from 'vue-router'


const router = useRouter()



const firstName = localStorage.getItem('firstName')
const lastName = localStorage.getItem('lastName')
const username = localStorage.getItem('username')
const email = localStorage.getItem('email')









</script>

<template>
    <div class="profile-container">
        <div class="back-button-container">
            <button @click="router.back()">back</button>
        </div>
        <div class="profile-image-container">
            <img src="../../public/circle-user.svg" class="profile-pic" alt="" />
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
}


.profile-data-container {
    width: 70%;
    height: 50%;
}


.profile-data-container {
    display: flex;
    flex-direction: column;
}


.profile-data-container span {
    font-size: 35px;
    max-height: 60px;
    color: white;
    border: 2px solid var(--color-primary-orange);
    padding: 1rem;
    box-sizing: border-box;
}


.first, .last, .username, .email {
    display: flex;
    flex-direction: column;
}

.firstLast {
    display: flex;
    justify-content: space-between;
    margin: 2rem;
    gap: 2rem;

}

.firstLast span {
    width: 200px;
}




.profile-pic {
    max-height: 150px;
}
</style>
