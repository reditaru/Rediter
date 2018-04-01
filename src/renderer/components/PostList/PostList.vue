<template>
    <div id="post-list">
        <div class="flex-item header"></div>
        <div class="flex-item section tools">
            <input placeholder="Search" >
            <Icon class="icon" name="refresh" scale="1.5" @click.native="refresh()"></Icon>
        </div>
        <div class="flex-item section">
            <h2>Posts</h2>
        </div>
        <div class="list">
            <SingleDate></SingleDate>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>
            <SinglePost></SinglePost>            
        </div>
    </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import { mapState } from 'vuex'
    import "vue-awesome/icons/refresh"
    import SingleDate from "./SingleDate"
    import SinglePost from "./SinglePost"
    export default {
        name: 'PostList',
        components: {
            Icon, SinglePost, SingleDate
        },
        computed: {
            ...mapState({
                currentCategory: state => state.Category.currentCategory,
                posts: state => state.Post.posts[this.currentCategory],
                loading: state => state.Post.posts.loading,
                status: state => state.Post.posts.status,
                msg: state => state.Post.posts.msg
            })
        },
        methods: {
            refresh() {
                
            }
        }
    }
</script>

<style lang="less" scoped>
    #post-list {
        display: flex;
        flex: 0 450px;
        flex-direction: column;
        background-color: white;
        .flex-item {
            color: black;
            padding-left: 25px;
        }
        .section {
            margin-bottom: 10px;
        }
        .tools {
            display: flex;
            input {
                height: 35px;
                padding: 0 8px;
                flex: 1;
            }
            .icon {
                padding: 0 15px;
                cursor: pointer;
                &:hover {
                    color: lightblue;
                }
            }
        }
        .list {
            flex: 1;
            overflow: scroll;
            overflow-x: hidden;
        }
    }
</style>
