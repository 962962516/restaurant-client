<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="新增单品记录" name="first">
      <div>
        <el-table :data="tableData1" stripe style="width: 100%; border-radius: 10px;">
          <el-table-column prop="time" label="添加时间" width="300" />
          <el-table-column prop="productName" label="餐品名称" width="500" />
          <el-table-column prop="adminId" label="操作管理员 ID" />
        </el-table>
      </div>
    </el-tab-pane>

    <el-tab-pane label="新增套餐记录" name="second">
      <div>
        <el-table :data="tableData2" stripe style="width: 100%; border-radius: 10px;">
          <el-table-column prop="time" label="添加时间" width="300" />
          <el-table-column prop="productName" label="餐品名称" width="500" />
          <el-table-column prop="adminId" label="操作管理员 ID" />
        </el-table>
      </div>
    </el-tab-pane>

    <el-tab-pane label="删除单品记录" name="third">
      <div>
        <el-table :data="tableData3" stripe style="width: 100%; border-radius: 10px;">
          <el-table-column prop="time" label="删除时间" width="300" />
          <el-table-column prop="productName" label="餐品名称" width="500" />
          <el-table-column prop="adminId" label="操作管理员 ID" />
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import axios from "@/axios";

const activeName = ref('first')
const tableData1 = ref([])
const tableData2 = ref([])
const tableData3 = ref([])
onMounted(() => {
  addProductHistory()
})
async function addProductHistory(){
  try{
    const response = await axios.get('/enterprise/addProductHistory')
    if (response.status === 200) {
      tableData1.value = response.data.data
      console.log(response.data.data)
    }
  }catch (error){
    console.log(error)
  }
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  const tableName = tab.paneName
  if (tableName === 'second') {
    axios.get('/enterprise/addComboHistory')
        .then(response => {
          if (response.status === 200) {
            tableData2.value = response.data.data
            console.log(response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
  }else if(tableName === 'third'){
    axios.get('/enterprise/adminDeleteHistory')
        .then(response => {
          if (response.status === 200) {
            tableData3.value = response.data.data
          }
        })
        .catch(error => {
          console.log(error)
        })
  }
}


</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.new-product-history-div{
  height: 75vh;
  border-radius: 10px;
  background-color: #6b778c;
}
</style>
