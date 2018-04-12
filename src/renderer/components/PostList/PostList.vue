<template>
    <div id="post-list">
        <div class="flex-item header"></div>
        <div class="flex-item section tools">
            <input placeholder="Search"  v-model="searchText">
            <Icon class="icon" name="refresh" scale="1.5" @click.native="refresh()"></Icon>
        </div>
        <div class="flex-item posts">
            <h2 class="title">Posts</h2>
            <select v-model="selected">
                <option value="0">Default</option>
                <option value="1">Unread</option>
                <option value="2">Read</option>
            </select>
        </div>
        <Spinner v-if="loading" style="margin-top:8px; margin-bottom:8px;"></Spinner>
        <div v-if="!empty" class="list">
            <template v-for="(value, key) in datas">
                <SingleDate :key="key" :date="key"></SingleDate>
                <SinglePost v-for="post in value" :key="post.link" :post="post" @select="selectPost" :active="post.link === currentPost"></SinglePost>
            </template>
        </div>
        <div v-if="!loading && empty" class="empty-msg">
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
    import Spinner from 'vue-simple-spinner'
    import moment from 'moment'
    export default {
        name: 'PostList',
        data() {
            return {
                searchText: '',
                actualText: [],
                selected: '0'
            }
        },
        components: {
            Icon, SinglePost, SingleDate, Spinner
        },
        watch: {
            searchText (newValue, oldValue) {
                this.changeText();
            }
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
                let result = {};
                if (this.posts[this.currentFeed]) {
                    Object.keys(this.posts[this.currentFeed]).forEach((key) => {
                        let data = this.posts[this.currentFeed][key];
                        let flag = false;
                        if ((this.selected === '0') || (this.selected === '1' && !data.status) || (this.selected ==='2' && data.status)) {
                            if (this.actualText.length !== 0) {
                                this.actualText.forEach((item) => {
                                    if (data.summary.includes(item) || data.title.includes(item)) {
                                        flag = true;
                                    }
                                });
                            } else {
                                flag = true;
                            }
                        }
                        if (flag) {
                            let date = moment(data.date).format('MMM DD, YYYY');
                            if (!result[date]) {
                                result[date] = [];
                            }
                            result[date].push(data);
                        }
                    });
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
                        });
                    });
                }
                return result;
            },
            empty() {
                return Object.keys(this.datas).length === 0;
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
        mounted() {
            this.changeText = this._.debounce(function(){
                    this.actualText = this.searchText.replace(/(^\s*)|(\s*$)/g, "").split(/\s+/);
            }, 500);
        },
        beforeUpdate() {
            if (!this.posts[this.currentFeed]) {
                if (this.feeds[this.currentCategory] && this.feeds[this.currentCategory][this.currentFeed]) {
                    let feed = this.feeds[this.currentCategory][this.currentFeed];
                    this.$store.dispatch('Feed/requestNewPosts', { ...feed, local: true });
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
        .posts {
            .title {
                flex: 1;
            }
        }
        select {
            margin: 0;
            margin-right: 12px;
            overflow: visible;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            font-family: inherit;
            border-radius: 6px;
            border-width: 1px;
        }
    }
</style>
