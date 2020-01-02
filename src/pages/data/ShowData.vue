
<template>
<div>

  <div id="myChart" :style="{width: '800px', height: '300px'}"></div>
  <div id="myChart123" :style="{width: '800px', height: '300px'}"></div>
</div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data() {
    return {
      
    }
  },
  mounted() {
    this.drawLine("myChart");
    this.drawLine("myChart123");
  },
  methods: {
    drawLine(divName){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(divName))
        // 图表得相关信息
         let option = {
            backgroundColor:'#323a5e',
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top:'16%',
            containLabel: true
            },
            legend: {
                data: ['1', '2'],
                right: 10,
                top:12,
                textStyle: {
                    color: "#fff"
                },
                itemWidth: 12,
                itemHeight: 10,
                // itemGap: 35
            },
            xAxis: {
                type: 'category',
                data: ['00：00','01：00','02：00','03：00','04：00','05：00','06：00','07：00','08：00','09：00','10：00','11：00',
                        '12：00','13：00','14：00','15：00','16：00','17：00','18：00','19：00','20：00','21：00','22：00','23：00'],
                axisLine: {
                    lineStyle: {
                    color: 'white'

                    }
                },
                axisLabel: {
                    // interval: 0,
                    // rotate: 40,
                    textStyle: {
                    fontFamily: 'Microsoft YaHei'
                    }
                },
            },
            yAxis: {
                type: 'category',
                //max:'100',
                data: ['无','有'],
                axisLine: {
                    show: false,
                    lineStyle: {
                    color: 'white'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                    }
                },
                axisLabel: {}
            },
            "dataZoom": [{
                "show": true,
                "height": 12,
                "xAxisIndex": [
                    0
                ],
                bottom:'8%',
                "start": 10,
                "end": 90,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle:{
                    color:"#d3dee5",

                },
                textStyle:{color:"#fff"},
                borderColor:"#90979c"
                }, 
                {
                "type": "inside",
                "show": true,
                "height": 15,
                "start": 1,
                "end": 35
                }
            ],
            series: [{
                name: '1',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#fccb05'
                        }, {
                            offset: 1,
                            color: '#f5804d'
                        }]),
                        barBorderRadius: 12,
                    },
                },
                data: [0, 0, 0, 0, 0, 0, 0, 1, 0]
            },
            {
                name: '2',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8bd46e'
                        }, {
                            offset: 1,
                            color: '#09bcb7'
                        }]),
                        barBorderRadius: 11,
                    }
                },
                data: ['无', '无', '无', '无', '无', '无', '无', '有', '无']
            }]
         };
        // 绘制图表
        myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
    
</style>

