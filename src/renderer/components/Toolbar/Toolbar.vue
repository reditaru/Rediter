<template>
  <div id="toolbar" >
      <div class="flex-item header"></div>
      <div class="flex-item section" @click="collapse">
            <Icon class="icon" name="bars" scale="1.0"></Icon>
      </div>
      <div class="flex-item section">
            <Icon class="icon" name="plus" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >New Feed</span>
      </div>
      <div class="flex-item section">
            <Icon class="icon" name="user-o" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >Account</span>
      </div>
      <div class="category">
        <div class="flex-item section">
            <Icon class="icon" name="folder-o" scale="1.0"></Icon>
            <span v-show="!collapsed" class="title" >Category</span>
        </div>
        <div v-if="!collapsed" class="flex-item sub-item">
            <Icon class="icon" name="plus" scale="1.0"></Icon>
            <span class="title" >New Category</span>
        </div>
        <FeedList v-for="category in categories" 
            :key="category.id" 
            :feeds="feeds[category.id]"
            :collapsed="collapsed"
            :category="categories[category.id]"
            :selected="category.id == currentCategory"
            @select="selectCategory"
            @update="updateCategory"
            @remove="removeCategory"
            :ref="category.id">
        </FeedList>
      </div>
  </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import FeedList from '../FeedList/FeedList'
    import { mapState } from 'vuex'
    import "vue-awesome/icons/bars"
    import "vue-awesome/icons/plus"
    import "vue-awesome/icons/user-o"
    import "vue-awesome/icons/folder-o"

    export default {
        name: "Toolbar",
        components: {
            Icon, FeedList
        },
        data() {
            return {
                collapsed: false
            }
        },
        computed: {
            ...mapState({
                currentCategory: state => state.Category.currentCategory,
                categories: state => state.Category.categories,
                feeds: state => state.Feed.feeds,
                loading: state => state.Category.loading,
                status: state => state.Category.status,
                msg: state => state.Category.msg,
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
            updateCategory() {

            },
            removeCategory(id) {

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
</style>

