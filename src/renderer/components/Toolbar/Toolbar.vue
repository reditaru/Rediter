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
                <form name="feed" class="add-feed form" @submit.prevent="addFeed" ref="feed">
                    <div class="msg-box" v-if="!valid">
                        {{ msg }}
                    </div>
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
                        <button type="button" :class="[feedLoading? 'btn-loading':'','btn','btn-red']" :disabled="feedLoading" @click="closeModal('feed')">
                            Close
                        </button>
                        <button type="submit" :class="[feedLoading? 'btn-loading':'','btn','btn-primary']" :disabled="feedLoading">
                            <Spinner v-if="feedLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Confirm</button>
                    </div>
                </form>
            </portal>
      </div>
      <div class="flex-item section" @click="!isLogin && openModal(1)">
            <Icon class="icon" name="user-o" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >{{ user.name || 'Account' }}</span>
            <Icon v-show="!collapsed && !isLogin" class="icon" name="id-card-o" scale="1.0" @click.native="openRegisterModal"></Icon>
            <Icon v-show="!collapsed && isLogin" class="icon" name="sign-out" scale="1.0" @click.native="logout"></Icon>
            <portal v-if="flags[3]" to="modal">
                <form name="register" class="register form" @submit.prevent="register" ref="register">
                    <div class="msg-box" v-if="!valid">
                        {{ msg }}
                    </div>
                    <div class="form-item">
                        <div class="title">Username</div>
                        <input name="username" type="text" placeholder="Enter username">
                    </div>
                    <div class="form-item">
                        <div class="title">Email</div>
                        <input name="email" type="text" placeholder="Enter email">
                    </div>
                    <div class="form-item">
                        <div class="title">Password</div>
                        <input name="password" type="password" placeholder="Enter password">
                    </div>
                    <div class="form-item">
                        <div class="title">Name</div>
                        <input name="name" type="text" placeholder="Enter name">
                    </div>
                    <div class="form-item buttons">
                        <button type="button" :class="[userLoading? 'btn-loading':'','btn','btn-red']" :disabled="userLoading" @click="closeModal('register')">
                            Close
                        </button>
                        <button type="submit" :class="[userLoading? 'btn-loading':'','btn','btn-primary']" :disabled="userLoading">
                            <Spinner v-if="userLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Register</button>
                    </div>
                </form>
            </portal>
            <portal v-if="flags[1]" to="modal">
                <form name="auth" class="login form" @submit.prevent="login" ref="auth">
                    <div class="msg-box" v-if="!valid">
                        {{ msg }}
                    </div>
                    <div class="form-item">
                        <div class="title">Username</div>
                        <input name="account" type="text" placeholder="Enter username or email">
                    </div>
                    <div class="form-item">
                        <div class="title">Password</div>
                        <input name="password" type="password" placeholder="Enter password">
                    </div>
                    <div class="form-item buttons">
                        <button type="button" :class="[userLoading? 'btn-loading':'','btn','btn-red']" :disabled="userLoading" @click="closeModal('auth')">
                            Close
                        </button>
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
                <form name="category" class="add-category form" @submit.prevent="addCategory" ref="category">
                    <div class="msg-box" v-if="!valid">
                        {{ msg }}
                    </div>
                    <div class="form-item">
                        <div class="title">Name</div>
                        <input name="name" type="text" placeholder="Enter category name">
                    </div>
                    <div class="form-item buttons">
                        <button type="button" :class="[categoryLoading? 'btn-loading':'','btn','btn-red']" :disabled="categoryLoading" @click="closeModal('category')">
                            Close
                        </button>
                        <button type="submit" :class="[categoryLoading? 'btn-loading':'','btn','btn-primary']" :disabled="categoryLoading">
                            <Spinner v-if="categoryLoading" size="tiny" style="display:inline-block; margin-right: 8px;"></Spinner>
                            Confirm</button>
                    </div>
                </form>
            </portal>
        </div>
        <div v-if="categories">
            <FeedList v-for="category in categories" 
                :key="category.id" 
                :feeds="feeds[category.id]"
                :collapsed="collapsed"
                :category="categories[category.id]"
                :selected="category.id == currentCategory"
                :valid="valid"
                :msg="msg"
                @select="selectCategory"
                @update="openModal(4)"
                @remove="removeCategory"
                @updateCategory="updateCategory"
                @closeModal="closeModal"
                ref="feedList">
            </FeedList>
        </div>
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
    import "vue-awesome/icons/id-card-o"
    import "vue-awesome/icons/bars"
    import "vue-awesome/icons/plus"
    import "vue-awesome/icons/user-o"
    import "vue-awesome/icons/folder-o"
    import "vue-awesome/icons/sign-out"
    export default {
        name: "Toolbar",
        components: {
            Icon, FeedList, Spinner
        },
        data() {
            return {
                collapsed: false,
                flags: [false, false, false, false],
                valid: true,
                msg: '',
                request: false,
                rules: {
                    feed: {
                        address: {
                            required: {
                                value: true,
                                msg: 'Please input address!'
                            }
                        },
                        category: {
                            required: {
                                value: true,
                                msg: 'Please select category!'
                            }
                        }
                    },
                    auth: {
                        account: {
                            required: {
                                value: true,
                                msg: 'Please input username!'
                            }
                        },
                        password: {
                            required: {
                                value: true,
                                msg: 'Please input password!'
                            },
                            min: {
                                value: 6,
                                msg: 'Password length cannot be less than 6!'
                            },
                            max: {
                                value: 16,
                                msg: 'Password length cannot be more than 16!'
                            }
                        }
                    },
                    category: {
                        name: {
                            required: {
                                value: true,
                                msg: 'Please input category!'
                            }
                        }
                    },
                    register: {
                        name: {
                            required: {
                                value: true,
                                msg: 'Please input name!'
                            }
                        },
                        username: {
                            required: {
                                value: true,
                                msg: 'Please input username!'
                            },
                            min: {
                                value: 6,
                                msg: 'username length cannot be less than 6!'
                            },
                            max: {
                                value: 16,
                                msg: 'username length cannot be more than 16!'
                            }
                        },
                        password: {
                            required: {
                                value: true,
                                msg: 'Please input password!'
                            },
                            min: {
                                value: 6,
                                msg: 'Password length cannot be less than 6!'
                            },
                            max: {
                                value: 16,
                                msg: 'Password length cannot be more than 16!'
                            }
                        },
                        email: {
                            required: {
                                value: true,
                                msg: 'Please input email!'
                            },
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
                user: state => state.Auth.user,
                isLogin: state => state.Auth.isLogin,
                userLoading: state => state.Auth.loading,
                userStatus: state => state.Auth.status,
                userMsg: state => state.Auth.msg,
            })
        },
        watch: {
            feedLoading(newValue, oldValue) {
                if(this.request&&!newValue && oldValue) {
                    this.request = false;
                    let type = this.feedStatus? 'success':'fail';
                    let msg = this.feedStatus? 'Operation success!':this.feedMsg;
                    this.$root.$emit('showAlert', { type: type, message: msg, duration: 3000})
                }
            },
            categoryLoading(newValue, oldValue) {
                if(this.request&&!newValue && oldValue) {
                    this.request = false;
                    let type = this.categoryStatus? 'success':'fail';
                    let msg = this.categoryStatus? 'Operation success!':this.categoryMsg;
                    this.$root.$emit('showAlert', { type: type, message: msg, duration: 3000})
                }
            },
            userLoading(newValue, oldValue) {
                if(this.request&&!newValue && oldValue) {
                    this.request = false;
                    let type = this.userStatus? 'success':'fail';
                    let msg = this.userStatus? 'Operation success!':this.userMsg;
                    this.$root.$emit('showAlert', { type: type, message: msg, duration: 3000})
                }
            }
        },
        methods: {
            collapse(){
                this.collapsed = !this.collapsed;
            },
            openRegisterModal(e) {
                this.openModal(3);
                e.stopPropagation();
            },
            selectCategory(id) {
                if (this.currentCategory!==id){
                    if (this.currentCategory !== 0){
                        for(let ref of this.$refs["feedList"]){
                            if(ref.category.id === this.currentCategory){
                                ref.clearCurrentFeed();
                            }
                        }
                    }
                    if (!this.feeds[id]){
                        this.request = true;
                        this.$store.dispatch('Feed/getFeeds', { id });
                    }
                    this.$store.commit('Category/SET_CURRENT_CATEGORY', { currentCategory: id });
                }
            },
            removeCategory(id) {
                this.request = true;
                this.$store.dispatch('Category/deleteCategory', { id });
            },
            openModal(index) {
                this.clearAllFlags();
                if (index<this.flags.length)
                    Vue.set(this.flags, index, true);
                this.emitOpenModal();
            },
            closeModal(ref) {
                if (typeof ref === 'string') 
                    ref = this.$refs[ref];
                this.clearAllFlags();
                this.resetForm(ref);
                this.emitCloseModal();
            },
            async addFeed(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                this.request = true;
                if (result.success) {
                    this.valid = true;
                    await this.$store.dispatch('Feed/addNewFeed', { address: result.result.address, category: result.result.category });
                    this.resetForm(e.target);
                    Vue.set(this.flags, 0, false);
                    this.emitCloseModal();
                } else {
                    this.valid = false;
                    this.msg = result.msg;
                }
            },
            async login(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                this.request = true;
                if (result.success) {
                    this.valid = true;
                    await this.$store.dispatch('Auth/login', result.result);
                    this.resetForm(e.target);
                    Vue.set(this.flags, 1, false);
                    this.emitCloseModal();
                } else {
                    this.valid = false;
                    this.msg = result.msg;
                }
            },
            async register(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                this.request = true;
                if (result.success) {
                    this.valid = true;
                    await this.$store.dispatch('Auth/register', result.result);
                    this.resetForm(e.target);
                    Vue.set(this.flags, 3, false);
                    this.emitCloseModal(); 
                } else {
                    this.valid = false;
                    this.msg = result.msg;
                }
            },
            async logout(e) {
                this.request = true;
                await this.$store.dispatch('Auth/logout');
            },
            async addCategory(e) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                this.request = true;
                if (result.success) {
                    this.valid = true;
                    await this.$store.dispatch('Category/createCategory', result.result);
                    this.resetForm(e.target);
                    Vue.set(this.flags, 2, false);
                    this.emitCloseModal(); 
                } else {
                    this.valid = false;
                    this.msg = result.msg;
                }
            },
            async updateCategory({ e, id }) {
                let result = validate(this.rules[e.target.attributes.name.value], e.target.elements);
                if (result.success) {
                    this.valid = true;
                    await this.$store.dispatch('Category/updateCategory', { ...result.result, id: id});
                    this.resetForm(e.target);
                    this.emitCloseModal(); 
                } else {
                    this.valid = false;
                    this.msg = result.msg;
                }
            },
            resetForm(elem) {
                if(elem && elem.reset) elem.reset();
            },
            emitOpenModal() {
                this.$emit('openModal');
            },
            emitCloseModal() {
                this.$emit('closeModal');
            },
            clearAllFlags() {
                for (let i=0;i<this.flags.length;i++) {
                    this.flags[i] = false;
                }
                this.valid = true;
                this.msg = '';
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
            &:hover {
                color: rgb(86, 187, 209);
            }
            &:active {
                color: rgb(54, 117, 131);
            }
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
                width: 80px;
                align-items: center;
                justify-content: flex-end;
                font-weight: bold;
                margin-right: 10px;
            }
            input, select {
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
                flex: 0 80px;
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
        margin: 1px 5px;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        text-indent: 0px;
        text-shadow: none;
        display: flex;
        justify-content: center;
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
    .btn-red {
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
        &:hover {
            background-color: #ba2c3a;
            border-color: #ba2c3a;
        }
        &:active {
            background-color: #8d212c;
            border-color: #8d212c;
        }
    }
    .btn-loading {
        background-color: #808080 !important;
        border-color: #808080 !important;
    }
    .msg-box {
        background-color: rgb(255, 115, 115);
        color: white;
        padding: 5px 20px;
        margin: 0px 16px;
        overflow: hidden;
        opacity: 0.6;
        border-radius: 6px;
    }
</style>

