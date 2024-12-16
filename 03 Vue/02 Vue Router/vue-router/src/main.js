import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import router from './router/guard'

createApp(App).use(router).mount('#app')
