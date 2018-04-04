<template>
    <div id="container">
        <Toolbar @openModal="openModal"></Toolbar>
        <PostList></PostList>
        <ContentArea></ContentArea>
        <Modal ref="modal">
            <portal-target name="modal"></portal-target>
        </Modal>
    </div>
</template>

<script>
    import Toolbar from './Toolbar/Toolbar';
    import PostList from './PostList/PostList';
    import ContentArea from './ContentArea/ContentArea'
    import Modal from './Modal'
    export default {
        name: "Layout",
        components: {
            Toolbar, PostList, ContentArea, Modal
        },
        data() {
            return {
            }
        },
        methods: {
            openModal() {
                this.$refs.modal.open();
            }
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
