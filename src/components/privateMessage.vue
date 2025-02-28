<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, nextTick } from 'vue'

const privateMessageText = ref('')

const allMessages = ref([])

const privateConvoContainer = ref(null)

const route = useRoute()
const routerRoute = useRouter()

const userId = route.params.userId

console.log(route.query.firstName);



async function scrollToBottom() {
    await nextTick()
    if(privateConvoContainer.value) {
        privateConvoContainer.value.scrollTop = privateConvoContainer.value.scrollHeight;
    }
}

onMounted(() => {
    getPrivateConvo()

})

console.log(localStorage.getItem('id'))

// get convo depending on the user
async function getPrivateConvo() {
    const url = `https://hap-app-api.azurewebsites.net/messages/${userId}`

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        allMessages.value = await response.json()

        // this will make the messages seem like they are updating upwards
        allMessages.value = [...allMessages.value].reverse()
        scrollToBottom()
    } else {
        console.log(response.status)
    }
}

async function postPrivateMessage() {
    if (privateMessageText.value.length === 0 || privateMessageText.value.length >= 280) {
        console.log('error nothing in box')
        return
    }

    const url = `https://hap-app-api.azurewebsites.net/message/${userId}`

    const data = { text: privateMessageText.value }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    }

    let response = await fetch(url, options)

    if (response.status === 201) {
        console.log('Your private message was created')
        privateMessageText.value = ''
        getPrivateConvo()
    } else {
        console.log(response.status)
    }
}
</script>

<template>
    <div class="message-container">
        <div class="privateMessage-container">
            <div class="header-privateMessage">
                <div class="back-button-container" tabindex="0" @click="routerRoute.back()">
                    <img src="../../public/arrow-small-left.svg" alt="" class="interface-icon" />
                </div>
                <div class="name-container">
                    <h1>{{ route.query.firstName }}</h1>
                </div>
                <div class="refresh-container" tabindex="0" @click="getPrivateConvo()">
                    <img src="../../public/refresh.png" class="refresh-icon" alt="" />
                </div>
            </div>

            <div class="convo-private-container" ref="privateConvoContainer">
                <div class="privateMessages" v-for="message in allMessages" :key="message.id">

                    <div class="">{{ console.log(message) }}</div>


                    <!-- this is actually going to be for other user thats sending to me -->
                    <div class="message-cellLocal" v-if="message.senderId === userId">
                        <div class="local-user">
                            <p class="senderName">{{ message.senderName }}</p>
                            <p class="message">{{ message.text }}</p>
                        </div>
                    </div>


                    <!-- this will be my messages and cell box -->
                    <div class="message-cellUser" v-else>
                        <div class="local-user">
                            <p class="senderName">{{ message.senderName }}</p>
                            <p class="message">{{ message.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lower-post-container">
            <div class="send-message-container">
                <textarea
                    class="textArea"
                    placeholder="Send Message..."
                    v-model="privateMessageText"
                ></textarea>
                <div class="div" tabindex="0" @click="postPrivateMessage()">
                    <img src="../../public/paper-plane.png" class="paper-plane" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* main private message container */
.message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.041);
    border-left: 1px solid rgba(255, 255, 255, 0.041);
    height: calc(100vh - 150px);
    box-sizing: border-box;
    padding: 1rem;
}

.privateMessage-container {
    width: 900px;
    height: 500px;
    border: 2px solid var(--color-primary-orange);
    border-bottom: 3px solid wheat;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: rgba(0, 0, 0, 0.709);
    box-sizing: border-box;
}

/* lower post container is the message and friends menu area */
.lower-post-container {
    width: 900px;
    height: 200px;

    display: flex;
    position: relative;
}

.lower-post-container .friends-menu {
    width: 225px;
    height: 100%;
    background-color: wheat;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom: 2px solid var(--color-primary-orange);
    border-left: 2px solid var(--color-primary-orange);
}

/* text area that will cover 75% */
.textArea {
    width: 900px;
    height: 100%;
    border: 2px solid var(--color-primary-orange);
    border-top: none;
    box-sizing: border-box;
    background-color: rgba(92, 81, 81, 0.709);
    padding: 1rem;
    font-size: 20px;
    color: white;
    border-left: 1px solid var(--color-primary-orange);
    font-family: var(--font-header-nav);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

/* paper plane that will send private message within the textArea */
.lower-post-container .paper-plane {
    position: absolute;
    bottom: 10%;
    right: 5%;
}

/* back button in private message */
.back-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255, 255, 255, 0.041);
}

.refresh-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255, 255, 255, 0.041);
}

.name-container {
    width: 700px;
    height: 100px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.041);
    font-family: var(--font-header-nav);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-primary-orange);
}

.interface-icon {
    width: 50px;
    height: 50px;
}

/* refresh icon */
.refresh-icon {
    width: 35px;
    height: 35px;
}

/* message cell is going to be the users messages between eachother */
.message-cellLocal {
    width: 400px;
    max-width: 400px;
    max-height: 400px;
    max-height: fit-content;
    background-color: var(--color-primary-orange);
    padding-left: 1rem;
    padding-block: 0.25rem;
    margin-left: 2px;
    margin-bottom: 5px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 20px;
    font-family: var(--font-header-nav);
    color: white;
    align-self: flex-start;
}

/* non local user message cell */
.message-cellUser {
    width: 400px;
    max-width: 400px;
    max-height: 400px;
    background-color: purple;
    padding-left: 1rem;

    padding-block: 0.25rem;
    margin-right: 2px;
    margin-bottom: 5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    font-size: 20px;
    font-family: var(--font-header-nav);
    color: white;
    align-self: flex-end;

}

/* in the message -cells the p tags */
.senderName {
    font-size: 15px;
    color: rgb(0, 0, 0);
}

/* header in private messages container */
.header-privateMessage {
    display: flex;
}

/* messages container that will hold all the message cells */
.privateMessages {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;


}

/* convo-container making sure */
.convo-private-container {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;


}

/* media querie for mac */
@media screen and (max-width: 1600px) {
    .privateMessage-container {
        width: 700px;
    }

    .lower-post-container {
        width: 700px;
    }

    .textArea {
        width: 500px;
    }

    .friends-menu {
        width: 125px;
    }
}
</style>
