<template>
  <div class="novel-chapter">
      <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
      </div>
      <header>{{ title }}</header>
      <article @click="setShow(!isShow)">
        <p v-for="(row, index) in content" v-bind:key="index">{{ row }}</p>
      </article>
      <div class="next" v-if="nextUrl">
        <span @click="getChapter(nextUrl)">下一章</span>
      </div>
    </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { chapter, progress } from '@/api/novel'

export default {
  directives: { TransferDom },
  components: { Loading },
  data() {
    return {
      isLoading: false,
      reading: {}, // 当前阅读元数据
      title: '', // 章节名
      content: [], // 正文
      nextUrl: '', // 下一章
      currentScrollTop: 0, // 当前垂直滚动像素数
      isShow: true // 显示 nav, bar
    }
  },
  created() {
    this.reading = this.$store.getters.novel
  },
  mounted() {
    // this.scrollhandler = event => {
    //   let sTop = document.body.scrollTop
    //   sTop = sTop < 0 ? 0 : sTop
    //   if (sTop <= this.currentScrollTop) {
    //     // 往上滑动,显示 nav
    //     if (sTop + 100 < document.body.scrollHeight - window.innerHeight) {
    //       this.setShow(true)
    //     }
    //   } else if (sTop > this.currentScrollTop) {
    //     // 往下滑动,隐藏 nav
    //     this.setShow(false)
    //   }
    //   this.currentScrollTop = sTop
    // }
    // // 监听滚动
    // window.addEventListener('scroll', this.scrollhandler)
  },
  beforeDestroy() {
    // 移除监听
    // window.removeEventListener('scroll', this.scrollhandler)
  },
  watch: {
    reading(reading, old) {
      if (
        !reading.hasOwnProperty('chapter_url') ||
        reading.chapter_url.length === 0
      ) {
        this.$router.replace({ name: 'NovelSearch' })
      }
      if (reading.chapter_url !== old.chapter_url) {
        this.$store.commit('common/SET_TITLE', reading.novel)
        this.getChapter(reading.chapter_url)
      }
    }
  },
  methods: {
    getChapter: function(url) {
      this.isLoading = true
      chapter({ url: url })
        .then(res => {
          this.isLoading = false
          this.title = res.data.title
          this.content = res.data.content
          this.nextUrl = res.data.next_url
          // 设置当前位置
          this.currentScrollTop = 0
          // 滚动回头部
          // PC
          document.documentElement.scrollTop = 0
          // phone
          document.body.scrollTop = 0
          this.reading.is_follow &&
            progress({
              catalog_url: this.reading.novel_url,
              chapter: res.data.title,
              chapter_url: url
            })
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    setShow: function(boolean) {
      if (this.isShow !== boolean) {
        this.isShow = boolean
        this.$store.commit('common/SET_IS_SHOW_NAV', boolean)
        this.$store.commit('common/SET_IS_SHOW_BAR', boolean)
      }
    }
  }
}
</script>

<style lang="less">
div.novel-chapter {
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
  vertical-align: baseline;
  overflow: hidden;
  font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial, sans-serif,
    Droid Sans Fallback;
  background: url(../../styles/novel-skin/skin-default-t.ece62.jpg) no-repeat
      center top,
    url(../../styles/novel-skin/skin-default-b.79f06.jpg) no-repeat center
      bottom,
    url(../../styles/novel-skin/skin-default-m.35905.jpg) repeat-y center 119px;
  background-size: 100%;

  header {
    font-size: 18px;
    padding: 14px 0 4px 0;
    text-align: center;
  }

  article {
    padding: 0 16px;
    p {
      margin: 8px 0;
      word-break: break-all;
    }
  }

  .next {
    text-align: center;
    position: relative;
    right: 0;
    left: 0;
    span {
      margin: 20px 0;
      color: white;
      line-height: 28px;
      font-weight: 500;
      background-color: red;
      width: 70%;
      border-radius: 10px;
      display: inline-block;
    }
  }
}
</style>
