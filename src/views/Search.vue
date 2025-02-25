<script setup>
import { ref } from 'vue'




const allUsers = ref([])






// add event listener to search bar then emit a function that shows all the possible users

const searchBarInput = (event) => {
    console.log(event.target.value)
}

// function to get all users and put them into a array
async function grabAllUsers() {
    const url = 'https://hap-app-api.azurewebsites.net/users'

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        allUsers.value = await response.json()
        console.log(allUsers.value)

    } else {
        console.log(response.status)
    }
}







grabAllUsers();
</script>

<template>
    <div class="search-container">
        <div class="search-bar-container">
            <img src="../../public/search.png" alt="" class="interface-icon" />
            <input
                type="search"
                class="search-box"
                placeholder="Search User..."
                @input="searchBarInput"
            />
        </div>
        <div class="data-container">
            <div class="data-cell" v-for="user in allUsers " :key="user.id">
                <div class="data-cell-user" >
                    <h5 class="user-info"><span class="label-user-info">First Name: -</span> {{ user.firstName }}</h5>
                    <h5 class="user-info"><span class="label-user-info">Last Name: -</span> {{ user.lastName }}</h5>
                    <h5 class="user-info"><span class="label-user-info">Userame: -</span> {{ user.userName }}</h5>
                    <h5 class="user-info"><span class="label-user-info">User Id: -</span> {{ user['_id'] }}</h5>
                    <div class="data-cell-footer">

                        <RouterLink to="/main/privateMessage">
                            <img src="../../public/paper-plane.png" alt="" class="send-message-icon" />

                        </RouterLink>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* main search container */
.search-container {
    backdrop-filter: blur(10px);
    height: calc(100vh - 150px);
    padding: 2rem;
    box-sizing: border-box;
}

/* search box container */
.search-bar-container {
    background: none;

    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.041);
}

/* search bar in search container */
.search-box {
    width: 100%;
    height: 40px;
    border: 2px solid var(--color-primary-orange);
    border-radius: 10px;
    background: rgba(133, 120, 120, 0.156);
    font-size: 15px;
    color: white;
    padding: 1rem;
    padding-left: 3rem;
    font-family: var(--font-header-nav);
}

/* interface icon */
.interface-icon {
    max-height: 20px;
    position: absolute;
    left: 3%;
}

/* data cell container */
.data-container {
    height: 700px;
    max-height: 700px;
    box-sizing: border-box;
    overflow: auto;
    scroll-behavior: smooth;
    border-bottom: 1px solid rgba(255, 255, 255, 0.041);
}

.data-container .data-cell {
    border: 2px solid var(--color-primary-orange);
    border-radius: 10px;
    height: 130px;
    display: flex;
    padding-top: .5rem;
    align-items: flex-end;
    /* box-sizing: border-box; */
    margin-bottom: .5rem;
}

.data-cell-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.data-cell-user {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;

}

.user-info {
    font-size: 10px;
    color: rgba(0, 255, 0, 0.692);
    font-family: var(--font-header-nav);

    margin: .25rem 0 0 1rem;
    box-sizing: border-box;
}

/* label user info like first name: last name: username: etc */
.label-user-info {
    font-size: 12px;
    color: white;
}

/* paper plane */
.send-message-icon {
    max-height: 25px;
    max-width: 25px;
    margin: 1rem;
}






/* media query for mac or 1440 */



</style>
