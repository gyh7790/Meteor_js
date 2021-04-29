<template>
 <font
    v-bind="$attrs"
    :hit='true'
    effect="dark">
    {{ dictLabel }}
  </font>
</template>


<script>
  import {mapState, mapActions } from 'vuex'

  export default {
    name: 'DictItem',
    props: {
      dataList: {
        type: Array,
        required: false
      },
      dictType: {
        type: String,
        required: false
      },
      dictValue: {
        type: [Number,String],
        required: true
      }
    },
    data() {
      return {
        dictDatas: {}
      }
    },
    computed: {
      dictLabel: function () {
        let dictLabel = ''
        if (this.dataList && this.dataList.length > 0) {
            const dict = Array.from(this.dataList).find(e =>e.value == this.dictValue)
            dictLabel = dict ? dict.label || '' : ''
        }
        if (this.dictType) {
          const dictDataList = this.dictData[this.dictType]
          if (dictDataList && dictDataList.length > 0) {
              const dict = Array.from(dictDataList).find(e =>e.value == this.dictValue)
              dictLabel = dict ? dict.label || '' : ''
          }
        }
        return dictLabel
      },
      ...mapState('dict', [
        'dictData'
      ])
    },
    async created() {
      await this.fetch(this.dictType)
    },
    methods: {
      ...mapActions('dict', {
        fetch: 'fetch',
        getDictLabel: 'getDictLabel'
      }),

    }
  }
</script>