<script setup>
import { ref } from 'vue'

const text = ref('')
const errorText = ref('');

const textAreaInput = ref(false);



const triggerShake = (field) => {
    field.value = true
    setTimeout(() => {
        field.value = false
    }, 300)
}

async function postMessage() {
    if (text.value.length > 280 || text.value.trim().length === 0) {
        triggerShake(textAreaInput);
        errorText.value = '* invalid *'
        setTimeout(() => {
            errorText.value = '';

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
           'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }


    let response = await fetch(url, options)

    if (response.status === 201) {

        text.value = ''
        errorText.value = 'message sent successfully';
        setTimeout(() => {
            errorText.value = '';

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
    <div class="container">
        <div class="all-messages-container">
            <h1 class="messages-title">Messages</h1>

            <div class="add-message-container">
                <label for="textArea" class="send-message-title">Send Message</label>
                <textarea id="textArea" v-model="text" :class="{ shake: textAreaInput}"></textarea>
                <button class="post-button" @click="postMessage()">Post Message</button>
                <span class="style-error"> {{ errorText }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* first container holding everything and taking up a third of the main width */
.container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: url('../../public/custom-cursor.png'), pointer;
}

/* will hold the message title, input, all messages with scroll */
.all-messages-container {
    background: rgba(59, 58, 58, 0.801);
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    backdrop-filter: blur(5px);

    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}

/* post button */
.post-button {
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: 150px;
    height: 40px;
    border: none;
    font-family: var(--font-header-nav);
    color: white;
    background-color: var(--color-primary-orange);
    border-radius: 10px;
    cursor: url('../../public/custom-cursor-click.png'), pointer;
}

/* title */
.messages-title {
    color: white;
}

/* send message title */
.send-message-title {
    color: white;
    font-size: 30px;
    margin-bottom: 2rem;
}

/* adding messages container */
.add-message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.add-message-container textarea {
    height: 200px;
    color: white;
    outline: none;
    border: 3px solid var(--color-primary-orange);
    border-radius: 20px;
    background: rgba(133, 120, 120, 0.156);
    font-family: var(--font-header-nav);
    box-sizing: border-box;
    padding: 1rem;
    font-size: 15px;
}

 /* span to show if message was successful or not */
 .style-error {
    color: white;
    font-family: var(--font-primary);
 }

</style>
