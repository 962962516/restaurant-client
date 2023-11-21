<template>
  <div class="el-table1-div">
    <h1 style="color: #6b778c; margin-left: 5px">入库记录</h1>
    <el-table :data="tableData" stripe class="el-table1">
      <el-table-column prop="time" label="入库时间" width="300" />
      <el-table-column prop="productName" label="餐品名称" width="280" />
      <el-table-column prop="numberChanges" label="入库数量" />
      <el-table-column prop="adminId" label="入库管理员" width="320" />
    </el-table>
  </div>
  <div class="el-table1-div">
    <h1 style="color: #6b778c; margin-left: 5px">出库记录</h1>
    <el-table :data="tableData2" stripe class="el-table1">
      <el-table-column prop="time" label="出库时间" width="300" />
      <el-table-column prop="productName" label="餐品名称" width="280" />
      <el-table-column prop="numberChanges" label="出库数量" />
      <el-table-column prop="adminId" label="出库管理员" width="320" />
    </el-table>
  </div>

</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import axios from "@/axios";

onMounted(() => {
  inData()
})

const tableData = ref([])
const tableData2 = ref([])
async function inData(){
  try{
    const response = await axios.get('/admin/addProductHistory?show=1')
    if (response.status === 200) {
      tableData.value = response.data.data
      console.log(tableData.value)
    }
  }catch (error){
    console.log(error)
  }

  try{
    const response = await axios.get('/admin/addProductHistory?show=2')
    if (response.status === 200) {
      tableData2.value = response.data.data
      console.log(tableData.value)
    }
  }catch (error){
    console.log(error)
  }
}

</script>


<style scoped>
.el-table1-div{
  border-radius: 10px;
  height: 400px;
}
.el-table1{
  border-radius: 10px;
  margin-top: 10px  ;
}
</style>