<template>
  <div class="weekly-coupons">
    <h1 class="weekly-title">每周优惠卷管理</h1>
    <hr class="divider">
    <div class="weekly-food" v-for="(item, index) in weeklyCouponsData" :key="index">
      <div class="food-info">
        <el-image :src="item.imageUrl" style=" display: flex;object-fit: contain; max-width: 200px; height: 200px; margin-top: 15px"/>
        <span class="food-name">{{ item.weeklyCouponsName }}</span>
        <span class="food-price">价格 ：{{ formatDecimal(item.price * item.discount) }} 元</span>
        <span class="food-discount">折扣 : {{item.discount * 10 }} 折</span>
        <span class="food-integral">所需积分: {{ item.integral }}</span>

      </div>
      <div class="button-container">
        <el-button class="exchange-button" @click="getAllProduct(item)" >更改</el-button>
      </div>

      <el-dialog
          v-model="item.dialogVisible"
          title="修改餐品信息"
          width="30%"
      >
        <span>更改每周优惠卷</span>
        <hr style="margin-top: 10px">
        <el-select v-model="requestData.productName" placeholder="请选择要更换的餐品名称" style="margin-top: 20px">
          <el-option
              v-for="(item, index) in allProduct"
              :key="index"
              :label="item"
              :value="item"
          ></el-option>
        </el-select>
        <span style="display: flex ;margin-top: 20px;">设置所需积分</span>
        <el-input-number
            v-model="requestData.integral"
            class="mx-4"
            :min="50"
            :max="500"
            controls-position="right"
        />
        <span style="display: flex; margin-left: 200px; margin-top: -55px">优惠后价格</span>
        <el-input-number
            v-model="requestData.price"
            class="mx-4"
            :min="1"
            :max="500"
            controls-position="right"
            style="display: flex; margin-left: 200px"
        />
        <span class="dialog-footer" style="display: flex ;margin-left: 50px">
              <el-button @click="item.dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="submit(item)">
                确定
              </el-button>
              </span>

      </el-dialog>
    </div>

  </div>

</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";
const weeklyCouponsData = ref([]);
onMounted(() => {
  weeklyCoupons();
});
async function weeklyCoupons() {
  try {
    const response = await axios.get('/user/weeklyCoupons');
    if (response.status === 200) {
      weeklyCouponsData.value = response.data.data.map(item => {
        return { ...item, dialogVisible: false };
      });
      console.log(weeklyCouponsData.value)
    }
  } catch (error) {
    console.log(error);
  }


}
function formatDecimal(value) {
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue)) {
    if (Number.isInteger(numericValue)) {
      return numericValue.toString();
    } else {
      return numericValue.toFixed(1);
    }
  }
  return value;
}
const allProduct = ref([])
async function getAllProduct(item){
  item.dialogVisible = true
  try{
    const response = await axios.get('/product/productName')
    if (response.status === 200) {
      allProduct.value = response.data.data
      console.log(response.data.data)
    }
  }catch (error){
    console.log(error)
  }
}

const requestData = reactive({
  weeklyCouponsId: ref(),
  productName : ref(''),
  integral: ref(50),
  price: ref(1)
})
async function submit(item){
  requestData.weeklyCouponsId = item.weeklyCouponsId
  try {
    const response = await axios.post('/admin/changeWeeklyCoupons',requestData)
    if (response.status === 200) {
      ElMessage({
        message: '更改成功',
        type: 'success'
      })
      await weeklyCoupons()
    }
  }catch (error){
    console.log(error)
  }
  item.dialogVisible = false
}
</script>

<style scoped>

.food-discount{
  display: flex;
  color: #888;
  margin-left: 220px;
  font-size: 14px;
  margin-top: 35px;
}
.weekly-coupons {
  align-items: center;
  width: 1400px;
  height: 800px;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 20px;
}

.weekly-title {
  color: #6b778c;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 600px;
}

.divider {
  border: 1.4px solid #a49f9f;
  width: 100%;
  margin-bottom: 20px;
}

.food-info{
  color: white;
}
.weekly-food {
  width: calc(33.33% - 10px); /* 每行占用 33.33% 的宽度，减去间距大小 */
  background-color: white;
  padding: 10px;
  margin-top: 10px;
  height: 250px;

}

.food-name {
  display: flex;
  font-size: 20px;
  margin-left: 220px;
  margin-top: -170px;
  color: black;
}

.food-price {
  display: flex;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 100px;
}

.food-integral {
  display: flex;
  font-size: 14px;
  color: #888;
  margin-left: 320px;
  margin-top: -22px;
}

.button-container {
  display: flex;
  align-items: center;
  margin-top: -30px;
  margin-left: 350px;
}

.exchange-button {
  margin-left: 10px;
}
.custom-dialog {
  /* 添加自定义样式来修改遮罩层的样式 */
  background-color: transparent; /* 设置背景为透明 */
}
</style>
