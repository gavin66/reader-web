<template>
  <div>
    <search
      @result-click="resultClick"
      :results="results"
      v-model="form.query"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      </search>
  </div>
</template>

<script>
import { XButton, Search } from 'vux'
import { search } from '@/api/novel'

export default {
  components: { XButton, Search },
  data() {
    return {
      results: [],
      form: {
        query: null
      }
    }
  },
  methods: {
    setFocus() {
      // 设置焦点
      this.$refs.search.setFocus()
    },
    resultClick(item) {
      // 设置当前阅读的小说
      this.$store.commit('common/SET_NOVEL', item.source)
      // 跳到小说目录
      this.$router.push({ name: 'NovelCatalog' })
    },
    onSubmit() {
      this.$refs.search.setBlur()
      search(this.form).then(res => {
        this.results = []
        res.data.forEach(ele => {
          this.results.push({
            title: ele.novel + ' (' + ele.author + ')',
            source: ele
          })
        })
        this.result = res.data
      })
    },
    onFocus() {
      // console.log('获取焦点')
    },
    onCancel() {
      // console.log('点击小说搜索按钮')
    }
  }
}
</script>

<style>
</style>
