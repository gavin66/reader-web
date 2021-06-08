<template>
  <div class="novel-search">
    <search
      @result-click="resultClick"
      :results="results"
      v-model="form.keywords"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      <x-button mini type="primary" slot="left" @click.native="isShowPlatformSelected = true" class="btn-platform-picker">{{ platformName }}</x-button>
    </search>
      <popup v-model="isShowPlatformSelected" class="vux-popup-picker" @on-hide="onHide(false)">
      <div class="vux-popup-picker-container">
        <popup-header left-text="取消" right-text="确定" @on-click-left="onHide(false)" @on-click-right="onHide(true)"/>
        <picker :data="platforms" v-model="platformSelected" />
      </div>
    </popup>
  </div>
</template>

<script>
import { XButton, Search, Popup, PopupHeader, Picker } from 'vux'
import { search } from '@/api/novel'

const getObject = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  components: { XButton, Search, Popup, PopupHeader, Picker },
  data() {
    return {
      platformSelected: ['quanxs'],
      platform: ['quanxs'],
      platformName: '全小说',
      isShowPlatformSelected: false, // popup 弹出
      platforms: [
        [
          {
            name: '全小说',
            value: 'quanxs'
          },
          {
            name: '笔趣阁',
            value: 'b5200'
          }
        ]
      ],
      results: [],
      form: {
        platform: 'quanxs',
        keywords: null
      }
    }
  },
  watch: {
    platform(pf, oldI) {
      this.platforms[0].forEach(ele => {
        if (ele.value === pf[0]) {
          this.platformName = ele.name
          this.form.platform = ele.value
        }
      })
    }
  },
  methods: {
    onHide(boolean) {
      // 关闭弹窗
      this.isShowPlatformSelected = false
      if (boolean) {
        this.platform = getObject(this.platformSelected)
      }

      if (!boolean) {
        this.platformSelected = getObject(this.platform)
      }
    },
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

<style lang="less">
.novel-search {
  .btn-platform-picker {
    margin-right: 5px;
    font-size: 12px;
    padding: 0 10px;
  }
}
</style>
