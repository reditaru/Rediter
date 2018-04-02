<template>
    <div class="post">
        <aside class="status"></aside>
        <article>
            <div class="title">{{ post.title }}</div>
            <div class="description">
                {{ post.description }}
            </div>
        </article>
        <aside class="created">
            {{ post.created }}
        </aside>
    </div>
</template>

<script>
    export default {
        name: 'SinglePost',
        props: {
            post: {
                type: Object,
                default: () => {
                    return {
                        title: 'Default Title',
                        description: 'Default description',
                        created: '2018-04-01',
                        status: false
                    };
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {
            displayPost() {

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
        .status {
            margin-right: 23px;
            width: 2px;
            height: 100%;
            background-color: lightblue;
        }
        article {
            display: flex;
            flex: 1;
            flex-direction: column;
            .title {
                font-size: 18px;
                overflow: hidden;
            }
            .description {
                font-size: 15px;
                text-overflow: clip;
                overflow: hidden;
                color: grey;
                flex:0 50px;
            }
        }
        aside {
            width: 100px;
            padding-left: 5px;
            display: inline-flex;
            justify-content: center;
        }
        &:hover {
            background-color: #f3f3f3;
        }
        &:active {
            background-color: #ddedf9;
        }
    }
</style>
