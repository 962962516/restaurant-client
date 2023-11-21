<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background-color: #2c3e50">
        <span style=" display: flex ;font-size: 18px; margin-top: 15px; margin-left: 40px">企业级/老板 管理监视维护后台</span>
      </el-header>
      <el-container>
        <el-aside width="250px" style="background-color: white">
          <EnterpriseAside @allProduct="handleAllProduct" @showWhich="handleShowWhich" @allCombo="handleAllCombo" @all-admin="handleAllAdmin"
                           @service-rating="handleServiceRating"></EnterpriseAside>
        </el-aside>
        <el-main style="background-color: #f2f2f2">
          <el-scrollbar wrap-style="max-height: 88vh;"> <!-- 设置最大高度 -->
          <EnterpriseMain :all-product="allProduct.value" :show-which="showWhich" :all-combo="allCombo.value" :all-admin="allAdmin"
                          :service-rating="serviceRating" ></EnterpriseMain>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import EnterpriseAside from "@/components/EnterpriseCom/EnterpriseAside.vue";
import {ref} from "vue";
import EnterpriseMain from "@/components/EnterpriseCom/EnterpriseMain.vue";
import EnterpriseComboPrice from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseComboPrice.vue";
const allProduct = ref([])
const allCombo = ref([])
const allAdmin = ref([])
const showWhich = ref(0)
const serviceRating = ref([])
function handleAllAdmin(data){
  allAdmin.value = data
  console.log('allAdmin123',allAdmin)
}
function handleAllProduct(data){
  allProduct.value = data
  console.log('allProduct123',allProduct)
}
function handleShowWhich(data){
  showWhich.value = data
  console.log('showWhich123',showWhich)
}
function handleAllCombo(data){
  allCombo.value = data
  console.log('allCombo123',allCombo)
}
function handleServiceRating(data){
  serviceRating.value = data
  console.log('serviceRating123',serviceRating)
}
</script>

<style scoped>

</style>