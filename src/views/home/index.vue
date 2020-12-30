<template>
  <main class="jiu-page--home">
    <div class="chart-group">
      <jiu-chart height="240px" :config="config.totalUser" c-id="pie-user"/>
      <jiu-chart height="240px" :config="config.totalArticle" c-id="pie-article"/>
      <jiu-chart height="240px" :config="config.sexConfig" c-id="pie-sex"/>
    </div>
    <jiu-chart style="margin: 26px" :config="config.lineConfig" c-id="line"/>
  </main>
</template>
<script>
import JiuChart from "@/components/JiuChart"
import {generateConfig} from "./config";
import {getHomeData} from "@/api/app"

export default {
  components: {JiuChart},
  data() {
    return {
      config: {
        totalUser: null,
        totalArticle: null,
        sexConfig: null,
        lineConfig: null
      }
    }
  },
  created() {
    getHomeData().then(res => {
      Object.assign(this.config, generateConfig(res.data))
    })
  },
}
</script>
<style scoped lang="scss">
.chart-group {
  display: flex;
  justify-content: space-around;
  margin: $gap;
}

.chart-group > * {
  width: 28%;
  margin-right: $gap;
}

.chart-group > *:last-child {
  width: 44%;
  margin-right: 0;
}
</style>