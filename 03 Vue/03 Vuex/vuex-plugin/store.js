let Vue

export default {
  install(_Vue) {
    Vue = _Vue

    Vue.mixin({ beforeCreate: vuexInit })
  },

  vuexInit() {
    const options = this.$options

    if (options.store) {
      this.$store =
        typeof options.store === 'function' ? options.store() : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  },
}

export class Store {
  constructor(options) {
    initStoreVM(this, options.state)

    this.getters = {}
    Object.entries(options.getters).forEach(([name, func]) => {
      Object.defineProperty(this.getters, name, {
        get: () => func(this.state, this.getters),
      })
    })

    this.mutations = {}
    Object.entries(options.mutations).forEach(([type, handler]) => {
      this.mutations[type] = (payload) => handler(this.state, payload)
    })

    this.actions = {}
    Object.entries(options.actions).forEach(([type, handler]) => {
      this.actions[type] = (payload) => handler(this, payload)
    })
  }

  get state() {
    return this._vm._data.$state
  }

  commit(type, payload) {
    this.mutations[type] && this.mutations[type](payload)
  }

  dispatch(type, payload) {
    this.actions[type] && this.actions[type](payload)
  }
}

function initStoreVM(store, state) {
  store._vm = new Vue({
    data: {
      $state: state,
    },
  })
}
