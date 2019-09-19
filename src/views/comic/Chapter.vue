<template>
  <div class="comic-chapter">
      <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
      </div>
      <div class="pictures">
        <img class="previewer-demo-img" v-for="(item, index) in pictures" v-bind:key="index" :src="item.src" :data-index="index" width="100%" @click="previewerShow(index)">
        <div v-transfer-dom>
          <previewer :list="pictures" ref="previewer" :options="previewerOptions" @on-index-change="previewerChange"></previewer>
        </div>
      </div>
      <div class="next" v-if="chapterNextId">
        <span @click="getChapter(platform,comicId,chapterNextId)">下一章</span>
      </div>
    </div>
</template>

<script>
import { Loading, TransferDom, Previewer } from 'vux'
import { chapter as requestChapter, progress } from '@/api/comic'

export default {
  directives: { TransferDom },
  components: { Loading, Previewer },
  data() {
    return {
      isLoading: false,
      reading: {}, // 当前阅读元数据
      comicId: null, // 漫画 ID
      chapter: '', // 章节名
      chapterNowId: null, // 当前章节 ID
      chapterPrevId: null, // 前一章节 ID
      chapterNextId: null, // 下一章节 ID
      platform: '', // 平台
      pictures: [],
      previewerOptions: {
        loop: false
      }
    }
  },
  created() {
    this.reading = this.$store.getters.comic
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    reading(reading, old) {
      if (
        !reading.hasOwnProperty('comic_id') ||
        !reading.hasOwnProperty('chapter_id')
      ) {
        this.$router.replace({ name: 'ComicCatalog' })
      }
      this.platform = reading.platform
      this.comicId = reading.comic_id
      this.getChapter(this.platform, this.comicId, reading.chapter_id)
    }
  },
  methods: {
    getChapter: function(platform, comicId, chapterId) {
      this.isLoading = true
      requestChapter({
        platform: platform,
        comic_id: comicId,
        chapter_id: chapterId
      })
        .then(res => {
          // 滚动回头部
          document.body.scrollTop = 0
          this.isLoading = false
          this.chapter = res.data.chapter
          this.chapterNowId = res.data.now_chapter_id
          this.chapterPrevId = res.data.prev_chapter_id
          this.chapterNextId = res.data.next_chapter_id
          this.pictures = res.data.pictures
          // 更新标题显示
          this.$store.commit('common/SET_TITLE', res.data.chapter)
          // 更新 cookie 阅读状态
          this.$store.commit(
            'common/SET_COMIC',
            Object.assign(this.reading, {
              chapter: this.chapter,
              chapter_id: this.chapterNowId
            })
          )
          // 更新收藏进度
          this.reading.is_follow &&
            progress({
              comic_id: this.reading.comic_id,
              chapter: res.data.chapter,
              chapter_id: res.data.now_chapter_id,
              platform: this.reading.platform
            })
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    previewerShow(index) {
      this.$refs.previewer.show(index)
    },
    previewerChange: function(arg) {
      let imgDom = document.querySelector(
        'div.pictures img:nth-child(' + (arg.currentIndex + 1) + ')'
      )
      if (imgDom) {
        // PC
        document.documentElement.scrollTop = imgDom.offsetTop - 50
        // phone
        document.body.scrollTop = imgDom.offsetTop - 50
      }
    }
  }
}
</script>

<style lang="less">
div.comic-chapter {
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
