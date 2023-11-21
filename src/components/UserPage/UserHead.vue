<template>
  <div style="width: 100px; margin-top: 5px; margin-left: 20px">
    <el-image :src="MC" style="display: flex;"/>
  </div>
  <div class="head">
    <el-button class="login-button" circle>
      <el-icon class="user-icon"><User/></el-icon>
    </el-button>
    <el-dropdown>
      <div class="user-dropdown">
        <span class="el-dropdown-link">
          个人中心
        </span>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="openDrawer('vip')">麦麦会员</el-dropdown-item>
          <el-dropdown-item @click="openDrawer('integral')">积分与兑换</el-dropdown-item>
          <el-dropdown-item @click="openDrawer('myCoupons')">我的卷包</el-dropdown-item>
          <el-dropdown-item @click="openDrawer('orders')">我的订单</el-dropdown-item>
          <el-dropdown-item @click="openDrawer('complaints')">投诉与建议</el-dropdown-item>
          <el-dropdown-item divided @click="openDrawer('settings')">我的设置</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-drawer class="user-personal" v-model="isDrawerVisible" :show-close="false" style="background-color: white" :size="drawerWidth">
      <!-- 根据 currentDrawer 显示不同的内容 -->
      <template v-if="currentDrawer === 'vip'">
        <!-- 麦麦会员内容 -->
        <VipDrawer style="height: 1000px"></VipDrawer>
      </template>
      <template v-else-if="currentDrawer === 'integral'">
        <IntegralDrawer :integral="integral" :weeklyCoupons="dateArray"></IntegralDrawer>
      </template>
      <template v-else-if="currentDrawer === 'orders'">
        <!-- 我的订单内容 -->
        <MyoderHistory></MyoderHistory>
      </template>
      <template v-else-if="currentDrawer === 'complaints'">
        <!-- 投诉与建议内容 -->
        <UserReaction></UserReaction>
      </template>
      <template v-else-if="currentDrawer === 'settings'">
        <!-- 我的设置内容 -->
        <Settings></Settings>
      </template>
      <template v-else-if="currentDrawer === 'myCoupons'">
        <span style="display: flex; margin-left: 250px; width: 100px;height: 30px;color: #545c64; font-size: 18px">普通卷包</span>
        <!-- 我的优惠卷内容 -->
        <my-coupons :userCouponsDate="userCouponsDate"></my-coupons>
        <span style="display: flex; margin-top: 40px ;margin-left: 250px; width: 100px;height: 30px;color: #545c64; font-size: 18px">每周卷包</span>
        <hr style="margin-top: 10px">
        <MyWeeklyCoupons></MyWeeklyCoupons>
      </template>
      <!-- 可以根据需要添加更多抽屉内容 -->

      <!-- 共用抽屉头部和关闭按钮 -->
      <template #header="{ close, titleId, titleClass }">
        <h3 :id="titleId" :class="titleClass" style="">
          <span v-if="currentDrawer === 'vip'">OH麦金会员立享更多权益哦！</span>
          <span v-else-if="currentDrawer === 'integral'">积分兑换 <br><br> 快来看看你的积分都能兑换什么~~ </span>
          <span v-else-if="currentDrawer === 'myCoupons'">我的所有兑换卷</span>
          <span v-else-if="currentDrawer === 'orders'">查看我的订单内容。</span>
          <span v-else-if="currentDrawer === 'complaints'" style="font-size: 26px">帮助我们做的更好</span>
          <span v-else-if="currentDrawer === 'settings'">查看我的设置内容。</span>
        </h3>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </template>

    </el-drawer>

    <span class="username">{{ username }}</span>
  </div>
</template>

<script setup>
import {CircleCloseFilled, User} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import VipDrawer from "@/components/UserPersonalDrawer/VipDrawer.vue";
import {ElButton} from "element-plus";
import axios from "@/axios";
import IntegralDrawer from "@/components/UserPersonalDrawer/IntegralDrawer.vue";
import MyoderHistory from "@/components/UserPersonalDrawer/MyoderHistory.vue";
import MyCoupons from "@/components/UserPersonalDrawer/MyCoupons.vue";
import UserReaction from "@/components/UserPersonalDrawer/UserReaction.vue";
import Settings from "@/components/UserPersonalDrawer/Settings.vue";
import MC from '@/assets/icon/MC.png'
import MyWeeklyCoupons from "@/components/UserPersonalDrawer/MyWeeklyCoupons.vue";

onMounted(() => {
  getUsername()
})
const username = ref('')
async function getUsername(){
  try {
    const response = await axios.get('user/getUsername')
    if (response.status === 200) {
      username.value = response.data.data
    }
  }catch (error){
    console.log(error)
  }
}
const drawerWidth =  '35%'

const isDrawerVisible = ref(false);
const currentDrawer = ref('');
let integral = ref('')
const dateArray = ref([])
const userCouponsDate = ref([])
function openDrawer(drawerName) {
  currentDrawer.value = drawerName;

  //查询当前用户总积分 IntegralDrawer
  if(drawerName === 'integral'){
    axios.get('/user/integral')
        .then(response =>{
          if(response.status === 200){
            console.log('积分响应成功')
            integral.value = response.data.data
          }
        })
        .catch(error =>{
          console.log(error)
        })
    axios.get('/user/weeklyCoupons') //每周优惠卷
        .then(response => {
          console.log(response.data)
          if (response.status === 200) {
            console.log('weeklyCoupons',response.data)
            dateArray.value = response.data.data
            console.log('2222',dateArray)

          }
        })
        .catch(error =>{
          console.log(error)
        })
  }

  //查询当前用户所有消费记录 MyOderHistory
  if (drawerName === 'orders') {
    axios.get('/user/allUserConsume')
        .then(response =>{

        })
        .catch(error =>{
          console.log(error)
        })
  }

  //查询当前用户所有消费记录 MyCoupons
  if (drawerName === 'myCoupons') {
    axios.get('/user/allCoupons')
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.data)
            userCouponsDate.value = response.data.data
          }
        })
  }

  isDrawerVisible.value = true;
}


</script>

<style scoped>

.login-button{
  margin-right: 20px;
  background-color: whitesmoke;
  margin-top: 0;
}
.head {
  overflow: hidden;
  width: calc(100% - 50px);
  margin-right: 500px;
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: flex-end; /* 将内容靠右对齐 */
  height: 6vh;
  margin-top: -60px;
}

/* 调整 user-dropdown 样式 */
.user-dropdown {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  margin-right: 5px;
}

/* 调整 el-dropdown-link 样式 */
.el-dropdown-link {
  position: relative;
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  font-size: 25px; /* 设置字体大小 */
  margin-right: 15px; /* 右边距 */
}

/* 为用户名添加样式 */
.username {
  font-size: 25px; /* 设置用户名字体大小 */
  color: #181818;
  margin-right: 5px;
  margin-top: 0;
}
.user-icon{
  font-size: 30px;

}
</style>