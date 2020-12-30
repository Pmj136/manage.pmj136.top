<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.dispatch("user/auth").catch(e => {
      this.$router.replace("/login")
    })
  },
};
</script>
<style lang="scss">
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Comic Sans MS";
  background-color: $app-main-bg-color;
}
</style>