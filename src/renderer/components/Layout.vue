<template>
    <div id="container">
        <Toolbar @openModal="openModal" @closeModal="closeModal"></Toolbar>
        <PostList></PostList>
        <ContentArea></ContentArea>
        <Modal ref="modal" :active="modalActive">
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
                modalActive: false
            }
        },
        methods: {
            openModal() {
                this.modalActive = true;
            },
            closeModal() {
                this.modalActive = false;
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
