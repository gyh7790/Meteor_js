import dict from '@/mixins/component-dict'

export default {
  name: 'dict-select',
  mixins: [dict],
  render () {
    const component =
      <el-select
        v-model={ this.currentValue }
        on-change={ this.onChange }
        filterable
        clearable>
        {
          this.currentOptions.map(item => <el-option label={ item.label } value={ item.value }/>)
        }
      </el-select>
    return component
  }
}
