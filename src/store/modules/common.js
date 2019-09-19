import { getNovelReading, setNovelReading, getComicReading, setComicReading } from '@/utils/reading'

const state = {
  title: 'Reader',
  isLoading: false,
  novel: getNovelReading(),
  comic: getComicReading(),
  isShowNav: true,
  isShowBar: true
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title
  },
  SET_IS_LOADING: (state, boolean) => {
    state.isLoading = boolean
  },
  SET_NOVEL: (state, current) => {
    state.novel = current
    setNovelReading(current)
  },
  SET_COMIC: (state, current) => {
    state.comic = current
    setComicReading(current)
  },
  SET_IS_SHOW_NAV: (state, boolean) => {
    state.isShowNav = boolean
  },
  SET_IS_SHOW_BAR: (state, boolean) => {
    state.isShowBar = boolean
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
