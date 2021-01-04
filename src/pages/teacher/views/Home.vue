<template>
  <div class="home">
    <div>教师页面</div>
    <span>账号</span><input v-model="username" type="text">
    <span>密码</span><input v-model="password" type="text">
    <button @click="login">登陆</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const loginForm = {
        username: this.username,
        password: this.password,
        role: 'student'
      }
      this.$store.dispatch('user/login', loginForm).then(() => {
        this.$store.dispatch('user/getInfo').then(() => {
          this.username = ''
          this.password = ''
          this.$router.push({ path: 'about' })
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
