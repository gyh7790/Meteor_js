<template>
    <el-select v-model="value" @change="handleSelectChange" filterable placeholder="请选择">
      <el-option
      v-for="item in dictDatas"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span v-if="isValue" style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'DictItem',
    props: {
      dictData: {
        type: Array
      },
      dictType: {
        type: String,
        required: true
      },
      isValue: {
        type: Boolean,
        default: false
      }
    },
    // computed: {
    //   dictDatas: {
    //     get() {
    //       return this.dictData
    //     },
    //     set(val) {
    //       this.$emit('update:dictData', val)
    //     }
    //   }
    // },
    data() {
      return {
        dictDatas: this.dictData,
        value: ''
      }
    },
    created() {
      if (!this.dictDatas) {
        this.getDictList();
      }
    },
    methods: {
      getDictList() {
        this.$ajax.get('sys/dictData/'+this.dictType).then((res) => {
          if (res.code === 200) {
            this.dictDatas = res.list;
          }
        })
      },
      handleSelectChange(val) {
        this.$emit('select', val)
      }
    }
  }
</script>