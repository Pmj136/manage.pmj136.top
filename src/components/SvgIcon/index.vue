<template>
  <svg class="svg-icon" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  fill: currentColor;
  overflow: hidden;
}
</style>
