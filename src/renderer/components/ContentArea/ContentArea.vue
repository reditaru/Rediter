<template>
    <div v-show="currentPost" class="content">
        <h1 class="title">{{ post.title }}</h1>
        <div class="meta">
            <div class="categories">
                <div v-for="(category, index) in post.categories" :key="index" class="category" >{{ category }}</div>
            </div>
            <span class="author">{{ post.author }}</span>
            <span class="date">发布于 {{ date }} </span>
        </div>
        <div ref="content" v-html="post.description" @click="handleClick"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import moment from 'moment'
    import { shell } from 'electron'
    export default {
        name: 'ContentArea',
        data() {
            return {
                lastPost: 0
            }
        },
        computed: {
            ...mapState({
                currentFeed: state => state.Feed.currentFeed,
                currentPost: state => state.Post.currentPost
            }),
            post() {
                if ((!this.lastPost && this.currentPost) || (this.lastPost && (this.lastPost.link !== this.currentPost))) {
                    let p = this.$store.state.Post.posts[this.currentFeed][this.currentPost];
                    this.lastPost = p;
                    return p;
                }
                return this.lastPost;
            },
            date() {
                return this.post? moment(this.post.date).format('dddd, MMMM Do YYYY, h:mm:ss a') : '';
            }
        },
        methods: {
            handleClick(event) {
                let target = event.target;
                while(target!==this.$refs.content){
                    if (target.nodeName === 'A') {
                        shell.openExternal(target.href);
                        event.preventDefault();
                        break;
                    }
                    target = target.parentElement;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        flex: 1;
        display: flex;
        background-color: white;
        overflow-y: scroll;
        padding: 50px 40px;
        color: black;
        flex-direction: column;
        align-items: center;
        .title {
            align-self: flex-start;
        }
        .meta {
            align-self: flex-start;
            margin: 15px 0px;
            font-size: 15px;
            .categories {
                display: flex;
                width: 100%;
                .category {
                    border-radius: 5px;
                    padding: 3px 8px;
                    margin: 3px;
                    margin-left: 0px;
                    background-color: #e6e6e6;
                }
            }
            .date {
                margin-left: 10px;
                color: #808080;
            }
        }
    }
</style>
