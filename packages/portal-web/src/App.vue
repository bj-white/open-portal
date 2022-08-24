<template>
  <div class="header_main_wrapper">
    <div class="header_wrapper" @click="switchMenu">this is header.</div>
    <div class="main_wrapper" :class="{ close: close }">
      <div class="menu_wrapper">
        <div v-for="item in menus" :key="item.id">
          <a href="javascript: ;" @click="goMenu(item.id)">{{ item.name }}</a>
        </div>
      </div>
      <div class="tab_view_wrapper">
        <tab-com class="tab_wrapper" @handleSwitch="goMenu" @handleClose="handleClose" :tabs="tabs"></tab-com>
        <el-scrollbar class="view_wrapper">
          <div id="container"></div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { registerMicroApps, start } from 'qiankun'
import TabCom from './components/TabCom.vue'
// import { microAppStateActions } from './utils/microApp'
const menus = [
  {
    id: 0,
    name: '首页',
    path: 'home',
    active: false,
    disabled: true
  },
  {
    id: 1,
    name: '消息中心',
    path: 'message-center',
    active: false
  },
  {
    id: 2,
    name: '消息注册',
    path: 'message-register',
    active: false
  }
];
export default {
  components: {
    TabCom
  },
  data () {
    return {
      menus,
      close: false,
      tabs: [menus[0]]
    }
  },
  created () {
    this.close = window.sessionStorage.getItem('menuClose') === 'true'
    this.init()
  },
  mounted () {
    registerMicroApps([
      {
        name: 'home-page',
        entry: '/portal-products/basic-console/user-manage/home-page',
        container: '#container',
        activeRule: '/portal/home'
      },
      {
        name: 'message-center',
        entry: '/portal-products/basic-console/message-manage/message-center',
        container: '#container',
        activeRule: '/portal/message-center',
        props: {
          baseUrl: '/portal/message-center'
        }
      },
      {
        name: 'message-register',
        entry: '/portal-products/basic-console/message-manage/message-register',
        container: '#container',
        activeRule: '/portal/message-register'
      }
    ])
    start()
  },
  methods: {
    init () {
      const pathname = window.location.pathname
      const activeItem = this.menus.filter((item) => {
        return pathname.indexOf(item.path) !== -1
      })
      if (activeItem.length) {
        this.goMenu(activeItem[0].id, false)
      } else {
        this.goMenu(0)
      }
    },
    goMenu (id, jump = true) {
      /* microAppStateActions.setState({
        id
      }) */
      const result = this.menus.find((item) => {
        return item.id === id
      })
      if (result && jump) {
        window.history.pushState({}, result.name, process.env.BASE_URL + result.path)
      }
      const tab = this.tabs.filter((item) => {
        if (item.id === id) {
          item.active = true
        } else {
          item.active = false
        }
        return item.id === id
      })
      if (!tab.length) {
        result.active = true
        this.tabs.push(result)
      }
    },
    switchMenu () {
      this.close = !this.close
      window.sessionStorage.setItem('menuClose', this.close)
    },
    handleClose (id) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].id === id) {
          if (this.tabs[i].active && this.tabs.length !== 1) {
            if (i === this.tabs.length - 1) {
              this.goMenu(this.tabs[i - 1].id)
            } else {
              this.goMenu(this.tabs[i + 1].id)
            }
          }
          this.tabs.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header_main_wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .header_wrapper {
    height: 60px;
    background: #ddd;
  }
  .main_wrapper {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    &.close {
      .menu_wrapper {
        & > div {
          display: none;
        }
        width: 50px;
      }
      .tab_view_wrapper {
        left: 50px;
      }
    }
    .menu_wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 200px;
      border-right: 1px solid #ddd;
      transition: width .3s;
    }
    .tab_view_wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 200px;
      transition: left .3s;
      .tab_wrapper {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
      }
      .view_wrapper {
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        ::v-deep(.el-scrollbar__wrap) {
          overflow-x: hidden;
        }
      }
    }
  }
}
</style>
