<template>
  <el-row class="tac" style="background-color: #545c64">
    <el-col :span="12">
      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item index="1" @click="showWhich = 1" style="margin-top: 3vh">
          <template #title>
            <el-icon style="margin-left: 10px"><Tickets /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">当前订单</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2" @click="showWhich = 2">
          <template #title>
            <el-icon style="margin-left: 10px"><Tickets /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">已完成的订单</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3" @click="showWhich = 3" >
          <template #title>
            <el-icon style="font-size: 16px; margin-left: 10px"><Memo/></el-icon>
            <span style="font-size: 16px; margin-left: 30px">产品信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="6" @click="showWhich = 6" >
          <template #title>
            <el-icon style="font-size: 16px; margin-left: 10px"><Memo/></el-icon>
            <span style="font-size: 16px; margin-left: 30px">每周优惠</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4" @click="showWhich = 4">
          <template #title>
            <el-icon  style="margin-left: 10px"><TakeawayBox /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">仓库管理</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="5">
          <template #title>
            <el-icon style="margin-left: 10px"><Clock /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">仓库记录</span>
          </template>
          <el-menu-item index="5-1" style="font-size: 16px;" @click="clickFive(1)">
            <el-icon ><TopRight /></el-icon>
            <span style="margin-left: 30px">入库记录</span>
          </el-menu-item>
          <el-menu-item index="5-2" style="font-size: 16px;" @click="clickFive(2)">
            <el-icon><TopLeft /></el-icon>
            <span style="margin-left: 30px">出库记录</span>
          </el-menu-item>
        </el-sub-menu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Tickets, TakeawayBox, Memo, Clock, TopRight, TopLeft,
} from '@element-plus/icons-vue'
import {onMounted, ref, watch} from "vue";
import axios from "@/axios";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const emit = defineEmits(['showWhich','userOder','finishedOder','allProduct','addProductHistory','outProductHistory'])
const showWhich = ref()
watch(() => showWhich.value, (newValue) =>{
  emit('showWhich',showWhich)
  console.log('showWhich',showWhich)
})
onMounted(()=>{
  showWhich.value = 1
})
const userOder = ref([])
const finishedOder = ref([])
const allProduct = ref([])

watch(() => showWhich.value, (newValue) => {
  if (showWhich.value == 1) {
    axios.get('/admin/userOder')
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            userOder.value = response.data.data
            emit('userOder',userOder)
          }
        })
        .catch(error => {
          console.log(error)
        })
  }else if(showWhich.value == 2){
    axios.get('/admin/finishedUserOder')
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            finishedOder.value = response.data.data
            emit('finishedOder',finishedOder)
          }
        })
        .catch(error =>{
          console.log(error)
        })
  }else if(showWhich.value == 4){
    axios.get('/admin/allProduct')
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            allProduct.value = response.data.data
            emit('allProduct',allProduct)
          }
        })
        .catch(error => {
          console.log(error)
        })
  }
})
function clickFive(data){
  if (data === 1) {
    showWhich.value = 5
  }else {
    showWhich.value = 6
  }
  axios.get(`/admin/addProductHistory?show=${data}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          if (data === 1) {
            const addProductHistory = response.data.data
            emit('addProductHistory',addProductHistory)
          }else {
            const outProductHistory = response.data.data
            emit('outProductHistory',outProductHistory)
          }

        }
      })
      .catch(error => {
        console.log(error)
      })
}

</script>


<style scoped>
.el-menu-vertical-demo{
  width: 250px;
  height: 90vh;
}
</style>