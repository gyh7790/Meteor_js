<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons' // echarts theme
import 'echarts/map/js/province/henan'
import resize from '@/api/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title : {
        text: '河南地图',
        left: 'left'
        },
        tooltip : {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : false
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          }
        },
        toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name: '使用量',
                type: 'map',
                mapType: '河南',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '郑州市',value: Math.round(Math.random()*1000)},
                    {name: '开封市',value: Math.round(Math.random()*1000)},
                    {name: '商丘市',value: Math.round(Math.random()*1000)},
                    {name: '周口市',value: Math.round(Math.random()*1000)},
                    {name: '三门峡市',value: Math.round(Math.random()*1000)},
                    {name: '洛阳市',value: Math.round(Math.random()*1000)},
                    {name: '平顶山市',value: Math.round(Math.random()*1000)},
                    {name: '安阳市',value: Math.round(Math.random()*1000)},
                    {name: '鹤壁市',value: Math.round(Math.random()*1000)},
                    {name: '新乡市',value: Math.round(Math.random()*1000)},
                    {name: '焦作市',value: Math.round(Math.random()*1000)},
                    {name: '濮阳市',value: Math.round(Math.random()*1000)},
                    {name: '许昌市',value: Math.round(Math.random()*1000)},
                    {name: '漯河市',value: Math.round(Math.random()*1000)},
                    {name: '南阳市',value: Math.round(Math.random()*1000)},
                    {name: '商丘市',value: Math.round(Math.random()*1000)},
                    {name: '信阳市',value: Math.round(Math.random()*1000)},
                    {name: '驻马店市',value: Math.round(Math.random()*1000)},
                    {name: '荥阳市',value: Math.round(Math.random()*1000)},
                    {name: '濮阳市',value: Math.round(Math.random()*1000)},
                    {name: '信阳市',value: Math.round(Math.random()*1000)},
                    {name: '济源市',value: Math.round(Math.random()*1000)}
                ]
            }
        ]})
    }
  }
}
</script>
