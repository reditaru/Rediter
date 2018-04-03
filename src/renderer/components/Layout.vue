<template>
    <div id="container">
        <Toolbar></Toolbar>
        <PostList></PostList>
        <ContentArea></ContentArea>
    </div>
</template>

<script>
    import Toolbar from './Toolbar/Toolbar';
    import PostList from './PostList/PostList';
    import ContentArea from './ContentArea/ContentArea'

    export default {
        name: "Layout",
        components: {
            Toolbar, PostList, ContentArea
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
