<script setup></script>

<template>
    <div class="search-container">
        <div class="search-bar-container">
            <img src="../../public/search.png" alt="" class="interface-icon" />
            <input type="search" class="search-box" placeholder="Search User..." />
        </div>
        <div class="data-container">
            <div class="data-cell">
                <div class="data-cell-user">
                    <h5 class="user-info">First Name</h5>
                    <h5 class="user-info">Last Name</h5>
                    <h5 class="user-info">Username</h5>
                </div>
                <div class="data-cell-footer">
                    <img src="../../public/paper-plane.png" alt="" class="send-message-icon" />
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
    height: 60px;
    border: 2px solid var(--color-primary-orange);
    border-radius: 10px;
    background: rgba(133, 120, 120, 0.156);
    font-size: 17px;
    color: white;
    padding: 1rem;
    padding-left: 3rem;
    font-family: var(--font-header-nav);
}

/* interface icon */
.interface-icon {
    max-height: 25px;
    position: absolute;
    left: 3%;
}

/* data cell container */
.data-container {
    height: 600px;
    max-height: 600px;
    box-sizing: border-box;
}

.data-container .data-cell {
    border: 2px solid var(--color-primary-orange);
    border-radius: 10px;
    height: 150px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
}

.data-cell-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.data-cell-user {
    width: 400px;
    height: 100%;
}

.user-info {
    font-size: 20px;
    color: white;
    margin: 1rem;
    box-sizing: border-box;
}

/* paper plane */
.send-message-icon {
    max-height: 25px;
    max-width: 25px;
    margin: 1rem;
}
</style>
