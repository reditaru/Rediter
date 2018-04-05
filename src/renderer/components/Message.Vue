<template>
    <div class="message" v-if="alert.visible">
        <div :class="['container', typeClass]">
            <Icon class="icon" :name="iconName" scale="1.3"></Icon>
            {{ alert.message }}
        </div>
    </div>
</template>


<script>
    import Icon from "vue-awesome/components/Icon"
    import "vue-awesome/icons/info-circle"
    import "vue-awesome/icons/times-circle"
    import "vue-awesome/icons/check-circle"
    export default {
        name: 'Message',
        components: {
            Icon
        },
        props: {
            alert: {
                type: Object,
                defalut: {
                    type: 'default',
                    message: '',
                    visible: false
                }
            }
        },
        computed: {
            typeClass() {
                switch (this.alert.type) {
                    case 'success':
                    case 'fail':
                        return this.alert.type;
                    default:
                        return 'defalut';
                }
            },
            iconName() {
                switch (this.alert.type) {
                    case 'success':
                        return 'check-circle';
                    case 'fail':
                        return 'times-circle';
                    default:
                        return 'info-circle';
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    .message {
        position: fixed;
        top: 80px;
        display: flex;
        justify-content: center;
        z-index: 2;
        width: 100%;
        animation: fade-in .8s;
    }
    .container {
        color: white;
        padding: 5px 20px;
        margin: 0px 16px;
        overflow: hidden;
        border-radius: 6px;
        display: flex;
        align-items: center;
        font-size: 18px;
        .icon {
            margin-right: 5px;
        }
    }
    .default {
        background-color: #3a3a3a;
    }
    .success {
        background-color: #28a745;
    }
    .fail {
        background-color: #dc3545;
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>
