<template>
  <el-menu
      router
      unique-opened
      :default-active="defaultActive"
      text-color="#fff"
      background-color="#304156"
      :default-openeds="['/web']"
      active-text-color="#73cb08">
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">系统首页</span>
    </el-menu-item>
    <el-menu-item index="/user" v-if="role===3">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户列表</span>
    </el-menu-item>
    <el-submenu index="/web">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>社区管理</span>
      </template>
      <el-menu-item index="/article">文章列表</el-menu-item>
      <el-menu-item index="/tag">标签管理</el-menu-item>
      <el-menu-item index="/link">友链管理</el-menu-item>
      <el-menu-item index="/type">类别管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  computed: {
    defaultActive() {
      return this.$route.path
    },
    role() {
      return this.$store.state.user.info.role
    }
  }
}
</script>
<style scoped lang="scss">
.el-menu {
  width: $app-aside-width;
  height: 100%;
}

::v-deep .el-submenu .el-menu-item {
  min-width: 100%;
}
</style>