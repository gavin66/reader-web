<template>
  <div>
    <tab v-model="index">
      <tab-item>小说</tab-item>
      <tab-item>漫画</tab-item>
    </tab>
    <swiper v-model="index" height="100%" :show-dots="false">
        <swiper-item :style='index==0?{position: "static"}:""'>
          <card v-for="(follow,index) in novels" v-bind:key="index" class="n-card">
            <div slot="header" class="header" @click="toNovelCatalog(follow)">{{ follow.novel }}</div>
            <div slot="content" class="content" @click="toNovelChapter(follow)">{{ follow.chapter }}</div>
          </card>
        </swiper-item>
        <swiper-item :style='index==1?{position: "static"}:""'>
          <card v-for="(follow,index) in comics" v-bind:key="index" class="n-card">
            <div slot="header" class="header" @click="toComicCatalog(follow)">{{ follow.comic }}</div>
            <div slot="content" class="content" @click="toComicChapter(follow)">{{ follow.chapter }}</div>
          </card>
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import { Card, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import { followList as novels } from '@/api/novel'
import { followList as comics } from '@/api/comic'

export default {
  components: { Card, Tab, TabItem, Swiper, SwiperItem },
  data() {
    return {
      index: 0, // tab index
      indexName: 'novel',
      // reading: {}, // 当前阅读元数据
      novels: [], // 收藏列表
      comics: [] // 收藏列表
    }
  },
  created() {
    novels({}).then(res => {
      this.novels = res.data
    })
    comics({}).then(res => {
      this.comics = res.data
    })
  },
  methods: {
    toNovelChapter(novel) {
      // 设置当前阅读的小说
      this.$store.commit('common/SET_NOVEL', Object.assign(novel, { is_follow: true }))
      // 跳到小说章节
      this.$router.push({ name: 'NovelChapter' })
    },
    toNovelCatalog(novel) {
      // 设置为当前阅读小说
      this.$store.commit('common/SET_NOVEL', Object.assign(novel, { is_follow: true }))
      // 跳到小说目录
      this.$router.push({ name: 'NovelCatalog' })
    },
    toComicChapter(comic) {
      // 设置当前阅读的漫画
      this.$store.commit('common/SET_COMIC', Object.assign(comic, { is_follow: true }))
      // 跳到漫画章节
      this.$router.push({ name: 'ComicChapter' })
    },
    toComicCatalog(comic) {
      // 设置当前阅读的漫画
      this.$store.commit('common/SET_COMIC', Object.assign(comic, { is_follow: true }))
      // 跳到漫画目录
      this.$router.push({ name: 'ComicCatalog' })
    }
  }
}
</script>

<style lang="less">
div.n-card {
  .header {
    padding: 14px 15px 10px;
    color: #999999;
    font-size: 13px;
    position: relative;
  }
  .header::after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
  .content {
    padding: 15px;
  }
}
</style>
