
Use /* eslint-disable */ to ignore all warnings in a file.
<template>
  <div class='hello'>
    <div style="width:100%;height: 450px;">
    <!-- <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in img_list" :key="item">
      <h3><img src="http://g.hiphotos.baidu.com/zhidao/pic/item/c83d70cf3bc79f3d6e7bf85db8a1cd11738b29c0.jpg" alt=""></h3>
    </el-carousel-item>
  </el-carousel> -->
     <el-carousel :interval="2000" arrow="always" height="450px">
        <el-carousel-item v-for="item in img_list" :key="item.id">
           <img :src="item.idView" class="image">        
        </el-carousel-item>
      </el-carousel>

      </div>
    <div id='chart1' :style="{width:'500px',height:'300px'}"></div>
  </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
      img_list:[
      {id:0,idView:require("../../assets/images/009.png")},
      {id:1,idView:require("../../assets/images/010.png")},
      {id:2,idView:require("../../assets/images/011.png")}
      ]
    }
  },
  mounted() {
    let that = this
    this.drawLine()
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById('chart1'))
      myChart.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            itemStyle: {
              normal: {
                // 阴影的大小
                shadowBlur: 200,
                // 阴影水平方向上的偏移
                shadowOffsetX: 0,
                // 阴影垂直方向上的偏移
                shadowOffsetY: 0,
                // 阴影颜色
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              { value: 400, name: '搜索引擎' },
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

