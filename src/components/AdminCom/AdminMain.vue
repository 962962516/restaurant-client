<template>
  <el-table v-if="showWhich.value === 1" :data="receivedUserOder.value" stripe style="width: 100%;" size="large">
    <el-table-column prop="oderTime" label="日期时间" width="250" />
    <el-table-column prop="name" label="餐品名称" width="250" />
    <el-table-column prop="number" label="数量" width="200"/>
    <el-table-column prop="oderNumber" label="订单号" width="350"/>
    <el-table-column label="状态">
      <span>未完成</span>
    </el-table-column>
    <el-table-column label="确认餐品">
      <template #default="scope">
        <el-button
            size="default"
            @click.prevent="sureRow(scope.$index)"
            style="display: flex; margin-top: 3px; margin-left: 0; background-color: cornflowerblue; color: #f2f2f2"
        >
          已完成
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-table v-if="showWhich.value === 2" :data="receivedFinishedOder.value" stripe style="width: 100%;" size="large">
    <el-table-column prop="oderTime" label="日期时间" width="280" />
    <el-table-column prop="name" label="餐品名称" width="280" />
    <el-table-column prop="number" label="数量" width="200"/>
    <el-table-column prop="oderNumber" label="订单号" width="350"/>
    <el-table-column label="状态">
      <span>已完成</span>
    </el-table-column>
  </el-table>

  <AdminAllProduct v-if="showWhich.value === 3"></AdminAllProduct>
  <StoreHouse v-if="showWhich.value === 4" :all-product="receivedAllProduct.value"></StoreHouse>
  <InAndOutHistory v-if="showWhich.value === 5" :add-product-history="receivedAddProductHistory.value"></InAndOutHistory>
  <WeeklyCoupons v-if="showWhich.value === 6"></WeeklyCoupons>

</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, ref, watch, watchEffect} from "vue";
import axios from "@/axios";
import {TabsPaneContext} from "element-plus";
import AdminAllProduct from "@/components/AdminCom/AdminMainCom/AdminAllProduct.vue";
import StoreHouse from "@/components/AdminCom/AdminMainCom/StoreHouse.vue";
import InAndOutHistory from "@/components/AdminCom/AdminMainCom/InAndOutHistory.vue";
import WeeklyCoupons from "@/components/AdminCom/AdminMainCom/WeeklyCoupons.vue";
const props = defineProps({
  showWhich: {},
  userOder: {},
  finishedOder: {},
  allProduct: {},
  addProductHistory: {},
  outProductHistory: {}
})


const receivedUserOder = props.userOder
const receivedFinishedOder = props.finishedOder
const receivedAllProduct = props.allProduct
const receivedAddProductHistory = props.addProductHistory
const receivedOutProductHistory = props.outProductHistory

watch(()=>props.userOder ,(newData) => {
  receivedUserOder.value = props.userOder
  console.log('userOder123',receivedUserOder.value)
})
watch(()=>props.finishedOder ,(newData) => {
  receivedFinishedOder.value = props.finishedOder
  console.log('finishedOder123',receivedFinishedOder.value)
})
watch(()=>props.allProduct ,(newData) => {
  receivedAllProduct.value = props.allProduct
  console.log('allProduct123',receivedAllProduct.value)
})
watch(()=>props.addProductHistory ,(newData) => {
  receivedAddProductHistory.value = props.addProductHistory
  console.log('addProductHistory123',receivedAddProductHistory.value)
})
watch(()=>props.outProductHistory ,(newData) => {
  receivedOutProductHistory.value = props.outProductHistory
  console.log('outProductHistory123',receivedOutProductHistory.value)
})
let responseData = []
const sureRow = (index: number) => {
  console.log("Clicked delete button at index", index);
  if (Array.isArray(receivedUserOder.value)) {
    responseData = receivedUserOder.value[index]
    console.log(responseData)
    axios.post('/admin/deleteAndSavaFinishedOder',responseData)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    receivedUserOder.value.splice(index, 1);

  }
}

</script>

<style scoped>

</style>