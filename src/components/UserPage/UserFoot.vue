<template>
  <el-button @click="visible = true" class="menu-button">
    查看/结算已选购的餐品
  </el-button>
  <el-drawer class="my-menu-list" v-model="visible" :show-close="false" style="color: #181818">
    <template #header="{ close, titleId, titleClass }">
      <h3 :id="titleId" :class="titleClass">我已选购的餐品</h3>
      <el-button class="submit-data-button" @click="payForOder" style="background-color: dodgerblue; color: white">
        去支付
      </el-button>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        关闭
      </el-button>
    </template>
    <hr>
    <div class="myOrderList" v-for="(item, index) in myOderData.myOderDataList" :key="index">
      <div class="order-item">
        <div class="image-container">
          <el-image :src="item.imageUrl" style="height: 150px; width: 150px;"/>
        </div>
        <div class="text-container">
          <span class="item-name">{{item.name}}</span>
          <span class="item-description">描述: {{item.description}}</span>
          <span class="item-price" v-if="isVip === 0">{{item.price}}元</span>
          <span class="item-price" v-if="isVip === 1">{{(item.price * 0.8).toFixed(0)}}元</span>
          <span class="item-count">数量: {{getProductCount(item.name)}}</span>
          <el-button style="margin-top: -320px; margin-left: 180px;height: 28px;width: 50px; background-color: #ff7675;color: white" @click="deleteOder(item)">删除</el-button>
        </div>
      </div>
    </div>


  </el-drawer>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch, inject, provide, onMounted} from 'vue'
import { ElButton, ElDrawer } from 'element-plus'
import {CircleCloseFilled, Money} from '@element-plus/icons-vue'
import axios from "@/axios";
import app from "@/App.vue";
const isVip = ref(0)
onMounted(() => {
  getUserIsVip()
})
function getUserIsVip(){
  axios.get('/user/isVip')
      .then(response => {
        isVip.value = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
}
const visible = ref(false)
const myOderData = reactive({
  myOderDataList: [],
  myComboOderDataList:[]
})
const props = defineProps({
  data: {},
  comboData: {}
})
const receivedMyOderData = ref('')

watch(
    () => props.data,
    (newData) => {
      receivedMyOderData.value = newData
      console.log('Foot子组件拿到父组件UserOder订单数据', receivedMyOderData.value)
      // 检查是否已存在相同商品，如果不存在才添加
      const isDuplicate = myOderData.myOderDataList.some((item) => item.name === newData.name);
      if (!isDuplicate) {
        myOderData.myOderDataList.push(receivedMyOderData.value);
      }
    }
)

// 使用 computed 动态计算 productCounts
const productCounts = inject('productCounts')
const productCountsTemp = inject('productCountsTemp')
// 创建计算属性，用于获取商品数量
const getProductCount = (productName) => {
  console.log(productName);
  return computed(() => productCounts.value[productName]).value;
};

let oderNumber = 350000//订单编号开始
const requestData = {
  productCounts: productCounts,
  oderNumber: oderNumber
}

const requestData2 = {
  integral: 0
}
const payForOder = async() => {
  try{
    const response = await axios.post('/user/payForOder',requestData)
    if (response.status === 200) {
      console.log(requestData2)
      console.log('123',response.data)
      requestData2.integral = response.data.data.reduce((total, item) => total + item.price, 0);
      console.log('Total Price:', requestData2.integral);
      const response2 = await axios.post(`/user/addIntegral?integral=${requestData2.integral}`)
      if (response2.status === 200) {
        console.log('积分更新成功')
      }
    }
    alert("已下单选购的餐品，请耐心等待备餐")

    // 清空已选购的餐品列表
    myOderData.myOderDataList = [];
    // 清空商品数量的全局变量
    productCounts.value = {};
    // 清空临时商品数量的全局变量
    productCountsTemp.value = {}

    myOderData.myComboOderDataList = []

    requestData.oderNumber++
  }catch (error){
    console.log(error)
  }
}

function deleteOder(item){
  const index = myOderData.myOderDataList.indexOf(item);
  if (index !== -1) {
    // Remove the item from the list
    myOderData.myOderDataList.splice(index, 1);

    if (productCounts.value && productCounts.value[item.name]) {
      delete productCounts.value[item.name];
    }

    // 从productCountsTemp中删除指定键对应的数据
    if (productCountsTemp._rawValue && productCountsTemp._rawValue[item.name]) {
      delete productCountsTemp._rawValue[item.name];
    }

    console.log('123',myOderData.myOderDataList)
    console.log('456',productCounts)
    console.log('789',productCountsTemp)
  }
}
</script>


<style>
.menu-button{
  height: 500px;
  width: 200px;
  margin-left: 75vw;
  margin-top: 15px;
  background-color: #cccccc;

}

.myOrderList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;
}

.order-item {
  display: flex;
  background-color: white;
  width: 450px;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 40px;
  height: 180px;
}

.image-container {
  flex: 0 0 150px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-container {
  flex: 1;
  margin-top: 20px;
}

.item-name {
  display: flex;
  font-size: 18px;
  margin-bottom: 10px;
}

.item-description {
  font-size: 14px;
  color: #cccccc;
  margin-bottom: 10px;
}

.item-price {
  display: flex;
  font-size: 22px;
  margin-top: 30px;
}

.item-count {
  display: flex;
  margin-left: 180px;
}


</style>