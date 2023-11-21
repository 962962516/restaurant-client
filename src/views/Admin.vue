<template>
  <div class="common-layout">
    <el-container>
      <el-header height="7vh" style="background-color: white">
        <AdminHead></AdminHead>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <AdminAside @showWhich="handleShowWhich" @userOder="handleUserOder" @finishedOder="handleFinishedOder" @allProduct="handleAllProduct"
                      @addProductHistory="handleAddProductHistory" @outProductHistory="handleOutProductHistory"></AdminAside>
        </el-aside>
        <el-main style="background-color: #cccccc">
          <el-scrollbar wrap-style="max-height: 88vh;"> <!-- 设置最大高度 -->
            <AdminMain :show-which="showWhich" :user-oder="userOder" :finished-oder="finishedOder" :all-product="allProduct"
                       :add-product-history="addProductHistory" :out-product-history="outProductHistory"></AdminMain>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AdminAside from "@/components/AdminCom/AdminAside.vue";
import AdminHead from "@/components/AdminCom/AdminHead.vue";
import AdminMain from "@/components/AdminCom/AdminMain.vue";
import {ref} from "vue";

const showWhich = ref(0)
const userOder = ref([])
const finishedOder = ref([])
const allProduct = ref([])
const addProductHistory = ref([])
const outProductHistory = ref([])

function handleShowWhich(data){
  showWhich.value = data
  console.log('父组件showWhich',showWhich.value)
}
function handleUserOder(data){
  userOder.value = data
  console.log('父组件userOder',userOder.value)
}
function handleFinishedOder(data){
  finishedOder.value = data
  console.log('父组件finishedOder',finishedOder.value)
}
function handleAllProduct(data){
  allProduct.value = data
  console.log('父组件allProduct',allProduct.value)
}
function handleAddProductHistory(data){
  addProductHistory.value = data
  console.log('父组件addProductHistory',addProductHistory.value)
}
function handleOutProductHistory(data){
  outProductHistory.value = data
  console.log('父组件outProductHistory',outProductHistory.value)
}
</script>

<style scoped>

</style>