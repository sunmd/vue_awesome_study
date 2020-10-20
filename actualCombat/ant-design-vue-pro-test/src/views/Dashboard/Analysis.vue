<template>
  <Chart :options="chartOption" style="height: 400px;" />
</template>

<script>
import Chart from "../../components/Chart";
import request from "../../utils/request";
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        /* 下面的可以出现报错提示 */
        /* url: "/api/dashboard/chart1", */
        method: "get",
        params: { ID: 123456 }
      }).then(response => {
        console.log("this is response:", response.data);
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data
            }
          ]
        };
      });
    }
  },
  mounted() {
    this.chartOption = this.getChartData();
    this.interval = setInterval(() => {
      this.chartOption = this.getChartData();
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.interval = null;
  },
  components: {
    Chart
  }
};
</script>

<style></style>
