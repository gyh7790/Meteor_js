<template>
 <el-tag
    v-bind="$attrs"
    :hit='true'
    effect="dark">
    {{ dictLabel +'-'+ getDictLabel11}}
  </el-tag>
</template>


<script>
  import {mapState, mapActions } from 'vuex'

  export default {
    name: 'DictList',
    props: {
      dictType: {
        type: String,
        required: true
      },
      dictValue: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dictLabel: ''
      }
    },
    computed: {
      getDictLabel11 () {
        const dictDataList = this.dictData['url_type']
        console.log("---------->", dictDataList)
        if (dictDataList && dictDataList.value && dictDataList.value.length > 0) {
            const dict = Array.from(this.dictData.value).find(e =>e.value == this.dictValue)
             console.log('dict')
            console.log(dict)
            return dict.label || ''
        }
        return ''
      },
      ...mapState('dict', [
        'dictData'
      ])
    },
    watch: {
      getDictLabel11: 'setDictList'
    },
    async created() {
      await this.fetch(this.dictType)
      await this.getDictDataLabel()
    },
    methods: {
      async setDictList() {
        await Promise.resolve(this.fetch(this.dictType)).then((res)=>{
          console.log('==44444444444=>',res)
          this.getDictDataLabel()
        })
      },
      async getDictDataLabel(){
        await this.getDictLabel({dictType:this.dictType,dictValue: this.dictValue});
        console.log('==888888888888888=>')
      },
      ...mapActions('dict', {
        fetch: 'fetch',
        getDictLabel: 'getDictLabel'
      }),

    }
  }
</script>