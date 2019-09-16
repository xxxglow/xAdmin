<template>
    <div class="home">
        <div class="container">
            <h1 class="title">鲁迅“毒舌”在线</h1>
            <p class="lead">当我沉默著的时候，我觉得充实；我将开口，同时感到空虚。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    background: url(../assets/showcase.jpg) no-repeat;
    background-size: 100% 100%;
}
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: white;
}
.title {
    font-size: 30px;
}
.lead {
    margin-top: 50px;
    font-size: 22px;
}
</style>
