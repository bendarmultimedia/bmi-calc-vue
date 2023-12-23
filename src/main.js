import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/ben-bmi-calc.scss'; // Import the SCSS file

import bendarBMIAppComponent from './App.vue'
const bendarBMIApp = createApp(bendarBMIAppComponent)
bendarBMIApp.use(ElementPlus, { size: 'small'}).mount('#bendarBMIApp')
