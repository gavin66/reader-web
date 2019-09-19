<template>
  <div>
    <group>
      <cell-box v-for="(follow,index) in 100" v-bind:key="index" >{{ follow }}</cell-box>
    </group>
  </div>
</template>

<script>
import { Group, CellBox } from 'vux'

export default {
  components: { Group, CellBox },
  data() {
    return {
      follow_list: [] // 收藏列表
    }
  },
  created() {},
  methods: {}
}
</script>

<style>
</style>
