<template>
  <div class="jiu-page--login">
    <div class="jiu-card login-box">
      <div class="jiu-card-body">
        <el-form>
          <h2 style="margin-bottom: 2rem">系统登录</h2>
          <el-form-item size="large">
            <el-input v-model="form.email" placeholder="账号">
              <template #prefix>
                <svg-icon icon="user"/>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-input show-password v-model="form.password" placeholder="密码" autofocus>
              <template #prefix>
                <svg-icon icon="pwd"/>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button :loading="isLoginIng" type="info" style="width:100%" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      isLoginIng: false,
      form: {
        email: "1367559786@qq.com",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.isLoginIng = true
      const params = {
        email: this.form.email,
        password: md5(this.form.password)
      }
      this.$store.dispatch("user/login", params).then(() => {
        this.$router.replace("/home")
      }).catch(e => {
      }).finally(() => {
        this.isLoginIng = false
      })
    }
  }
};
</script>
<style scoped lang="scss">

.jiu-page--login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 100%;
  user-select: none;
  background-image: url("~@/assets/bg.jpg");
}

.login-box {
  width: 340px;
}

.jiu-card-body {
  padding: 0 20px 20px;
}


::v-deep .el-input__prefix {
  display: flex;
  align-items: center;
}
</style>
