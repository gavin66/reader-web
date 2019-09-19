const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  title: state => state.common.title,
  isLoading: state => state.common.isLoading,
  novel: state => state.common.novel,
  comic: state => state.common.comic,
  isShowNav: state => state.common.isShowNav,
  isShowBar: state => state.common.isShowBar
}
export default getters
