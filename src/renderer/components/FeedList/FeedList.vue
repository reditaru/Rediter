<template>
    <div class="feed-list" v-show="!collapsed" @click="selectCategory">
        <div class="category flex-item sub-item">
            <span class="title" >{{ this.category.name }}</span>
            <Icon class="icon" name="pencil-square-o" scale="1.0" @click.native="update"></Icon>
            <Icon class="icon" name="trash-o" scale="1.0" @click.native="removeCategory"></Icon>
            <portal v-if="flag" to="modal">
                <form name="category" class="update-category form" @submit.prevent="updateCategory" ref="category">
                    <div class="msg-box" v-if="!valid">
                        {{ msg }}
                    </div>
                    <div class="form-item">
                        <div class="title">Name</div>
                        <input name="name" type="text" :value="category.name">
                    </div>
                    <div class="form-item buttons">
                        <button type="button" :class="[categoryLoading? 'btn-loading':'','btn','btn-red']" :disabled="categoryLoading" @click="closeModal">
                            Close
                        </button>
                        <button type="submit" :class="[categoryLoading? 'btn-loading':'','btn','btn-primary']" :disabled="categoryLoading">
                            <Spinner v-if="categoryLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Update</button>
                    </div>
                </form>
            </portal>
        </div>
        <div v-show="selected && feeds" class="list">
            <SingleFeed v-for="feed in feeds" :feed="feed" :key="feed.id" :active="feed.id == currentFeed" @select="selectFeed" @remove="removeFeed"></SingleFeed>
        </div>
    </div>
</template>

<script>
    import SingleFeed from './SingleFeed'
    import Icon from "vue-awesome/components/Icon"
    import Spinner from 'vue-simple-spinner'
    import "vue-awesome/icons/trash-o"
    import "vue-awesome/icons/pencil-square-o"
    import { mapState } from 'vuex';
    export default {
        name: "FeedList",
        components: {
            SingleFeed, Icon, Spinner
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
            },
            valid: {
                type: Boolean,
                defalut: true
            },
            msg: {
                type: String,
                defalut: ''
            }
        },
        data() {
            return {
                flag: false,
                request: false
            }
        },
        computed: {
            ...mapState({
                currentFeed: state => state.Feed.currentFeed,
                categoryLoading: state => state.Category.loading,
                categoryStatus: state => state.Category.status,
                categoryMsg: state => state.Category.msg,
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
                this.request = true;
                this.$emit('updateCategory', { e: e, id: this.category.id});
                e.stopPropagation();
            },
            update(e) {
                this.flag = true;
                this.$emit('update');
                e.stopPropagation();
            },
            removeCategory(e) {
                this.$emit('remove', this.category.id);
                e.stopPropagation();
            },
            removeFeed(id) {

            },
            clearCurrentFeed() {
                this.$store.commit('Feed/SET_CURRENT_FEED', { currentFeed: 0 });
            },
            closeModal(ref) {
                this.flag = false;
                this.$emit('closeModal', this.$refs["category"]);
            }
        },
        watch: {
            categoryLoading(newValue, oldValue) {
                if(this.request&&!newValue && oldValue) {
                    this.request = false;
                    let type = this.categoryStatus? 'success':'fail';
                    let msg = this.categoryStatus? 'Operation success!':this.categoryMsg;
                    this.$root.$emit('showAlert', { type: type, message: msg, duration: 3000})
                }
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

