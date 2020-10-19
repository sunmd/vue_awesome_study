<template>
  <div ref="echartDom"></div>
</template>

<script>
// 导入echart
import echarts from "echarts";
// 导入检测resize
import { addListener, removeListener } from "resize-detector";
// 防抖效果的应用
import debounce from "lodash/debounce";

export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    options(val) {
      console.log("watch");
      console.log(val);
      if (val !== undefined) {
        this.chart.setOption(val);
      }
    }
    // 深度的扫描消耗不少
    /* options: { */
    /*   handler(val) { */
    /*     this.chart.setOption(val); */
    /*   }, */
    /*   deep: true */
    /* } */
  },
  created() {
    // 添加防抖应用
    this.resize = debounce(this.resize, 300);
  },
  mounted: function() {
    // 画chart
    this.renderChart();
    // 添加窗口的镜像
    addListener(this.$refs.echartDom, this.resize);
  },
  beforeDestroy: function() {
    removeListener(this.$refs.echartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.echartDom);
      // 绘制图表
      this.chart.setOption(this.options);
    }
  }
};
</script>

<style></style>
