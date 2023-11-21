<template>
  <div style="border-radius: 10px">
<!--    单品！！！-->
    <el-tabs type="border-card" @tab-click="handleChick" v-model="activeName">
      <el-tab-pane label="单品" name="one" >
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

          <AddProduct :which="which = 1" @refresh="handleRefresh"></AddProduct>

        </div><br>

        <div class="productDiv">
          <div class="product" v-for="(item, index) in productData" :key="index" >
            <div style="display: flex; align-items: center;">
              <div style="width: 150px; height: 150px;">
                <el-image :src="item.imgUrl" style="max-width: 180px; max-height: 180px; margin-left: 20px"></el-image>
              </div>
              <div style="margin-left: 20px; display: grid; height: 200px; margin-top: 10px">
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">{{item.productName}}</span>
                <span style="font-size: 14px;display: flex;height: 20px; width: 200px;margin-top: 10px; margin-left: 20px; color: #cccccc">描述: {{item.description}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">价格: {{item.price}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">商品数量: {{item.productCount}}</span>
                <div style="display: flex ;margin-top: -70px; margin-left: 30px; height: 40px; width: 120px">
                  <el-button style="width: 50px;background-color: #da2315;color: white" @click="open(item)">删除</el-button>
                  <el-button style="width: 80px; background-color: cornflowerblue;color: white" @click="handleClick1(item)">修改</el-button>
                </div>
              </div>
            </div>



            <el-dialog
                v-model="item.dialogVisible"
                ref="upload"
                title="修改餐品信息"
                width="30%"
                :close-on-click-modal="false"
            >
           <!--修改图片-->
              <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  action="http://localhost:8080/admin/productPicture"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar"  alt="Preview Image"/>
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>

              <span style="display:flex; margin-left: 0; font-size: 16px">餐品名称:</span>
              <el-input v-model="requestData.productName" style="margin-top: 20px; color: darkgrey"/>
              <span style="display:flex; margin-left: 0; font-size: 16px;margin-top: 20px">餐品描述:</span>
              <el-input
                  v-model="requestData.description"
                  :rows="2"
                  type="textarea"
                  style="margin-top: 20px"
              />
              <div style="display: flex; margin-top: 20px">
                <span style="display:flex; margin-left: 0; margin-right: 10px ;font-size: 16px;margin-top: 20px; width: 80px">餐品价格:</span>
                <el-input v-model="requestData.productPrice" style="display: flex; ;margin-top: 20px ; color: darkgrey; width: 50px; height: 30px"></el-input>
                <span style="display:flex; margin-left: 50px; margin-right: 20px ;font-size: 16px;margin-top: 20px; width: 80px">餐品数量:</span>
                <el-input  v-model="requestData.productCount" :readonly="true" style="display: flex; ;margin-top: 20px ; color: darkgrey; width: 50px; height: 30px"></el-input>
                <el-checkbox v-model="checked" size="large" style="display: flex; margin-top: 80px; margin-left: 0;font-size: 100px">人气热卖</el-checkbox>
              </div>
              <span class="dialog-footer" style="margin-right: 100px">
              <el-button @click="closeDialog(item)">取消</el-button>
              <el-button type="primary" @click="reportData(item)">
                确定
              </el-button>
              </span>

            </el-dialog>

          </div>
        </div>
      </el-tab-pane>

<!--      套餐！！！ -->
      <el-tab-pane label="套餐" name="two">

        <div style="display: flex; background-color: #f0f0f0; height: 80px">
          <el-autocomplete
              style="display: flex; height: 35px; margin-top: 20px; margin-left: 20px; width: 300px;"
              v-model="searchCombo"
              clearable
              :fetch-suggestions="fetchSuggestionsCombo"
              :trigger-on-focus="false"
              placeholder="搜索"
              value-key="productName"
              @select="handleSelectCombo"
          >
            <template v-slot:suffix>
              <el-icon><search></search></el-icon>
            </template>
          </el-autocomplete>

          <AddCombo :which="which = 1" ></AddCombo>

        </div><br>


        <div class="productDiv">
          <div class="product" v-for="(item, index) in comboData" :key="index">
            <div style="display: flex; align-items: center;">
              <div style="width: 150px; height: 150px;">
                <el-image :src="item.imgUrl" style="max-width: 180px; max-height: 180px; margin-left: 20px"></el-image>
              </div>
              <div style="margin-left: 20px; display: grid; height: 200px; margin-top: 10px">
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">{{item.productName}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px; color: #cccccc;">描述: {{item.description}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">价格: {{item.price}}</span>
                <span style="display: flex;height: 20px; width: 200px;margin-top: 20px; margin-left: 20px">商品数量: {{item.productCount}}</span>
                <div style="display: flex ;margin-top: -70px; margin-left: 30px; height: 40px; width: 120px">
                  <el-button style="width: 50px;background-color: #da2315;color: white" @click="open2(item)">删除</el-button>
                  <el-button style="width: 80px; background-color: cornflowerblue;color: white" @click="handleClick2(item)">修改</el-button>
                </div>
              </div>
            </div>

            <el-dialog
                v-model="item.dialogVisible"
                title="修改餐品信息"
                width="30%"
                :close-on-click-modal="false"
            >
              <!--修改图片-->
              <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessCombo"
                  :before-upload="beforeAvatarUpload"
                  action="http://localhost:8080/admin/productPicture"
              >
                <img v-if="imageUrlCombo" :src="imageUrlCombo" class="avatar"  alt="Preview Image"/>
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>

              <span style="display:flex; margin-left: 0; font-size: 16px">餐品名称:</span>
              <el-input v-model="requestComboData.productName" style="margin-top: 20px; color: darkgrey"/>
              <span style="display:flex; margin-left: 0; font-size: 16px;margin-top: 20px">餐品描述:</span>
              <el-input
                  v-model="requestComboData.description"
                  :rows="2"
                  type="textarea"
                  style="margin-top: 20px"
              />
              <div style="display: flex; margin-top: 20px">
                <span style="display:flex; margin-left: 0; margin-right: 10px ;font-size: 16px;margin-top: 20px; width: 80px">餐品价格:</span>
                <el-input v-model="requestComboData.price" style="display: flex; ;margin-top: 20px ; color: darkgrey; width: 50px; height: 30px"></el-input>
                <span style="display:flex; margin-left: 50px; margin-right: 20px ;font-size: 16px;margin-top: 20px; width: 80px">餐品数量:</span>
                <el-input  v-model="requestComboData.productNumber" :readonly="true" style="display: flex; ;margin-top: 20px ; color: darkgrey; width: 50px; height: 30px"></el-input>
                <el-checkbox v-model="checked" size="large" style="display: flex; margin-top: 80px; margin-left: 0;font-size: 100px">人气热卖</el-checkbox>
              </div>
              <span class="dialog-footer" style="margin-right: 100px">
              <el-button @click="closeComboDialog(item)">取消</el-button>
              <el-button type="primary" @click="reportComboData(item)">
                确定
              </el-button>
              </span>

            </el-dialog>

          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script setup>
import axios from "@/axios";
import {onMounted, reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {Plus, Search} from "@element-plus/icons-vue";
import AddProduct from "@/components/AdminCom/AdminMainCom/AddProduct.vue";
import AddCombo from "@/components/AdminCom/AdminMainCom/AddCombo.vue";

import {ElMessageBox } from 'element-plus'
const refresh = ref(0)

const activeName = ref('one')  //页面默认挂载数据
onMounted(() => {
  axios.get('/admin/allProduct')
      .then(response => {
        if (response.status === 200) {
          productData.value = response.data.data.map(item => {
            return { ...item, dialogVisible: false };
          });
        }
        console.log(productData.value)
      })
      .catch(error => {
        console.log(error);
      });
})

function handleRefresh(data){
  refresh.value = data
}
watch(()=> refresh.value, (newValue) => {
  fetchDataAndRefreshProduct()
})
const open = item => {
  const productId = item.productId
  ElMessageBox.confirm(
      '您是否确认要删除此餐品？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        axios.delete(`/admin/deleteProduct/${productId}`)
            .then(response => {
              if (response.status === 200) {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                fetchDataAndRefreshProduct()
              }
            })
            .catch(error => {
              console.log(error)
            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
}  //单品删除逻辑
const open2 = item => {
  const comboId = item.comboId
  ElMessageBox.confirm(
      '您是否确认要删除此餐品？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        axios.delete(`/admin/deleteCombo/${comboId}`)
            .then(response => {
              if (response.status === 200) {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                fetchDataAndRefreshCombo()
              }
            })
            .catch(error => {
              console.log(error)
            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
}

const productData = ref([]);
const comboData = ref([])
const which = ref(1)
//单品搜索
const searchProduct = ref('');
//套餐搜索
const searchCombo = ref('')
let searchProductRequest = '';
let searchComboRequest = ''
const fetchSuggestions = ref([]);
const fetchSuggestionsCombo = ref([])
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

// 监听套餐搜索输入的变化
watch(searchCombo, (newValue) => {
  searchComboRequest = newValue;
  // 发送API请求
  axios.get(`/admin/searchCombo?productName=${searchComboRequest}`)
      .then(response => {
        // 提取数据并存储在fetchSuggestions中
        fetchSuggestionsCombo.value = response.data.data //展示查询出的餐品名
        comboData.value = response.data.data //将查出的数据动态到列表中
        console.log(fetchSuggestionsCombo.value)
      })
      .catch(error => {
        console.log(error);
      });
});
// 处理选择项的逻辑
const handleSelect = (item) => {
  console.log("Selected item (JSON):");
  console.log(JSON.stringify(item, null, 2));

  productData.value = [item]

  console.log('123',productData.value)
};
const handleSelectCombo = (item) => {
  console.log("Selected item (JSON):");
  console.log(JSON.stringify(item, null, 2));

  comboData.value = [item]

  console.log('123',productData.value)
}

onMounted(() => {

})
const handleChick = (tab, event) => {
  const tabName = tab.paneName;
  if (tabName === 'one') {
    axios.get('/admin/allProduct')
        .then(response => {
          if (response.status === 200) {
            productData.value = response.data.data.map(item => {
              return { ...item, dialogVisible: false };
            });
          }
          console.log(productData.value)
        })
        .catch(error => {
          console.log(error);
        });
  }else {
    axios.get('/admin/allCombo')
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            comboData.value = response.data.data.map(item => {
              return { ...item, dialogVisible: false}
            })
            console.log(comboData.value)
          }
        })
        .catch(error =>{
          console.log(error)
        })
  }
};
const requestData = reactive({
  productId: ref(),
  productName : ref(),
  description : ref(),
  productPrice : ref(),
  productCount : ref(),
  imgUrl: ref(''),
  adiseListNo : ref(),
  isHot : ref()
})
const requestComboData = reactive({
  comboId: ref(),
  productName : ref(),
  productNumber: ref(),
  description : ref(),
  imgUrl: ref(''),
  price: ref(),
  isHot: ref()
})
const checked = ref(false)
function handleClick1(item){
  item.dialogVisible = true
  requestData.productId = item.productId
  requestData.productName = item.productName
  requestData.description = item.description
  requestData.productPrice = item.price
  requestData.productCount = item.productCount
  requestData.isHot = item.isHot
  requestData.adiseListNo = item.adiseListNo
}
function handleClick2(item){
  item.dialogVisible = true
  requestComboData.comboId = item.comboId
  requestComboData.productName = item.productName
  requestComboData.productNumber = item.productNumber
  requestComboData.description = item.description
  requestComboData.price = item.price
  requestComboData.isHot = item.isHot
}
function reportData(item){
  if (checked.value === false) {
    requestData.isHot = 0
  }else {
    requestData.isHot = 1
    checked.value = false
  }
  axios.post('/admin/reviseProduct',requestData)
      .then(response => {
        if (response.status === 200) {
          console.log('reviseProduct',response.data)
          fetchDataAndRefreshProduct()
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
        }
      })
      .catch(error =>{
        console.log(error)
      })
  item.dialogVisible = false
  requestData.imgUrl = ''
  imageUrl.value = ''
}
function fetchDataAndRefreshProduct() { //刷新修改后的数据并展示
  axios.get('/admin/allProduct')
      .then(response => {
        if (response.status === 200) {
          productData.value = response.data.data.map(item => {
            return { ...item, dialogVisible: false };
          });
          console.log(productData.value);
        }
      })
      .catch(error => {
        console.log(error);
      });
  axios.get('/admin/deleteMoreImages')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
}

function reportComboData(item){
  if (checked.value === false) {
    requestComboData.isHot = 0
  }else {
    requestComboData.isHot = 1
    checked.value = false
  }
  axios.post('/admin/reviseCombo',requestComboData)
      .then(response => {
        if (response.status === 200) {
          fetchDataAndRefreshCombo()
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
        }
      })
      .catch(error =>{
        console.log(error)
      })
  item.dialogVisible = false
  requestComboData.imgUrl = ''
  imageUrlCombo.value = ''
}

function fetchDataAndRefreshCombo() { //刷新修改后的数据并展示
  axios.get('/admin/allCombo')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          comboData.value = response.data.data.map(item => {
            return { ...item, dialogVisible: false}
          })
          console.log(comboData.value)
        }
      })
      .catch(error =>{
        console.log(error)
      })
}

//图片上传
const imageUrl = ref('')
watch(()=> imageUrl.value, (newValue)=> {
  console.log('url',imageUrl.value)
})
const handleAvatarSuccess = (response, file) => {
  // 上传成功后的处理
  imageUrl.value = URL.createObjectURL(file.raw);
  console.log(response.data)
  requestData.imgUrl = response.data.replace("文件上传成功！文件访问URL：", "");
  console.log('123456',requestData.imgUrl)
}

const beforeAvatarUpload = (file) => {
  // 上传之前的处理，可以在此处执行验证等逻辑
  if (file.type !== 'image/jpeg') {
    ElMessage.error('请上传jpg格式的图片')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

function closeDialog(item){   //取消时的操操作
  item.dialogVisible = false
  if (requestData.imgUrl !== null) {
    const fileName = requestData.imgUrl.slice(requestData.imgUrl.lastIndexOf('/') + 1); // 使用 slice() 方法提取文件名
    axios.delete(`/admin/deleteImage?fileName=${fileName}`)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    requestData.imgUrl = null
    imageUrl.value = null
  }
}

//套餐图片上传
const imageUrlCombo = ref('')
watch(()=> imageUrlCombo.value, (newValue)=> {
  console.log('url',imageUrlCombo.value)
})
const handleAvatarSuccessCombo = (response, file) =>{
  // 上传成功后的处理
  imageUrlCombo.value = URL.createObjectURL(file.raw);
  console.log(response.data)
  requestComboData.imgUrl = response.data.replace("文件上传成功！文件访问URL：", "");
  console.log('123456',requestData.imgUrl)
}

//beforeAvatarUpload共用

function closeComboDialog(item){   //取消时的操操作
  item.dialogVisible = false
  if (requestComboData.imgUrl !== null) {
    const fileName = requestComboData.imgUrl.slice(requestComboData.imgUrl.lastIndexOf('/') + 1); // 使用 slice() 方法提取文件名
    axios.delete(`/admin/deleteImage?fileName=${fileName}`)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    requestComboData.imgUrl = null
    imageUrlCombo.value = null
  }
}

</script>

<style scoped>
.productDiv {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.product {
  border-radius: 10px;
  display: grid;
  width: 450px;
  height: 250px;
  grid-gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  color: #333333;
  background-color: white;
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
