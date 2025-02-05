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
                <h2>First: {{ firstName }}</h2>
                <h2>Last: {{ lastName }}</h2>
            </div>
            <div class="data">
                <h2>Username: {{ username }}</h2>
                <h2>Email: {{ email }}</h2>

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


.profile-data-container h2 {
    font-size: 30px;
    display: flex;
    border-radius: 20px;
    border: 1px solid var(--color-primary-orange);
    justify-content: center;
    font-family: var(--font-header-nav);
    color: white;


}

.firstLast {
    display: flex;
    justify-content: space-between;
}

.firstLast h2 {
    width: 200px;
}

.data {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.data h2 {
    width: 450px;
}

.profile-pic {
    max-height: 150px;
}
</style>
