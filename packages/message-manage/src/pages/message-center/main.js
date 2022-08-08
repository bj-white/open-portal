import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index'

Vue.use(VueRouter)

let instance = null
let router = null

if (!window.__POWERED_BY_QIANKUN__) {
  render()
} else {
  // eslint-disable-next-line camelcase, no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  // eslint-disable-next-line camelcase, no-undef
  console.log('__webpack_public_path__: ', __webpack_public_path__)
}

function render (props = {}) {
  const { container, baseUrl } = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? baseUrl : `${process.env.BASE_URL}message-center`,
    mode: 'history',
    routes
  })
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// function initStore (props) {}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  // initStore(props)
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
