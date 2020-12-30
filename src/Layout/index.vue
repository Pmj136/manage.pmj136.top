<template>
  <div class="layout">
    <aside class="jiu-aside">
      <jiu-menu/>
    </aside>
    <section class="jiu-show-container">
      <jiu-header/>
      <transition name="slide-right">
        <router-view/>
      </transition>
    </section>
    <el-backtop :visibility-height="150" target=".jiu-show-container"></el-backtop>
  </div>
</template>
<script>
import JiuMenu from "./JiuMenu"
import JiuHeader from "./JiuHeader"

export default {
  components: {JiuMenu, JiuHeader},
}
</script>
<style scoped lang="scss">
.layout {
  height: 100%;
  display: flex;
}

.jiu-aside {
  width: $app-aside-width;
  height: 100%;
}

.jiu-show-container {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

[class^=jiu-page--] {
  width: 100%;
}

.slide-right-enter-active{
  transition: all 500ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-10%);
}
</style>