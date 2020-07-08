<template>
  <div class="components-container">
      
    <div class="editor-container">
      <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool" />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'

export default {
  name: 'DndListDemo',
  components: { DndList },
  data() {
    return {
      list1: [
        {title:"AAAAA",author: "a",id:1},
        {title:"BBBBB",author: "b",id:2},
        {title:"CCCCC",author: "c",id:3},
        {title:"DDDDD",author: "d",id:4},
        {title:"EEEEE",author: "e",id:5}
      ],
      list2: [
        {title:"FFFFF",author: "f",id:6},
        {title:"GGGGG",author: "g",id:7},
        {title:"HHHHH",author: "h",id:8},
        {title:"IIIII",author: "i",id:9},
        {title:"JJJJJ",author: "j",id:10},
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
    }
  }
}
</script>

