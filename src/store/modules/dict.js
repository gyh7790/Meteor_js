import { throttle } from 'lodash'
import dict from '@/api/system/dict'

const getDict = throttle(async function ({ state, commit }) {
    const resultData = await Promise.resolve(dict.DICT_DATA_BY_TYPES(state.typeList.toString()))
    console.log("res=>", resultData)
    if (resultData.code == 200) {
        commit('setDict',resultData.data)
        return state.dictData
    }
}, 1000, { leading: false })

const state = {
    dictData: {},
    // 请求type
    typeList: []
}

const mutations = {
    setDict(state, data){
        for(let key in data){
            state.dictData[key] = data[key]
        }
        console.log(state.dictData)
    },
    fetchListPush (state, item) {
        if (!state.typeList.includes(item)) {
            state.typeList.push(item)
        }
    },
    fetchListClean (state) {
        state.typeList = []
    }
}

const actions = {
    getDictLabel({ state }, { dictType, dictValue }) {
        const dictData = state.dictData[dictType]
        if (dictData && dictData.value && dictData.value.length > 0) {
            const dict = Array.from(dictData.value).find(e =>e.value == dictValue)
            console.log(dict)
            return dict.label || ''
        }
        return ''
    },
    async fetch (payload, name = '') {
        if (name) {
            payload.commit('fetchListPush', name)
            return await getDict(payload)
        }
    }

}
  
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
