export default class MicroAppStore {
  constructor (masterAppProps, options) {
    const defaultOptions = { selfRefresh: false }
    this.options = Object.assign(defaultOptions, options || {})
    this.state = {}
    this.props = masterAppProps
    window.$microAppStore = this
  }

  toBindStateChange ({}, callbackChange) {
    this.onStateChange((value, prev) => {
      callbackChange && callbackChange(value, prev)
    })
  }

  onStateChange (cb) {
    this.props.onGlobalStateChange && this.props.onGlobalStateChange(cb, true)
  }
}
