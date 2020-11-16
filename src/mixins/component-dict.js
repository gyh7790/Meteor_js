import { cloneDeep, isArray } from 'lodash'
import { mapState, mapActions } from 'vuex'
import multiple from '@/mixins/component-multiple'

export default {
  mixins: [
    multiple
  ],
  data () {
    return {
      currentValue: '',
      currentOptions: []
    }
  },
  computed: {
    ...mapState('dict', [
      'dictList'
    ]),

    attrs () {
      const defaultAttrs = {
        placeholder: '...'
      }
      return Object.assign(defaultAttrs, this.$attrs)
    }
  },
  watch: {
    dicts: 'loadOption',
  },
  created () {
    if (isArray(this.name)) {
      this.name.forEach(name => {
        this.dictFetch(name)
      })
    } else {
      this.dictFetch(this.name)
    }
    this.loadValue()
    this.loadOption()
  },
  methods: {
    ...mapActions('dict', {
      dictFetch: 'fetch'
    }),

    /**
     * @description 刷新选项
     */
    async loadOption () {
      let options = []
      if (this.custom) {
        options = cloneDeep(this.options)
      } else {
        if (isArray(this.name)) {
          const dicts = await Promise.all(this.name.map(name => this.dictGet(name)))
          options = [].concat(...dicts)
        } else {
          options = await this.dictGet(this.name)
        }
      }
      if (this.all) options.unshift(this.optionsAll)
      this.currentOptions = options
    }
  }
}
