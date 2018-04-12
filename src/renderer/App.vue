<template>
    <div id="app">
        <router-view></router-view>
        <Message :alert="alert"></Message>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
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
    computed: {
      ...mapState({
        test: state => state.Category.test,
        isLogin: state => state.Auth.isLogin,
        msg: state => state.Category.msg
      })
    },
    watch: {
      test(newValue, oldValue) {
        if(!newValue && oldValue && !this.isLogin) {
          let type = 'fail';
          let msg =  this.msg;
          this.$root.$emit('showAlert', { type: type, message: msg, duration: 3000});
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
        window.onbeforeunload = (e) => {
          this.$store.dispatch('Post/saveToLocal');
        }
    }
  }
</script>

<style>
  /* CSS */
</style>
