<template>
  <div v-if="isVip === 0">
    <span style="display: flex;color: #545c64; font-size: 16px; margin-bottom: 40px">目前您还不是会员哦~</span>
    <span style="display: flex;color: #4c4b4b; font-size: 16px; margin-bottom: 40px">说明：升级为麦麦会员后后，可享受全场8折权益！</span>
    <div class="header">
      <img src="@/assets/icon/icon1.png" class="icon1">
      <span class="text1">开通O麦会员解锁权益</span>
    </div>
    <hr>
    <div class="scrollable-content">
      <!-- 这里放置每个抽屉的内容 -->
      <el-image :src="Vip1"/>
      <el-image :src="Vip2"/>
      <el-button class="vip-button" @click="setVip">
        19元立即开通
      </el-button>
    </div>
  </div>

  <div v-if="isVip === 1">
    <el-image :src="Vip3"/>
    <hr style="margin-bottom: 30px">
    <span style="color: #4c4b4b; margin-left: 100px; font-size: 18px">您已是麦麦会员，快去下单享受会员权益吧！~~</span>
  </div>
</template>

<script setup>
import {ElButton} from "element-plus";
import axios from "@/axios";
import {CircleCloseFilled} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import Vip1 from "@/assets/icon/Vip1.png"
import Vip2 from "@/assets/icon/Vip2.png"
import Vip3 from "@/assets/icon/IsVip.png"

const isVip = ref(0)

onMounted(() => {
  getUserIsVip()
})

async function getUserIsVip(){
  try{
    const response = await axios.get('/user/isVip')
    if (response.status === 200) {
      isVip.value = response.data.data
    }
  }catch (error){
    console.log(error)
  }
}

const props = defineProps({
  visible: Boolean
})
watch(() => props.visible, (newData)=>{
  console.log('1111',newData)
})
const setVip = async() =>{
  try{
    const response = await axios.post('/user/vip')
    if (response.status === 200) {
      alert('开通会员成功！')
      await getUserIsVip()
    }
  }catch (error){
    console.log(error)
  }
}

</script>

<style scoped>

.vip-button{
  margin-top: 30px;
  margin-left: 150px;
}
.scrollable-content {
  padding: 16px; /* 可根据需要添加内边距 */
}
.text1{
  position: relative;
  bottom: 40px; /* 向下移动10像素 */
  left: 150px; /* 向右移动20像素 */
  font-size: large;
  font-weight: bolder;
  color: #cccccc;
}
.icon1{
  max-height: 40px;
  max-width: 40px;
  margin-bottom: 20px;
}
.vip-button{
  background-color: #222222;
  color: goldenrod;
  /* 设置按钮的宽度和高度 */
  width: 200px; /* 自定义宽度 */
  height: 40px; /* 自定义高度 */
  font-weight: bold;
  font-size: 18px;
  /* 设置按钮的圆角 */
  border-radius: 20px; /* 自定义圆角半径 */
}

</style>