<template>
    <div :class="[{ 'post-active': active }, postClass]" @click="select">
        <aside :class="[ post.status? 'read' : 'not-read' ]" ></aside>
        <article>
            <div class="title" :title="post.title"><span>{{ post.title }}</span></div>
            <div class="summary">
                {{ content }}
            </div>
        </article>
        <aside class="created">
            {{ date }}
        </aside>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'SinglePost',
        props: {
            post: {
                type: Object,
                default: () => {
                    return {
                        title: 'Default Title',
                        description: 'Default description',
                        date: '2018-04-01',
                        status: false
                    };
                }
            },
            active: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                postClass: 'post',
            }
        },
        computed: {
            content() {
                return this.post.summary.replace(/<\/?[^>]*>/g,"");
            },
            date() {
                return moment(this.post.date).fromNow();
            }
        },
        methods: {
            select() {
                this.$emit('select', this.post.link);
            }
        }
    }
</script>

<style lang="less" scoped>
    .post {
        display: flex;
        align-items: center;
        height: 90px;
        cursor: default;
        border: 1px solid #eeeeee;
        border-left: 0px;
        border-right: 0px;
        .not-read {
            margin-right: 23px;
            width: 2px;
            height: 100%;
            background-color: lightblue;
        }
        .read {
            margin-right: 25px;
        }
        article {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0px;
            padding: 5px 0px;
            .title {
                font-size: 16px;
                font-weight: bold;
                flex: 0 25px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .summary {
                font-size: 15px;
                text-overflow: clip;
                overflow: hidden;
                color: grey;
                flex:0 50px;
            }
        }
        aside {
            padding-left: 5px;
            font-size: 12px;
            text-align: center;
            overflow: hidden;
            color: #808080;
        }
        .created {
            width: 100px;
        }
        &:hover {
            background-color: #f3f3f3;
        }
        &:active {
            background-color: #ddedf9;
        }
    }
    .post-active {
        background-color: #ddedf9;
        &:hover {
            background-color: #ddedf9;
        }
    }
</style>
