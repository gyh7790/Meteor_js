<template>
    <el-select v-model="selectedStr" @change="handleSelectChange" filterable placeholder="请选择" v-bind="$attrs">
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
    name: 'DictList',
    props: {
      value: { type: String, default: '', required: false },
      dictData: {
        type: Array,
        required: false
      },
      selected: {
        type: [Number,String],
        required: false
      },
      dictType: {
        type: [Number,String],
        required: false
      },
      isValue: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedStr: String(this.selected || ''),
        dictDatas: {}
      }
    },
    created() {
      console.log('------------>',this.dictData)
      if (!this.dictData) {
        this.getDictList();
      } else {
        this.dictDatas = this.dictData
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
        this.$emit('input', val);
        this.$emit('select', val)
      }
    }
  }
</script>