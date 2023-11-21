<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column prop="time" label="操作时间" width="320px"/>
    <el-table-column prop="adminId" label="管理员Id" width="350" />
    <el-table-column prop="productName" label="餐品名称" width="350" />
    <el-table-column prop="numberChanges" label="入库数量" />

  </el-table>
</template>

<script lang="ts" setup>
import defaultProps from "element-plus/es/components/table/src/table-body/defaults";
import {ref, watch} from "vue";
let tableData = ref([])
const props = defineProps({
  addProductHistory : {},
  outProductHistory : {}
})
watch(()=> props.addProductHistory,(newValue) => {
  tableData.value = newValue
  console.log(tableData.value)
})

watch(()=> props.outProductHistory,(newValue) => {
  tableData.value = newValue
  console.log(tableData.value)
})
</script>


<style scoped>

</style>