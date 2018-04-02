<template>
    <div :class="[feedClass, { 'feed-active':active } ]" @click="select">
        <div class="name">{{ feed.name }}</div>
        <Icon class="icon" name="trash-o" scale="1.0" @click.native="remove"></Icon>
    </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon"
    import "vue-awesome/icons/trash-o"
    export default {
        name: 'SingleFeed',
        components: {
            Icon
        },
        props: {
            feed: {
                type: Object,
                default: () => {
                    return {
                        id: 0,
                        name: 'Defalut Feed'
                    }
                }
            },
            active: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                feedClass: 'feed'
            }
        },
        methods: {
            remove(e) {
                this.$emit('remove', this.feed.id);
                e.stopPropagation();
            },
            select() {
                this.$emit('select', this.feed.id);
            }
        }
    }
</script>

<style lang="less" scoped>
    .feed {
        display: flex;
        align-items: center;
        padding-left: 45px;
        height: 30px;
        cursor: default;
        font-size: 14px;
        color: white;
        &:hover {
            background: white;
            color: black;
            opacity: 0.6;
        }
        .name {
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
        &:active {
            background: grey;
            color: black;
            opacity: 0.8;
        }
    }
    .feed-active {
        background: white;
        color: black;
        opacity: 0.6;
    }
</style>
