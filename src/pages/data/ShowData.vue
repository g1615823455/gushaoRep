
<template>
<div>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期">
  </el-date-picker><el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
  <div id="myChart" :style="{width: '100%', height: '250px'}"></div>
  <div id="myChart123" :style="{width: '100%', height: '250px'}"></div>
  <div id="myChart996" :style="{width: '100%', height: '250px'}"></div>
</div>
</template>
<script>
import echarts from 'echarts'
import {mapState,mapActions,mapGetters} from 'vuex'
import { isNull } from 'util';
export default {
  name: 'hello',
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
      },
      coo: [635, 635, 635, 1800, 635, 635,666,633,600,620,635,670,635, 635, 635, 800, 635, 635,666,633,600,620,635,670 ],
      lel: [0, 0, 1, 0, 1, 0, 0, 1, 0],
      somke: [0, 0, 1, 0, 1, 1, 0, 1, 1],
      tem: [53, 66, 54, 61, 44,66, 54, 61,55,53, 66, 54, 61, 44,66, 54, 61,55,61, 44,66, 54, 61,55 ],
      hum: [23, 17, 28,23, 17, 28,23, 17, 28,23, 17, 28,23, 17, 28,23, 17, 28,23, 17, 28,23, 17, 28] ,    
      xdata: ['00：00','01：00','02：00','03：00','04：00','05：00','06：00','07：00','08：00','09：00','10：00','11：00',
                        '12：00','13：00','14：00','15：00','16：00','17：00','18：00','19：00','20：00','21：00','22：00','23：00'],
      value1: '',
    }
  },
  mounted() {
    this.drawLine("myChart",this.xdata,this.lel,this.somke);
    this.drawLine2("myChart123",this.xdata,this.coo);
    this.drawLine3("myChart996",this.xdata,this.tem,this.hum);
  },
  methods: {
    ...mapActions('reportForm',['gFireData',]),
    // 向后台发送数据请求
    search() {
        let ti=this.value1;
        if(ti.length!=0){
            this.gFireData(ti).then(res =>{
                this.drawLine("myChart",this.xdata,res.lel,res.smoke);
                this.drawLine2("myChart123",this.xdata,res.coo);
                this.drawLine3("myChart996",this.xdata,res.temperature,res.humidity);
            });
        }else{
          this.$alert('请选择查询日期', '查询日期为空', {
          confirmButtonText: '确定',
          });
        }
        
    },
    drawLine(divName,xData,lel,somke){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(divName))
        // 图表得相关信息
         let option = {
            // backgroundColor:'#323a5e',
            backgroundColor:'#0d235e',
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
                data: ['烟雾', '可燃气体'],
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
                data: xData,
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
                type:'value',
                // type: 'category',
                // max:'1',
                data: [0,1],
                axisLine: {
                    show: false,
                    lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                    }
                },
                axisLabel: {
                    show: false,
                    lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                    }
                }
            },

            series: [{
                name: '可燃气体',
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
                // data: [0, 0, 1, 0, 1, 0, 0, 1, 0]
                data: lel
            },
            {
                name: '烟雾',
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
                // data: [0, 0, 1, 0, 1, 1, 0, 1, 1]
                data: somke
            }]
         };
        // 绘制图表
        myChart.setOption(option);
    },
    drawLine2(divName,xData,c2){
        let myChart = this.$echarts.init(document.getElementById(divName))
        let option = {
            // backgroundColor: '#080b30',
            backgroundColor:'#0d235e',
            title: {
                text: '二氧化碳浓度',
                textStyle: {
                    align: 'center',
                    color: '#fff',
                    fontSize: 12,
                },
                top: '5%',
                // left: 'right',
                right: '5%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0, 255, 233,0)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(255, 255, 255,1)',
                            }, {
                                offset: 1,
                                color: 'rgba(0, 255, 233,0)'
                            }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '15%',
                left: '5%',
                right: '5%',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true
                },
                splitArea: {
                    // show: true,
                    color: '#f00',
                    lineStyle: {
                        color: '#f00'
                    },
                },
                axisLabel: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: xData,

            }],

            yAxis: [{
                type: 'value',
                min: 0,
                // max: 140,
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    margin: 20,
                    textStyle: {
                        color: '#d1e6eb',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                    name: '注册总量',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 20,
                    lineStyle: {
                        normal: {
                            color: "#6c50f3",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#6c50f3',
                        }
                    },
                    itemStyle: {
                        color: "#6c50f3",
                        borderColor: "#fff",
                        borderWidth: 3,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    tooltip: {
                        show: false
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(108,80,243,0)'
                                }
                            ], false),
                            shadowColor: 'rgba(108,80,243, 0.9)',
                            shadowBlur: 20
                        }
                    },
                    // data: [635, 635, 635, 1800, 635, 635, ]
                    data:c2
                },
        
            ]
        };
        // 绘制图表
        myChart.setOption(option);
    },
    drawLine3(divName,xData,temperature,humidity){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(divName));
        let charts = {
            unit: '温/湿度',
            names: ['湿度', '温度'],
            lineX: xData,
            value: [
                temperature,humidity
                // [53, 66, 54, 61, 44,66, 54, 61, ],
                // [23, 17, 28,23, 17, 28,23, 17, 28]
            ]
        };
        let color = ['rgba(23, 255, 243', 'rgba(119,61,190'];
        let lineY = [];

        for (let i = 0; i < charts.names.length; i++) {
            let x = i;
            if (x > color.length - 1) {
                x = color.length - 1;
            }
            let data = {
                name: charts.names[i],
                type: 'line',
                color: color[x] + ')',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[x] + ', 0.3)'
                        }, {
                            offset: 0.8,
                            color: color[x] + ', 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                symbol: 'circle',
                symbolSize: 5,
                data: charts.value[i]
            };
            lineY.push(data);
        };

        let option = {
            backgroundColor:'#0d235e',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: charts.names,
                textStyle: {
                    fontSize: 12,
                    color: 'rgb(0,253,255,0.6)'
                },
                right: '4%'
            },
            grid: {
                top: '14%',
                left: '4%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: charts.lineX,
                axisLabel: {
                    textStyle: {
                        color: 'rgb(0,253,255,0.6)'
                    },
                    formatter: function(params) {
                        return params.split(' ')[0] 
                    }
                }
            },
            yAxis: {
                name: charts.unit,
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'rgb(0,253,255,0.6)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgb(23,255,243,0.3)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(0,253,255,0.6)'
                    }
                }
            },
            series: lineY
        };
        // 绘制图表
        myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
    
</style>

