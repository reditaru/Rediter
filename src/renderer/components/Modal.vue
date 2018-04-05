<template>
    <div ref="mask" :class="[active? 'active':'', 'modal']" >
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            active: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        computed:{
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>
    .modal {
        display: none;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.4);
        .modal-content {
            color: black;
            background-color: white;
            padding: 20px 20px;
            z-index: 2;
            border-radius: 5px;
        }
    }
    .active {
        display: flex;
    }
</style>
