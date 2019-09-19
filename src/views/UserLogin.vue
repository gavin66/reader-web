<template>
  <div>
    <group>
      <x-input title="邮箱" type="text" v-model="form.email" is-type="email" ref="email"></x-input>
      <x-input title="密码" type="password" v-model="form.password" :min="6" ref="password" @keyup.enter.native="handleLogin"></x-input>
    </group>
    <x-button type="primary" @click.native="handleLogin" :show-loading="loading">登录</x-button>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'

export default {
  components: { Group, XInput, XButton },
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  methods: {
    handleLogin() {
      if (
        this.form.email.length &&
        this.form.password.length &&
        this.$refs.email.valid &&
        this.$refs.password.valid
      ) {
        this.loading = true

        this.$store
          .dispatch('user/login', this.form)
          .then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.loading = false
        this.$vux.toast.text('填写错误', 'middle')
      }
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
