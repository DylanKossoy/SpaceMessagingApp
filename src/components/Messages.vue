<script setup>
import { ref } from 'vue'

const text = ref('')
const errorText = ref('')

const textAreaInput = ref(false)

const triggerShake = (field) => {
    field.value = true
    setTimeout(() => {
        field.value = false
    }, 300)
}

async function postMessage() {
    if (text.value.length > 280 || text.value.trim().length === 0) {
        triggerShake(textAreaInput)
        errorText.value = '* invalid *'
        setTimeout(() => {
            errorText.value = ''
        }, 1000)
        return
    }

    const token = localStorage.getItem('token')
    const data = { text: text.value }
    const url = 'https://hap-app-api.azurewebsites.net/message'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }

    let response = await fetch(url, options)

    if (response.status === 201) {
        text.value = ''
        errorText.value = 'message sent successfully'
        setTimeout(() => {
            errorText.value = ''
        }, 1000)
    } else if (response.status === 400) {
        console.log('400')
    } else if (response.status === 401) {
        console.log('401')
    } else {
        console.log('500')
    }
}
</script>

<template>
    <div class="error-container">
        <span class="style-error"> {{ errorText }}</span>
    </div>
    <div class="container">
        <div class="add-message-container" :class="{ shake: textAreaInput }">
            <textarea class="textArea" v-model="text" placeholder="Post a Message..."></textarea>
            <button class="post-button" @click="postMessage()">
                <img class="interface-icon" src="../../public/paper-plane.png" alt="" />
            </button>
        </div>
    </div>
</template>

<style scoped>
/* main container */
.container {
    width: 95%;

    border-radius: 10px;
}

/* the main ui element to send a message */

.add-message-container {
    width: 100%;
    height: 200px;
    outline: none;
    border: 2px solid var(--color-primary-orange);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
}

/* text area is going to fill up message container */
.textArea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    z-index: 0;
    position: absolute;
    background: rgba(133, 120, 120, 0.156);
    padding: 1rem;
    font-size: 20px;
    font-family: var(--font-header-nav);
    color: white;
}

/* text area when focused */
.textArea:focus {
    border: 1px solid rgb(255, 246, 246);
    outline: none;
}

/* post button */
.post-button {
    width: 100px;
    height: 70px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: transparent;
    border: none;
    cursor: url('../../public/custom-cursor-click.png');
}

/* send airplane icon */
.interface-icon:hover {
}

/* error container */

.error-container {
    width: 400px;
    min-height: 20px;
    display: flex;
    justify-content: center;
}

/* style error text or message successful */
.style-error {
    box-sizing: border-box;
    color: var(--color-error-message);
    font-size: 20px;
}
</style>
