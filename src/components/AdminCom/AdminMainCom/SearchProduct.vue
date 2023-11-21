<template>
  <div style="display: flex; background-color: white; height: 80px">
    <el-autocomplete
        style="display: flex; height: 35px; margin-top: 20px; margin-left: 20px; width: 300px;"
        v-model="searchProduct"
        clearable
        :fetch-suggestions="fetchSuggestions"
        :trigger-on-focus="false"
        placeholder="搜索"
        value-key="productName"
        @select="handleSelect"
    >
      <template v-slot:suffix>
       <el-icon><search></search></el-icon>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "@/axios";
// 导入搜索图标
import { Search } from "@element-plus/icons-vue";

const emit = defineEmits(['searchProduct','product'])
const searchProduct = ref('');
const fetchSuggestions = ref([]);
let searchProductRequest = '';

// 监听搜索输入的变化
watch(searchProduct, (newValue) => {
  searchProductRequest = newValue;
  // 发送API请求
  axios.get(`/admin/searchProduct?productName=${searchProductRequest}`)
      .then(response => {
        // 提取数据并存储在fetchSuggestions中
        fetchSuggestions.value = response.data.data
        console.log(fetchSuggestions.value)
      })
      .catch(error => {
        console.log(error);
      });
});
watch(()=> fetchSuggestions.value, (newValue) => {
  console.log('fetchSuggestions变化了',fetchSuggestions.value)
  emit('product',fetchSuggestions.value)
})

// 处理选择项的逻辑
const searchDate = ref()
const handleSelect = (item) => {
  console.log("Selected item (JSON):");
  console.log(JSON.stringify(item, null, 2));
  searchDate.value = item;
  emit('searchProduct', [searchDate.value]); // 转换为数组并传递给父组件
};
</script>
