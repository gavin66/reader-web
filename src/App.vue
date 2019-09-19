<template>
  <div>
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="actionSheetClick"></actionsheet>
    </div>

    <div :style="{paddingTop: isShowNav ? '46px' : '0',paddingBottom: isShowBar ? '55px' : '0'}">
      <x-header
          v-show="isShowNav"
          slot="header"
          style="width:100%;position:fixed;left:0;top:0;z-index:100;"
          :left-options="leftOptions"
          :right-options="rightOptions"
          :title="title"
          transition="vux-header-fade-in-right"
          @on-click-more="showMenu = true">
          <span v-if="this.$route.path === '/'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
      </x-header>
      <transition name="reader-pop-in">
          <router-view class="router-view" id="view-content"></router-view>
      </transition>
      <tabbar class="reader-tabbar" v-show="isShowBar" style="position: fixed">
        <tabbar-item :link="{path:'/novel/search'}" :selected="/novel/.test(this.$route.path)">
          <span class="reader-tabbar-item" slot="icon" style="position:relative;top: -2px;">&#xe67e;</span>
          <span slot="label">小说</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/comic/search'}" :selected="/comic/.test(this.$route.path)">
          <span class="reader-tabbar-item" slot="icon" style="position:relative;top: -2px;">&#xe60a;</span>
          <span slot="label">漫画</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/owner'}" :selected="/owner/.test(this.$route.path)">
          <span class="reader-tabbar-item" slot="icon" style="position:relative;top: -2px;">&#xe619;</span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>

  </div>
</template>

<script>
import {
  TransferDom,
  Loading,
  Tabbar,
  TabbarItem,
  ViewBox,
  Actionsheet,
  XHeader,
  Drawer,
  Group,
  Cell
} from 'vux'

export default {
  directives: { TransferDom },
  components: {
    Loading,
    Tabbar,
    TabbarItem,
    ViewBox,
    Actionsheet,
    XHeader,
    Drawer,
    Group,
    Cell
  },
  data() {
    return {
      drawerVisibility: false,
      showMenu: false,
      menus: {
        refresh: 'Refresh'
      },
      entryUrl: document.location.href
    }
  },
  mounted() {},
  methods: {
    actionSheetClick(key) {
      location.reload(true)
    }
  },
  computed: {
    title() {
      return this.$store.getters.title
    },
    isLoading() {
      return this.$store.getters.isLoading
    },
    leftOptions() {
      return {
        showBack: this.$route.path !== '/'
      }
    },
    rightOptions() {
      return {
        showMore: true
      }
    },
    isShowNav() {
      // return true
      return this.$store.getters.isShowNav
    },
    isShowBar() {
      // return true
      return this.$store.getters.isShowBar
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

body {
  background-color: #fbf9fe;
}
.reader-tabbar-item {
  font-family: 'reader';
  font-size: 22px;
  color: #888;
}
.reader-tabbar .weui-bar__item_on .reader-tabbar-item {
  color: #f70968;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0 !important;
}
.router-view {
  width: 100%;
  top: 46px;
}
.reader-pop-out-enter-active,
.reader-pop-out-leave-active,
.reader-pop-in-enter-active,
.reader-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.reader-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.reader-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.reader-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.reader-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
@font-face {
  font-family: 'reader'; /* project id 1374677 */
  src: url('//at.alicdn.com/t/font_1374677_4no7h2bylum.eot');
  src: url('//at.alicdn.com/t/font_1374677_4no7h2bylum.eot?#iefix')
      format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1374677_4no7h2bylum.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1374677_4no7h2bylum.woff') format('woff'),
    url('//at.alicdn.com/t/font_1374677_4no7h2bylum.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1374677_4no7h2bylum.svg#iconfont') format('svg');
}
</style>
