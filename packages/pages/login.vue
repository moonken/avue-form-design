<template>
<div class="container">
  <avue-login :option="option" @submit="submit">
  </avue-login>
</div>
</template>

<script>
export default {
  name: "login",
  props: {label: String, value: {type: String, default:''}},
  data() {
    return {
      option: {
        width: 400,
        time: 60,
        codeType: 'phone', //phone为手机验证码/img为图片验证码
        column: {
          username: {
            // hide: true,
            label: '用户名',
            // prop: 'user',
            // placeholder:'',
            autocomplete: 'off',
            rules: { required: true, message: '请输入用户名', trigger: 'blur' }
          },
          password: {
            label: '密码',
            // prop: 'pass',
            // placeholder:'',
            autocomplete: 'off',
            rules: { required: true, message: '请输入密码', trigger: 'blur' }
          },
          code: {
            hide: true
          }
        }
      },
    }
  },
  methods: {
    submit(form) {
      this.$axios.post('/public/login', form).then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token)
        this.$router.push({
          path: `/spaces`,
        })
      }).catch(err => {
        console.log(err);
        this.$message.error("登录失败")
      })
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 20vh auto;
  }
</style>