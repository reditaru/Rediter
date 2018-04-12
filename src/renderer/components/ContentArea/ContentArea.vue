<template>
    <div v-show="currentPost" class="content">
        <h1 class="title">{{ post.title }}</h1>
        <div class="meta">
            <div class="categories">
                <div v-for="(category, index) in post.categories" :key="index" class="category" >{{ category }}</div>
            </div>
            <span class="author">{{ post.author }}</span>
            <span class="date">发布于 {{ date }} </span>
            <Icon class="icon share" name="share" scale="1.8" @click.native="copy"></Icon>
        </div>
        <div style="width: 100%;" ref="content" v-html="description" @click="handleClick"></div>
    </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import "vue-awesome/icons/share"
    import { mapState } from 'vuex'
    import moment from 'moment'
    import { shell, clipboard } from 'electron'
    export default {
        name: 'ContentArea',
        components: {
            Icon
        },
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
            description() {
                return this.post? this.post.description
                                            .replace(/<img(.*?)src="\/(.*)?"/g, `<img$1 src="${this.extractUrl(this.post.link)}/$2"`)
                                            .replace(/<img(.*?)(style="(.*?)")?/g, `<img$1 style="$3; max-width:100%;"`) : '';
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
            },
            copy(event) {
                this.$root.$emit('showAlert', { type: "success", message: "Copied to clipboard!", duration: 3000});
                clipboard.writeText(this.post.link);
            },
            extractUrl(url) {
                return url.split('/').slice(0,3).join('/');
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        flex: 1;
        display: flex;
        background-color: white;
        overflow: scroll;
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
            .share {
                position: fixed;
                top: 50px;
                right: 50px;
                opacity: 0.6;
                cursor: pointer;
                &:hover {
                    color: rgb(50, 89, 102);
                }
            }
            .date {
                margin-left: 10px;
                color: #808080;
            }
        }
    }
</style>
