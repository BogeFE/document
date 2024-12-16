const parent = document.getElementById('parent')
const child = document.getElementById('child')
const son = document.getElementById('son')
// const baidu = document.getElementById("a-baidu")

// baidu.addEventListener('click', function (e) {
//     e.preventDefault()
// })

const banned = true

// 第三个参数 usecapture 为  —— 在事件捕获阶段
window.addEventListener(
	'click',
	function (e) {
		console.log('window 捕获', e.target.nodeName, e.currentTarget.nodeName)
	},
	true,
)

parent.addEventListener(
	'click',
	function (e) {
		if (banned) {
			e.stopPropagation()
			window.alert('You are banned')
			return
		}

		console.log('parent 捕获', e.target.nodeName, e.currentTarget.nodeName)
	},
	true,
)

child.addEventListener(
	'click',
	function (e) {
		console.log('child 捕获', e.target.nodeName, e.currentTarget.nodeName)
	},
	true,
)

son.addEventListener(
	'click',
	function (e) {
		console.log('son 捕获', e.target.nodeName, e.currentTarget.nodeName)
	},
	true,
)

// 第三个参数 usecapture 为 false —— 在冒泡阶段捕获
window.addEventListener(
	'click',
	function (e) {
		// e.target.nodeName 指当前点击的元素, e.currentTarget.nodeName绑定监听事件的元素
		console.log('window 冒泡', e.target.nodeName, e.currentTarget.nodeName)
	},
	false,
)

parent.addEventListener(
	'click',
	function (e) {
		console.log('parent 冒泡', e.target.nodeName, e.currentTarget.nodeName)
	},
	false,
)

child.addEventListener(
	'click',
	function (e) {
		console.log('child 冒泡', e.target.nodeName, e.currentTarget.nodeName)
	},
	false,
)

son.addEventListener(
	'click',
	function (e) {
		console.log('son 冒泡', e.target.nodeName, e.currentTarget.nodeName)
	},
	false,
)
