<template>
  <div class="home-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import comp from './components'

export default {
    name: 'home',
    components: { comp},
    data() {
        return {
            currentRole: 'comp'
        }
    },

}
</script>