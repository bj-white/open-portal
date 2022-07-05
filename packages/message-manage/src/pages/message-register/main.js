import Vue from 'vue'
import App from './App'

let instance = null

function render (props = {}) {
  const { container } = props
  instance = new Vue({
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
