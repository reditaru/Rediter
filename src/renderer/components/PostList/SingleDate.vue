<template>
    <div class="date">
        {{date}}
    </div>
</template>

<script>
    export default {
        name: 'SingleDate',
        props: ['date']
    }
</script>

<style lang="less" scoped>
    .date {
        display: flex;
        align-items: center;
        height: 45px;
        padding-left: 25px;
        cursor: default;
        background-color: #f9f9f9;
        border: 1px solid #e6e6e6;
        border-left: 0px;
        border-right: 0px;
        font-size: 14px;
    }
</style>
