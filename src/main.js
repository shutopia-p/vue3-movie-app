import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'

createApp(App)
  .use(router) //use매소드는 플러그인에 연결할 라이브러리를 지정하는 것
  .use(store)
  .mount('#app')