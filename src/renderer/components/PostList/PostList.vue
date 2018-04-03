<template>
    <div id="post-list">
        <div class="flex-item header"></div>
        <div class="flex-item section tools">
            <input placeholder="Search" >
            <Icon class="icon" name="refresh" scale="1.5" @click.native="refresh()"></Icon>
        </div>
        <div class="flex-item posts">
            <h2>Posts</h2>
        </div>
        <div v-if="posts[currentFeed]" class="list">
            <template v-for="(value, key) in datas">
                <SingleDate :key="key" :date="key"></SingleDate>
                <SinglePost v-for="post in value" :key="post.link" :post="post" @select="selectPost" :active="post.link === currentPost"></SinglePost>
            </template>
        </div>
        <div v-else class="empty-msg">
            <h4>Empty Post List!</h4>
        </div>
    </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import { mapState } from 'vuex'
    import "vue-awesome/icons/refresh"
    import SingleDate from "./SingleDate"
    import SinglePost from "./SinglePost"
    import moment from 'moment'
    export default {
        name: 'PostList',
        components: {
            Icon, SinglePost, SingleDate
        },
        computed: {
            ...mapState({
                currentPost: state => state.Post.currentPost,
                currentCategory: state => state.Category.currentCategory,
                currentFeed: state => state.Feed.currentFeed,
                feeds: state => state.Feed.feeds,
                posts: state => state.Post.posts,
                loading: state => state.Feed.loading,
                status: state => state.Feed.status,
                msg: state => state.Feed.msg
            }),
            datas() {
                let result = {}
                if (this.posts[this.currentFeed]) {
                    Object.keys(this.posts[this.currentFeed]).forEach((key) => {
                        let date = moment(this.posts[this.currentFeed][key].date).format('MMM DD, YYYY');
                        if (!result[date]) {
                            result[date] = [];
                        }
                        result[date].push(this.posts[this.currentFeed][key]);
                    })
                }
                result = Object.keys(result).sort((a, b) => {
                        return moment(b, 'MMM DD, YYYY').unix() - moment(a, 'MMM DD, YYYY').unix();
                    })
                    .reduce((a, v) => {
                        a[v] = result[v];
                        return a;
                    }, {});
                Object.keys(result).forEach((key) => {
                    result[key].sort((a, b) => {
                        return moment(b.date).unix() - moment(a.date).unix()
                    })
                });
                console.log(result);
                return result;
            }
        },
        methods: {
            refresh() {
                if (this.feeds[this.currentCategory] && this.feeds[this.currentCategory][this.currentFeed]) {
                    let feed = this.feeds[this.currentCategory][this.currentFeed];
                    this.$store.dispatch('Feed/requestNewPosts', feed);
                }
            },
            selectPost(link) {
                if (this.currentPost !== link) {
                    this.$store.commit('Post/SET_CURRENT_POST', { currentPost: link, currentFeed: this.currentFeed });
                }
            }
        },
        beforeUpdate() {
            if (!this.posts[this.currentFeed]) {
                if (this.feeds[this.currentCategory] && this.feeds[this.currentCategory][this.currentFeed]) {
                    let feed = this.feeds[this.currentCategory][this.currentFeed];
                    this.$store.dispatch('Feed/requestNewPosts', feed);
                }
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
        border-right: 1px solid #e6e6e6;
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
        .posts {
            border-bottom: 1px solid #e9e9e9;
        }
        .empty-msg {
            text-align: center;
            padding-top: 8px;
        }
    }
</style>
