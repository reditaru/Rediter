<template>
    <div id="app">
        <router-view></router-view>
        <Message :alert="alert"></Message>
    </div>
</template>

<script>
  export default {
    name: 'rediter',
    data() {
      return {
        alert: {
          message: '',
          type: 'default',
          visible: false
        }
      }
    },
    created() {
        this.$root.$on('showAlert', ({ type, message, duration }) => {
          this.alert.type = type;
          this.alert.message = message;
          this.alert.visible = true;
          setTimeout(() => {
            this.alert.visible = false;
          }, duration || 1500);
        });
    }
  }
</script>

<style>
  /* CSS */
</style>
