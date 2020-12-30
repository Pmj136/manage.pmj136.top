<template>
  <div class="jiu-chart">
    <div :id="cId" :style="chartStyle"></div>
  </div>
</template>
<script>
export default {
  props: {
    cId: String,
    config: Object,
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: '450px'
    }
  },
  data() {
    return {
      instance: null,
    }
  },
  computed: {
    chartStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.resetRender);
    const dom = document.getElementById(this.cId)
    this.instance = echarts.init(dom);
  },
  watch: {
    config() {
      this.instance.setOption(this.config);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resetRender);
    this.instance = null
  },
  methods: {
    resetRender() {
      this.instance.resize();
    }
  }
}
</script>
<style lang="scss" scoped>
.jiu-chart {
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>