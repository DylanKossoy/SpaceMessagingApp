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
            <div tabindex="0" @click="router.back()">
                <img class="arrow" src="../../public//arrow-small-left.svg" alt="" />
            </div>
            <div class="edit-info">
                <button class="edit">edit</button>
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
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.back-button-container div {
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


.edit:hover {
    background-color: rgba(255, 116, 3, 0.391);
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}
</style>
