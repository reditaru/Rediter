<template>
    <div id="container">
        <Toolbar></Toolbar>
        <PostList></PostList>
        <article id="main-container"></article>
    </div>
</template>

<script>
    import Toolbar from './Toolbar/Toolbar';
    import PostList from './PostList/PostList';

    export default {
        name: "Layout",
        components: {
            Toolbar, PostList
        }
    }
</script>

<style lang="less">
    #container {
        background: url("../assets/background.jpg") no-repeat;
        background-size: cover;
        display: flex;
        height: 100%;
    }
</style>
