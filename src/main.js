import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(router) //use매소드는 플러그인에 연결할 라이브러리를 지정하는 것
  .use(store) //$store,$router
  .use(loadImage)  //$loadImage
  .mount('#app')