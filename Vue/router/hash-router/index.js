class HashRouter {
  constructor() {
    this.routes = {}
    this.refresh = this.refresh.bind(this)
    window.addEventListener('hashchange', this.refresh)
    
    // 目的是为了让路由初始化的时候就可以渲染
    window.addEventListener('load', this.refresh)
  }
  route(hash, callback) {
    this.routes[hash] = callback || function () {}
  }
  // 渲染当前路径对应的操作
  refresh() {
    this.routes[`/${location.hash.slice(1) || ''}`]()
  }
}

const body = document.querySelector('body')
function changeBgColor(color) {
  body.style.backgroundColor = color
}

const router = new HashRouter()

router.route('/gray', () => {
  changeBgColor('gray')
})
router.route('/green', () => {
  changeBgColor('green')
})
router.route('/', () => {
  changeBgColor('white')
})
