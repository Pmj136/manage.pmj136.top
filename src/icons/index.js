import Vue from "vue";
import SvgIcon from "@/components/SvgIcon";

Vue.component("svg-icon", SvgIcon);

const svgs = require.context("./svg", false, /.svg$/);
svgs.keys().map(v => svgs(v));
