<template>
  <div class="home-container">
    <component :is="currentRole" />
    <dict-item :dictType="'sdfsadfsadfds'" />
  </div>
</template>

<script>
import comp from './components'
import DictItem from '@/components/DictItem'
export default {
    name: 'home',
    components: { comp,DictItem},
    data() {
        return {
            currentRole: 'comp'
        }
    },

}
</script>