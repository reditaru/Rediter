<template>
  <div id="toolbar" >
      <div class="flex-item header"></div>
      <div class="flex-item section" @click="collapse">
            <Icon class="icon" name="bars" scale="1.0"></Icon>
      </div>
      <div class="flex-item section">
            <Icon class="icon" name="plus" scale="1.0"></Icon>
            <span v-if="!collapsed" class="title" >New Feed</span>
      </div>
      <div class="flex-item section">
            <Icon class="icon" name="user-o" scale="1.0"></Icon>
            <span v-if="!collapsed" class="title" >Account</span>
      </div>
      <div class="category">
        <div class="flex-item section">
            <Icon class="icon" name="folder-o" scale="1.0"></Icon>
            <span v-if="!collapsed" class="title" >Category</span>
        </div>
        <div v-if="!collapsed" class="flex-item sub-item">
            <Icon class="icon" name="plus" scale="1.0"></Icon>
            <span class="title" >New Category</span>
        </div>
      </div>
  </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import { mapState } from 'vuex'
    import "vue-awesome/icons/bars"
    import "vue-awesome/icons/plus"
    import "vue-awesome/icons/user-o"
    import "vue-awesome/icons/folder-o"

    export default {
        name: "Toolbar",
        components: {
            Icon
        },
        data() {
            return {
                collapsed: false
            }
        },
        computed: {
            ...mapState({
                categories: state => state.Category.categories,
                loading: state => state.Category.loading,
                status: state => state.Category.status,
                msg: state => state.Category.msg,
            })
        },
        methods: {
            collapse(){
                this.collapsed = !this.collapsed;
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
        .sub-item {
            padding-left: 15px;
            &:hover {
                background-color: white;
                color: black;
                opacity: 0.5;
            }
        }
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
</style>

