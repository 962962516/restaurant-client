<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" >
    <el-tab-pane class="tab-label" label="普通订单记录" name="first">
      <el-table
          :data="tableData1"
          :default-sort="{ prop: 'oderTime', order: 'descending' }"
          style="width: 100%; font-size: 15px; margin-top: -10px;"
          :row-style="{width:'20px'}"
      >
        <el-table-column prop="oderTime" label="下单时间" sortable width="170" />
        <el-table-column prop="productName" label="餐品名称" width="150" />
        <el-table-column prop="productNumber" label="产品数量" />
        <el-table-column prop="oderNumber" label="订单号" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane class="tab-label" label="卡卷订单记录" name="second">
      <el-table
          :data="tableDate2"
          :default-sort="{ prop: 'oderTime', order: 'descending' }"
          style="width: 100%; font-size: 15px; margin-top: -10px;"
          :row-style="{width:'20px'}"
      >
        <el-table-column prop="oderTime" label="下单时间" sortable width="200" />
        <el-table-column prop="name" label="餐品名称" width="170" />
        <el-table-column prop="oderNumber" label="订单号" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import axios from "@/axios";

const activeName = ref('first')

const tableData1 = ref<User1[]>([]);
const tableDate2 = ref<User2[]>([]);
interface User1 {
  name: string
  productNumber:number
  oderTime: string
  oderNumber:number
}
interface User2 {
  name: string
  oderTime: string
  oderNumber:number
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  const tabName = tab.paneName
  if (tabName === 'first') {
    axios.get('/user/allUserConsume')
        .then(response => {
          if (response.status === 200) {
            console.log('1',response.data)
             tableData1.value = response.data.data
            console.log(tableData1)
          }
        })
        .catch(error =>{
          console.log(error)
        })
  }else {
    axios.get('/user/allUserComboConsume')
        .then(response => {
          if (response.status === 200) {
            console.log('2',response.data)
            tableDate2.value = response.data.data
          }
        })
        .catch(error =>{
          console.log(error)
        })
  }
}
</script>
<style>

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 40px;
  font-weight: 800;

}
</style>
