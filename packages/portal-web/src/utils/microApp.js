import * as qiankun from 'qiankun'
const { initGlobalState } = qiankun

const {
  onGlobalStateChange, // 全局监听
  offGlobalStateChange, // 移除当前应用的状态监听，微应用 umount 时会默认调用
  setGlobalState // 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
} = initGlobalState({
  id: 10,
  needRefreshApp: false, // 是否需要刷新子应用
  selfRefresh: null, // 子应用是否实现了自行刷新功能
})

const microAppStateActions = {
  offGlobalStateChange,
  setState (state) {
    setGlobalState({...state})
  }
}

export {
  microAppStateActions,
  onGlobalStateChange
}
