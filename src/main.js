import { createApp } from 'vue'
import './style/style.css'
import ElementPlus from 'element-plus'
import './style/ben-bmi-calc.scss'; // Import the SCSS file
import 'element-plus/dist/index.css'

import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus).mount('#app')
