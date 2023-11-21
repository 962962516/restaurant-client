<template xmlns="">

  <SearchProduct @search-product="handleSearchProduct" @product="handleProduct"></SearchProduct>

  <el-table :data="allProductData" style="margin-top: 10px">
    <el-table-column label="产品图片" width="200" style="display: flex ;margin-left: 40px">
      <template #default="scope">
        <el-image :src="scope.row.imgUrl" style="max-width: 100px; max-height: 100px; margin-left: 20px"></el-image>
      </template>
    </el-table-column>
      <el-table-column prop="productName" label="餐品名称" width="250"/>
      <el-table-column prop="description" label="描述" width="400" />
      <el-table-column prop="price" label="价格" width="200" />
      <el-table-column prop="productCount" label="餐品数量" width="200" />
      <el-table-column fixed="right" label="修改数量" width="120">
        <template #default="scope">
          <el-button size="large" style="display: flex; background-color: #069c4e; color: white; margin-left: 0; margin-top: 10px" @click="handleChangeProduct1(scope.row)">
            入库
          </el-button>
          <el-button size="large" style="display: flex; background-color: #da2816; color: white; margin-left: 0; margin-top: 10px" @click="handleChangeProduct2(scope.row)">
            出库
          </el-button>
        </template>
      </el-table-column>
  </el-table>

  <el-dialog
      v-model="dialogVisible"
      title="餐品入库修改"
      width="30%"
  >
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px;">
      <span style="display: flex ; margin-top: 0; font-size: 18px">餐品入库数量</span><br>
      <el-input-number v-model="num" :min="1" :max="1000" @change="handleChange" size="large" style="margin-top: 10px;"/><br>
      <span>目前数量: {{productNumber}}</span>
      <span class="dialog-footer" style="margin-right: 100px;">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="reviseNumber(rowData)">
                确定
              </el-button>
              </span>
    </div>
  </el-dialog>

  <el-dialog
      v-model="dialogVisibleOutput"
      title="餐品出库修改"
      width="30%"
  >
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px;">
      <span style="display: flex ; margin-top: 0; font-size: 18px">餐品出库数量</span><br>
      <el-input-number v-model="num" :min="1" :max="1000" @change="handleChange" size="large" style="margin-top: 10px;"/><br>
      <span>目前数量: {{productNumber}}</span>
      <span class="dialog-footer" style="margin-right: 100px;">
              <el-button @click="dialogVisibleOutput = false">取消</el-button>
              <el-button type="primary" @click="reviseOutputNumber(rowData)">
                确定
              </el-button>
              </span>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import defaultProps from "element-plus/es/components/table/src/table-body/defaults";
import {reactive, ref, watch} from "vue";
import axios from "@/axios";
import {Search} from "@element-plus/icons-vue";
import SearchProduct from "@/components/AdminCom/AdminMainCom/SearchProduct.vue";
import {ElMessage} from "element-plus";
const dialogVisibleOutput = ref(false)
const dialogVisible = ref(false)
const num = ref(1)
const rowData = ref()

const responseData = reactive({
  productId: {},
  number: {},
})
const productNumber = ref({})
watch(()=> num.value,(newValue)=>{
  responseData.number = num.value
})

const handleChange = (value: number) => {
  console.log(value)
}

//处理查询后过来的数据，并展示在表格中
const props = defineProps({
  allProduct: {}
})
const allProductData = ref([])
watch(()=> props.allProduct,(newValue) =>{
  allProductData.value = newValue
  console.log('父组件接收查询后的数据',allProductData.value)
})
function reviseNumber(rowData){
  axios.post('/admin/reviseProductNumber',responseData)
      .then(response =>{
        if (response.status === 200) {
          console.log(response.data)
          ElMessage({
            message: '入库成功',
            type: 'success',
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  dialogVisible.value = false
}
function reviseOutputNumber(rowData){
  axios.post('/admin/outputProductNumber',responseData)
      .then(response =>{
        if (response.status === 200) {
          console.log(response.data)
          ElMessage({
            message: '出库成功',
            type: 'success',
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  dialogVisibleOutput.value = false
}
function handleChangeProduct1(row){
  dialogVisible.value = true
  rowData.value = row
  responseData.productId = row.productId
  productNumber.value = row.productCount
  console.log(responseData)
}
function handleChangeProduct2(row){
  dialogVisibleOutput.value = true
  rowData.value = row
  responseData.productId = row.productId
  productNumber.value = row.productCount
  console.log(responseData)
}

const searchProduct1 = ref([])
const product = ref([])
function handleSearchProduct(data){
  searchProduct1.value = data
  console.log('searchProduct',searchProduct1.value)
  allProductData.value = searchProduct1.value
  console.log('allProductData',allProductData.value)
}

function handleProduct(data){
  product.value = data
  console.log('父组件接收product',product.value)
  allProductData.value = product.value
}
</script>


<style scoped>
.el-table .el-table__row {
  display: flex;
  height: 200px; /* 修改为你想要的高度值 */
  line-height: 80px; /* 修改为你想要的行高值 */
}
</style>