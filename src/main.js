import './assets/main.css'

import {createApp, ref} from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import router from "@/router";
import echarts from '@/router/echarts';


const app = createApp(App)
const productCounts = {}
const productCountsTemp = ref({})
app.config.globalProperties.$echarts = echarts
// 使用element-plus
app.use(ElementPlus)
app.use(router)
app.provide('productCounts', productCounts);
app.provide('productCountsTemp',productCountsTemp)
app.mount("#app")

