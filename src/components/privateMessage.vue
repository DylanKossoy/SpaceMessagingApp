<script setup></script>


<template>
    <div class="message-container">
        <div class="privateMessage-container"></div>
        <div class="lower-post-container">
            <div class="friends-menu"></div>
            <div class="send-message-container">
                <textArea class="textArea" placeholder="Send Message...">

                </textArea>
                <img src="../../public/paper-plane.png" class="paper-plane" alt="">

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
    border-bottom: none;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: rgba(0, 0, 0, 0.709);
    box-sizing: border-box;
}


/* lower post container is the message and friends menu area */
.lower-post-container  {
    width: 900px;
    height: 200px;

    display: flex;
    position: relative;

}

.lower-post-container .friends-menu {
    width: 225px;
    height: 100%;
    background-color:white;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom: 2px solid var(--color-primary-orange);
    border-left: 2px solid var(--color-primary-orange);
}



/* text area that will cover 75% */
.textArea {
    width: 675px;
    height: 100%;
    border: 2px solid var(--color-primary-orange);
    border-top: none;
    box-sizing: border-box;
    background-color: rgba(92, 81, 81, 0.709);
    padding: 1rem;
    font-size: 20px;
    color: white;
    border-left: none;
    font-family: var(--font-header-nav);
    border-bottom-right-radius: 10px;


}


/* paper plane that will send private message within the textArea */
.lower-post-container .paper-plane {
    position: absolute;
    bottom: 10%;
    right: 5%;
}




</style>
