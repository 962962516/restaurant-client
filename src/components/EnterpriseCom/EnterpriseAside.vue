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
        <el-menu-item index="1" @click="clickOne" style="margin-top: 3vh">
          <template #title>
            <el-icon style="margin-left: 10px"><Postcard /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">管理员管理</span>
          </template>
        </el-menu-item>

        <el-sub-menu index="6" >
          <template #title>
            <el-icon  style="margin-left: 10px"><TakeawayBox /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">管理员操作</span>
          </template>
          <el-menu-item index="6-1" @click="showWhich = 7">
            <el-icon style="margin-left: 10px"><Coin /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">餐品操作记录</span>
          </el-menu-item>
          <el-menu-item index="6-2" style="font-size: 16px;" @click="showWhich = 6">
            <el-icon style="margin-left: 10px"><Coin /></el-icon>
            <span style="margin-left: 30px">出入库记录</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon style="margin-left: 10px"><Tickets /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">餐品价格</span>
          </template>
          <el-menu-item index="2-1" @click="clickTwo">
            <el-icon style="margin-left: 10px"><Coin /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">单品价格</span>
          </el-menu-item>
          <el-menu-item index="2-2" style="font-size: 16px;" @click="clickThree">
            <el-icon style="margin-left: 10px"><Coin /></el-icon>
            <span style="margin-left: 30px">套餐价格</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="3" @click="clickFive" >
          <template #title>
            <el-icon style="font-size: 16px; margin-left: 10px"><Memo/></el-icon>
            <span style="font-size: 16px; margin-left: 30px">产品销售信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4" @click="clickFour">
          <template #title>
            <el-icon  style="margin-left: 10px"><TakeawayBox /></el-icon>
            <span style="font-size: 16px; margin-left: 30px">投诉和建议</span>
          </template>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Clock, TopRight, TakeawayBox, Memo, Tickets, TopLeft, Postcard, Coin,
} from '@element-plus/icons-vue'
import {onMounted, reactive, ref, watch} from "vue";
import axios from "@/axios";
onMounted(()=> {
  showWhich.value = 1
})
const allProduct = ref([])
const allCombo = ref([])
const showWhich = ref(0)
const emit = defineEmits(['allProduct','showWhich','allCombo','allAdmin','serviceRating'])
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
watch(() => showWhich.value, (newValue) => {
  emit('showWhich',showWhich)
})

function clickOne(){
  showWhich.value = 1
  axios.get('/enterprise/allAdmin')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          const allAdmin = response.data.data
          emit('allAdmin', allAdmin)
        }
      })
      .catch(error => {
        console.log(error)
      })
}
function clickTwo(){
  showWhich.value = 2
  axios.get('/admin/allProduct')
      .then(response => {
        if (response.status === 200) {

          allProduct.value = response.data.data.map(item => {
            return { ...item, dialogVisible: false };
          });

          emit('allProduct',allProduct)
        }
      })
      .catch(error => {
        console.log(error)
      })
}
function clickThree(){
  showWhich.value = 3
  axios.get('/admin/allCombo')
      .then(response => {
        if (response.status === 200) {

          allCombo.value = response.data.data.map(item => {
            return { ...item, dialogVisible: false };
          });
          emit('allCombo',allCombo)
        }
      })
      .catch(error => {
        console.log(error)
      })
}
function clickFour(){
  showWhich.value = 4
  axios.get('/enterprise/rating')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          const serviceRating = response.data.data
          emit('serviceRating',serviceRating)
        }
      })
      .catch(error => {
        console.log(error)
      })
}
function clickFive(){
  showWhich.value = 5
}
</script>

<style>
.el-menu-vertical-demo{
  width: 250px;
  height: 90vh;
}
</style>