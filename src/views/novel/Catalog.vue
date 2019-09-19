<template>
  <div>
    <div class="novel-search-btn">
      <sticky :offset="46" :check-sticky-support="false">
        <div>
          <x-button mini type="primary" @click.native="reverse">{{ order }}</x-button>
          <x-button mini type="warn" @click.native="follow">{{ follow_status === 'followed' ? '取消收藏' : '收藏'}}</x-button>
        </div>
      </sticky>
    </div>
    <group class="novel-search-items">
      <cell-box v-for="(item,index) in items" v-bind:key="index" @click.native="toChapter(item)">{{ item.chapter }}</cell-box>
    </group>
  </div>
</template>

<script>
import { Group, CellBox, XButton, Sticky } from 'vux'
import { catalog, follow, unfollow } from '@/api/novel'

export default {
  components: { Group, CellBox, XButton, Sticky },
  data() {
    return {
      follow_status: 'unfollowed',
      reading: {}, // 当前阅读元数据
      items: [], // 章节列表
      order: '倒序' // 排序
    }
  },
  watch: {
    reading(reading, old) {
      if (
        !reading.hasOwnProperty('novel_url') ||
        reading.novel_url.length === 0
      ) {
        this.$router.replace({ name: 'NovelSearch' })
      } else if (reading.novel_url !== old.novel_url) {
        catalog({ url: reading.novel_url }).then(res => {
          this.items = res.data.catalog
          reading.is_follow = res.data.is_follow
          if (res.data.is_follow) {
            this.follow_status = 'followed'
          }
        })
        this.$store.commit('common/SET_TITLE', reading.novel)
      }
    }
  },
  created() {
    this.reading = this.$store.getters.novel
  },
  methods: {
    reverse() {
      this.items.reverse()
      this.order === '正序' ? (this.order = '倒序') : (this.order = '正序')
    },
    follow() {
      if (this.follow_status === 'unfollowed') {
        follow({
          novel: this.reading.novel,
          catalog_url: this.reading.novel_url
        }).then(res => {
          // 收藏成功
          this.follow_status = 'followed'
        })
      } else if (this.follow_status === 'followed') {
        unfollow({
          catalog_url: this.reading.novel_url
        }).then(res => {
          // 取消成功
          this.follow_status = 'unfollowed'
        })
      }
    },
    toChapter(item) {
      // 设置当前阅读的小说
      this.reading.chapter_name = item.chapter
      this.reading.chapter_url = item.chapter_url
      this.$store.commit('common/SET_NOVEL', this.reading)
      // 跳到小说章节
      this.$router.push({ name: 'NovelChapter' })
    }
  }
}
</script>

<style lang="less">
.novel-search-btn {
  height: 44px;
  line-height: 44px;
  .vux-sticky-box {
    background: aliceblue;
    .weui-btn + .weui-btn {
      margin-top: 0;
    }
  }
}
.novel-search-items {
  .weui-cells {
    margin-top: 0;
  }
}
</style>
