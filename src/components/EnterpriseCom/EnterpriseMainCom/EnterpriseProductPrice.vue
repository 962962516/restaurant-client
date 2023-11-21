<template>
  <div>
    <!--    所有商品！！！-->
    <el-tabs type="border-card">
        <div style="display: flex; background-color: #f0f0f0; height: 80px">
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
        </div><br>

        <div class="productDiv">
          <div class="product" v-for="(item, index) in productData" :key="index" >
            <div style="display: flex; align-items: center;">
              <div style="width: 150px; height: 150px;">
                <el-image :src="item.imgUrl" style="max-width: 180px; max-height: 180px; margin-left: 20px"></el-image>
              </div>
              <div style="margin-left: 20px; display: grid; height: 200px; margin-top: 10px">
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">餐品名称: {{item.productName}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">描述: {{item.description}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">价格: {{item.price}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">商品数量: {{item.productCount}}</span>
                <el-button style="width: 80px; margin-top: 0; margin-left: 170px; background-color: cornflowerblue;color: white" @click="clickButton(item)">调整价格</el-button>
              </div>
            </div>

            <el-dialog
                v-model="item.dialogVisible"
                title="调餐商品价格"
                width="30%"
                :close-on-click-modal="false"
            >
              <div style="text-align: center;">
                <el-image :src="item.imgUrl" style="max-width: 180px; max-height: 180px; margin-left: -20px "></el-image>
                <div style="display: inline-block; text-align: left; margin-left: 40px; vertical-align: top; margin-top: 40px">
                  <span>{{ item.productName }}目前价格: {{item.price}}</span><br><br>
                  <span style="font-size: 18px">调整价格</span><br>
                  <el-input-number style="margin-top: 20px; width: 120px; height: 30px" :min = 0 v-model="requestData.price"></el-input-number>
                </div>
                <el-button style="margin-left: 300px; background-color: #03bd25;color: white" @click="submit(item)">确认调整</el-button>
              </div>

            </el-dialog>
          </div>
        </div>
    </el-tabs>
  </div>
</template>

<script setup>
import AddProduct from "@/components/AdminCom/AdminMainCom/AddProduct.vue";
import {Search} from "@element-plus/icons-vue";
import {reactive, ref, watch} from "vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";
const searchProduct = ref('');
const fetchSuggestions = ref([]);
let searchProductRequest = '';
const productData = ref([]);
const props = defineProps({
  showWhich: ref(),
  allProduct: ref({}),
})
watch(()=> props.allProduct, (newValue => {
  productData.value = props.allProduct
  console.log(productData.value)
}))
// 监听单品搜索输入的变化
watch(searchProduct, (newValue) => {
  searchProductRequest = newValue;
  // 发送API请求
  axios.get(`/admin/searchProduct?productName=${searchProductRequest}`)
      .then(response => {
        // 提取数据并存储在fetchSuggestions中
        fetchSuggestions.value = response.data.data //展示查询出的餐品名
        productData.value = response.data.data //将查出的数据动态到列表中
        console.log(fetchSuggestions.value)
      })
      .catch(error => {
        console.log(error);
      });
});

const handleSelect = (item) => {
  console.log("Selected item (JSON):");
  console.log(JSON.stringify(item, null, 2));

  productData.value = [item]

  console.log('123',productData.value)
};
const requestData = reactive({
  price: {},
  productId: {}
})
function clickButton(item){ //把目前价格同步到input框中
  item.dialogVisible = true
  requestData.price = item.price
}
function submit(item){
  requestData.productId = item.productId
  axios.post('/enterprise/reviseProductPrice',requestData)
      .then(response => {
        if (response.status === 200) {
          fetchDataAndRefreshProduct()
          ElMessage({
            showClose: true,
            message: '价格调整成功',
            type: "success"
          })
        }
      })
      .catch(error =>{
        console.log(error)
      })
  item.dialogVisible = false
}

function fetchDataAndRefreshProduct(){
  axios.get('/admin/allProduct')
      .then(response => {
        if (response.status === 200) {

          productData.value = response.data.data.map(item => {
            return { ...item, dialogVisible: false };
          });

        }
      })
      .catch(error => {
        console.log(error)
      })
}
</script>

<style scoped>
.productDiv {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.product {
  display: grid;
  width: 450px;
  height: 250px;
  grid-gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  color: #333333;
  background-color: #f8f8f8;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>