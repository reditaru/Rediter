<template>
  <div id="toolbar" >
      <div class="flex-item header"></div>
      <div class="flex-item section" @click="collapse">
            <Icon class="icon" name="bars" scale="1.0"></Icon>
      </div>
      <div class="flex-item section" @click="openModal(0)">
            <Icon class="icon" name="plus" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >New Feed</span>
            <portal v-if="flags[0]" to="modal" >
                <form name="feed" class="add-feed form" @submit.prevent="addFeed">
                    <div class="form-item">
                        <div class="title">Address</div>
                        <input name="address" type="text" placeholder="Enter feed address">
                    </div>
                    <div class="form-item">
                        <div class="title">Category</div>
                        <select name="category">
                            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-item buttons">
                        <button type="submit" :class="[feedLoading? 'btn-loading':'','btn','btn-primary']" :disabled="feedLoading">
                            <Spinner v-if="feedLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Confirm</button>
                    </div>
                </form>
            </portal>
      </div>
      <div class="flex-item section" @click="openModal(1)">
            <Icon class="icon" name="user-o" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >Account</span>
            <portal v-if="flags[1]" to="modal">
                <form name="auth" class="login form" @submit.prevent="login">
                    <div class="form-item">
                        <div class="title">Username</div>
                        <input name="username" type="text" placeholder="Enter username or email">
                    </div>
                    <div class="form-item">
                        <div class="title">Password</div>
                        <input name="password" type="password" placeholder="Enter password">
                    </div>
                    <div class="form-item buttons">
                        <button type="submit" :class="[userLoading? 'btn-loading':'','btn','btn-primary']" :disabled="userLoading">
                            <Spinner v-if="userLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Login</button>
                    </div>
                </form>
            </portal>
      </div>
      <div class="category">
        <div class="flex-item section">
            <Icon class="icon" name="folder-o" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >Category</span>
        </div>
        <div v-if="!collapsed" class="flex-item sub-item" @click="openModal(2)">
            <Icon class="icon" name="plus" scale="1.0"></Icon>
            <span class="title" >New Category</span>
            <portal v-if="flags[2]" to="modal">
                <form name="category" class="add-category form" @submit.prevent="addCategory">
                    <div class="form-item">
                        <div class="title">Name</div>
                        <input name="name" type="text" placeholder="Enter category name">
                    </div>
                    <div class="form-item buttons">
                        <button type="submit" :class="[categoryLoading? 'btn-loading':'','btn','btn-primary']" :disabled="categoryLoading">
                            <Spinner v-if="categoryLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Confirm</button>
                    </div>
                </form>
            </portal>
        </div>
        <FeedList v-for="category in categories" 
            :key="category.id" 
            :feeds="feeds[category.id]"
            :showModal="flags[3]"
            :collapsed="collapsed"
            :category="categories[category.id]"
            :selected="category.id == currentCategory"
            @select="selectCategory"
            @update="openModal(3)"
            @remove="removeCategory"
            @updateCategory="updateCategory"
            :ref="category.id">
        </FeedList>
      </div>
  </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import FeedList from '../FeedList/FeedList'
    import Spinner from 'vue-simple-spinner'
    import Vue from 'vue'
    import { validate } from '../../utils/validate'
    import { mapState } from 'vuex'
    import "vue-awesome/icons/bars"
    import "vue-awesome/icons/plus"
    import "vue-awesome/icons/user-o"
    import "vue-awesome/icons/folder-o"
    export default {
        name: "Toolbar",
        components: {
            Icon, FeedList, Spinner
        },
        data() {
            return {
                collapsed: false,
                flags: [false, false, false, false],
                rules: {
                    feed: {
                        address: {
                            required: true
                        },
                        category: {
                            required: true
                        }
                    },
                    auth: {
                        username: {
                            required: true
                        },
                        password: {
                            required: true,
                            min: 6,
                            max: 16
                        }
                    },
                    category: {
                        name: {
                            required: true
                        }
                    }
                }
            }
        },
        computed: {
            ...mapState({
                currentCategory: state => state.Category.currentCategory,
                categories: state => state.Category.categories,
                feeds: state => state.Feed.feeds,
                categoryLoading: state => state.Category.loading,
                categoryStatus: state => state.Category.status,
                categoryMsg: state => state.Category.msg,
                feedLoading: state => state.Feed.loading,
                feedStatus: state => state.Feed.status,
                feedMsg: state => state.Feed.msg,
                userLoading: state => state.Auth.loading,
                userStatus: state => state.Auth.status,
                userMsg: state => state.Auth.msg,
            })
        },
        methods: {
            collapse(){
                this.collapsed = !this.collapsed;
            },
            selectCategory(id) {
                if (this.currentCategory!==id){
                    if (this.currentCategory !== 0)
                        this.$refs[this.currentCategory][0].clearCurrentFeed();
                    this.$store.commit('Category/SET_CURRENT_CATEGORY', { currentCategory: id });
                }
            },
            removeCategory(id) {

            },
            openModal(index) {
                this.clearAllFlags();
                Vue.set(this.flags, index, true);
                this.emitOpenModal();
            },
            addFeed(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                if (result.success) {
                    this.$store.dispatch('Feed/requestNewPosts', { address: result.result.address, category: result.result.category });
                }
            },
            login(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                if (result.success) {
                    
                }
            },
            addCategory(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                if (result.success) {
                    
                }
            },
            updateCategory(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                                console.log(result)
                if (result.success) {
                    
                }
            },
            emitOpenModal() {
                this.$emit('openModal');
            },
            clearAllFlags() {
                for (let i=0;i<this.flags.length;i++) {
                    this.flags[i] = false;
                }
            }
        }
    }
</script>

<style lang="less">
    #toolbar {
        display: flex;
        flex-direction: column;
        background-color: black;
        opacity: 0.6;
        .section {
            margin-bottom: 10px;
            &:hover {
                background-color: white;
                color: black;
                opacity: 0.5;
            }
        }
    }
    .flex-item {
        display: flex;
        align-items: center;
        height: 45px;
        color: white;
        .icon {
            padding: 0 15px;
        }
        .title {
            width: 200px;
            cursor: default;
            user-select: none;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .header {
        height: 30px;
        font-size: 13px;
        padding-left:15px;
    }
    .sub-item {
        padding-left: 15px;
        &:hover {
            background-color: white;
            color: black;
            opacity: 0.5;
        }
    }
    .form {
        display: flex;
        flex-direction: column;
        min-width: 400px;
        .form-item {
            height: 40px;
            font-size: 16px;
            padding: 8px 16px;
            margin: 5px 0px;
            display: flex;
            .title {
                display: flex;
                align-items: center;
                font-weight: bold;
                margin-right: 10px;
            }
            input {
                flex: 1;
                margin: 0;
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
        .buttons {
            display: flex;
            justify-content: flex-end;
            button {
                display: flex;
                align-items: center;
            }
        }
    }
    .btn {
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        text-indent: 0px;
        text-shadow: none;
    }
    .btn-primary {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
        &:hover {
            background-color: #0055af;
            border-color: #0055af;
        }
        &:active {
            background-color: #00448e;
            border-color: #00448e;
        }
    }
    .btn-loading {
        background-color: #808080;
        border-color: #808080;
    }
</style>

