<template>
  <div class="comics-search">
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
import { search } from '@/api/comic'

const getObject = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  components: { XButton, Search, Popup, PopupHeader, Picker },
  data() {
    return {
      platformSelected: ['qq'],
      platform: ['qq'],
      platformName: '腾讯漫画',
      isShowPlatformSelected: false, // popup 弹出
      platforms: [
        [
          {
            name: '腾讯漫画',
            value: 'qq'
          },
          {
            name: '漫画粉',
            value: 'manhuafen'
          }
        ]
      ],
      results: [],
      form: {
        platform: 'qq',
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
    css() {
      return ''
    },
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
      // 设置当前阅读的漫画
      this.$store.commit('common/SET_COMIC', item.source)
      // 跳到漫画目录
      this.$router.push({ name: 'ComicCatalog' })
    },
    onSubmit() {
      this.$refs.search.setBlur()
      search(this.form).then(res => {
        this.results = []
        res.data.forEach(ele => {
          this.results.push({
            title: ele.comic,
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
.comics-search {
  .btn-platform-picker {
    margin-right: 5px;
    font-size: 12px;
    padding: 0 10px;
  }
}
</style>
