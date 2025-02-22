<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'

const cells = ref([])

const cellContainer = useTemplateRef('cellContainer')

// this variable will change so it keeps grabbing older and older messages its going to start where it left off when it is adding
const oldestTimeStamp = ref(null)

// this will load older
async function loadOlderCells() {
    // check oldestTimeStamp

    const lastCell = cells.value[cells.value.length - 1]
    oldestTimeStamp.value = lastCell.updatedAt

    // url with a querie string of limit 20
    const url = `https://hap-app-api.azurewebsites.net/messages?limit=20&before=${oldestTimeStamp.value}`

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    const response = await fetch(url, options)

    if (response.status === 200) {
        const moreOlderCells = await response.json()

        cells.value = [...cells.value, ...moreOlderCells]
        console.log(cells.value)
    } else if (response.status === 401) {
        console.log('Unauthorized 401')
    } else if (response.status === 500) {
        console.log('inter sever error 500')
    } else {
        console.log(response.status)
    }
}
async function grabCells() {
    // url with a querie string of limit 20
    const url =
        'https://hap-app-api.azurewebsites.net/messages?limit=20&after=2025-02-13T06:00:00.321Z'

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    const response = await fetch(url, options)

    if (response.status === 200) {
        cells.value = await response.json()
        console.log(cells.value)
    } else if (response.status === 401) {
        console.log('Unauthorized 401')
    } else if (response.status === 500) {
        console.log('inter sever error 500')
    } else {
        console.log(response.status)
    }
}

// when component was added then it will fetch 20 messages initially


onMounted(() => {
    grabCells()
})
</script>

<template>
    <div class="container">
        <ul class="cell-container" ref="cellContainer">
            <div class="header-cell-container">
                <img
                    src="../../public/refresh.png"
                    @click="grabCells()"
                    class="interface-icon"
                    alt=""
                />
                <h1>User Feed</h1>
            </div>
            <li v-for="cell in cells" :key="cell.id" class="cell">
                <div class="top-inner-cell">
                    <p class="name-property">{{ cell.senderName }}</p>
                    <div class="date-container">
                        <p>{{ new Date(cell.updatedAt).toLocaleDateString() }}</p>
                        <p>{{ new Date(cell.updatedAt).toLocaleTimeString() }}</p>
                    </div>
                </div>
                <div class="bottom-inner-cell">
                    <p class="message-property">{{ cell.text }}</p>
                </div>
            </li>

            <button class="refresh-button" @click="loadOlderCells()">Load More</button>
        </ul>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    backdrop-filter: blur(10px);
    box-shadow: 1rem 1rem 15rem 1rem black;
}

/* going to hold all the message cells with users info */

.cell-container {
    width: 95%;
    max-height: 700px;
    height: 95%;
    border-radius: 20px;
    background-color: rgba(69, 69, 77, 0.25);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    list-style: none;
    gap: 1rem;

    padding: 0;

    overflow-y: auto;
    overflow-x: hidden;
}

/* message cell with users info and message */
.cell {
    width: 95%;
    height: 150px;
    flex-shrink: 0;

    border-radius: 10px;

    outline: none;
    border: 2px solid var(--color-primary-orange);

    background: rgba(133, 120, 120, 0.156);
    font-family: var(--font-header-nav);
    padding-inline: 1rem;
    box-sizing: border-box;
}

/* inner cell */
.top-inner-cell {
    display: flex;
    justify-content: space-between;
    color: var(--color-primary-orange);
}

/* date container inside inner cell */
.top-inner-cell .date-container {
    width: 170px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-primary-bold-orange);
}

/* bottom cell */
.bottom-inner-cell {
    font-size: 20px;
    color: white;
    overflow-y: auto;
    max-height: 90px;
}

/* message title */
h1 {
    font-family: var(--font-header-nav);
    color: var(--color-primary-orange);
}

/* refresh button */

.refresh-button {
    margin-bottom: 1rem;
    width: 100px;
    height: 60px;
    border: none;
    font-size: 13px;
    font-family: var(--font-header-nav);
    color: white;
    background-color: var(--color-primary-orange);
    border-radius: 10px;
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

/* header cell container with the refresh button */
.header-cell-container {
    display: flex;
    align-items: center;
    width: 90%;
    justify-content: space-between;
}

/* refresh icon */
.interface-icon {
    max-height: 25px;
    justify-self: flex-start;
}

.interface-icon:hover {
    transform: rotate(360deg);
    transition: transform 1s ease;
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}
</style>
