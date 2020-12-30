<template>
  <header class="jiu-header">
    <div class="header-left">
      <span class="page-title">{{ title }}</span>
    </div>
    <div class="header-right">
      <span>你好<span style="color: red;margin: 0 10px">{{ roles[userRole] }}</span></span>
      <el-dropdown :show-timeout="30" trigger="hover" @command="handleCommand">
        <div class="dropdown-title">
          <el-avatar :src="userAvatar"></el-avatar>
          <svg-icon icon="downpull"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
const {mapState} = Vuex
export default {
  data() {
    return {
      roles: {
        2: '管理员',
        3: '超级管理员'
      },
    }
  },
  computed: {
    ...mapState({
      userAvatar: state => state.user.info.avatar_url,
      userRole: state => state.user.info.role
    }),
    title() {
      return this.$route.meta.title
    },
  },
  methods:{
    handleCommand(command) {
      switch (command) {
        case "exit":
          this.$confirm('将退出系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.$store.dispatch("user/logout").then(() => {
              this.$router.replace("/login")
            })
          }).catch(e => {
          })
          break;
      }
    },
  }
}
</script>
<style scoped lang="scss">
.jiu-header {
  padding: 0 15px;
  box-sizing: border-box;
  height: $app-header-height;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.header-left, .header-right {
  height: 100%;
  display: flex;
  align-items: center;
}

.page-title {
  color: #666;
  font-size: .95rem;
  letter-spacing: 1px;
}

.dropdown-title {
  cursor: pointer;
  display: flex;
  align-items: center;
}

</style>