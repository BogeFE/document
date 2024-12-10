class HistoryRouter {
  constructor() {
    this.routes = {}
    this._bindPopState()
  }

  route(path, callback) {
    this.routes[path] = callback || function () {}
  }
  go(path) {
    window.history.pushState({ path }, null, path)

    this.invokePathCallbaca(path)
  }

  _bindPopState() {
    // 监听 popstate 事件
    window.addEventListener('popstate', (e) => {
      const path = e.state && e.state.path
      console.log(e.state)

      this.invokePathCallbaca(path)
    })
  }
   invokePathCallbaca(path) {
    this.routes[path] && this.routes[path]()
  }
}

const body = document.querySelector('body')
function changeBgColor(color) {
  console.log('changeBgColor', color)
  body.style.backgroundColor = color
}

const Router = new HistoryRouter()
Router.route('/', function () {
  changeBgColor('white')
})
Router.route('/green', function () {
  changeBgColor('green')
})
Router.route('/gray', function () {
  changeBgColor('gray')
})

const container = document.querySelector('.container')
container.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault()
    Router.go(e.target.getAttribute('href'))
  }
})
