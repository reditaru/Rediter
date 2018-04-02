<template>
    <div class="feed-list" v-show="!collapsed" @click="selectCategory">
        <div class="category flex-item sub-item">
            <span class="title" >{{ this.category.name }}</span>
            <Icon class="icon" name="pencil-square-o" scale="1.0" @click.native="updateCategory"></Icon>
            <Icon class="icon" name="trash-o" scale="1.0" @click.native="removeCategory"></Icon>
        </div>
        <div v-show="selected" class="list">
            <SingleFeed v-for="feed in feeds" :feed="feed" :key="feed.id" :active="feed.id == currentFeed" @select="selectFeed" @remove="removeFeed"></SingleFeed>
        </div>
    </div>
</template>

<script>
    import SingleFeed from './SingleFeed'
    import Icon from "vue-awesome/components/Icon"
    import "vue-awesome/icons/trash-o"
    import "vue-awesome/icons/pencil-square-o"
import { mapState } from 'vuex';
    export default {
        name: "FeedList",
        components: {
            SingleFeed, Icon
        },
        props: {
            category: {
                type: Object,
                defalut: () => {
                    return {
                        id: 0,
                        name: 'Default Category'
                    };
                }
            },
            feeds: {
                type: Object,
                defalut: () => {
                    return {
                        0: {
                            id: 0,
                            name: 'Default Category'
                        }
                    };
                }
            },
            collapsed: {
                type: Boolean,
                defalut: false
            },
            selected: {
                type: Boolean,
                defalut: false
            }
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapState({
                currentFeed: state => state.Feed.currentFeed
            })
        },
        methods: {
            selectCategory() {
                this.$emit('select', this.category.id);
            },
            selectFeed(id) {
                this.$store.commit('Feed/SET_CURRENT_FEED', { currentFeed: id });
            },
            updateCategory(e) {
                this.$emit('update');
                e.stopPropagation();
            },
            removeCategory(e) {
                this.$emit('remove', this.category.id);
                e.stopPropagation();
            },
            removeFeed(id) {

            },
            clearCurrentFeed(){
                this.$store.commit('Feed/SET_CURRENT_FEED', { currentFeed: 0 });
            }
        }
    }
</script>

<style lang="less">
    .feed-list {
        display: flex;
        flex-direction: column;
        .category {
            display: flex;
            .title {
                padding-left: 15px;
                flex: 1;
            }
            .icon {
                padding-left: 8px;
                padding-right: 8px;
                &:hover {
                    color: rgb(86, 187, 209);
                }
                &:active {
                    color: rgb(54, 117, 131);
                }
            }
        }
        .list {
            flex: 1;
        }
    }
</style>

