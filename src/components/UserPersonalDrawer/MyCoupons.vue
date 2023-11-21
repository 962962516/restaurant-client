<template>
  <hr>
  <div class="myCoupons">
    <div class="userCoupon" v-for="(item, index) in userCouponsDate" :key="index">
      <div>
        <el-image :src="item.imageUrl" style="width: 200px;height: 180px"/>
      </div>
      <span style="color: #545c64;">{{item.name}}</span>
      <span style="color: #545c64; font-size: 18px">{{item.priceAfterDiscount}}</span>
      <el-icon style="display: flex ;color: #545c64;margin-left: 55px; margin-top: -18px"><Money /></el-icon>
      <el-button class="use" @click="useCoupon(item)" style="margin-top: -30px; margin-left: 180px">使用</el-button>
    </div>
  </div>
  <el-dialog
      v-model="centerDialogVisible"
      title="消费卡卷提醒"
      width="30%"
      align-center
  >
    <span>亲，您确定要消费并下单此卡卷吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button :plain="true" type="primary" @click="isUseCoupon(item)">
          立即下单
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>

import {inject, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "@/axios";
import {Money} from "@element-plus/icons-vue";

  const props = defineProps({
    userCouponsDate : Array
  })
const centerDialogVisible = ref(false)
const item = ref()

function useCoupon(itemFromButton){
  console.log('item',item)
  centerDialogVisible.value = true
  item.value = itemFromButton
}

  let oderNumber = 200000
  const responseDate = reactive({
    name : ref(),
    comboId : ref(),
    productId : ref(),
    isSingle : ref(),
    oderNumber: oderNumber,
    isWeeklyCoupons: ref(0)
  })
function isUseCoupon(item){
  ElMessage({
    message: '下单成功, 请稍等正在为您准备餐品.',
    type: 'success',
  })
  responseDate.name = item.name
  responseDate.comboId = item.comboId
  responseDate.productId = item.productId
  responseDate.isSingle = item.isSingle

  //保存卡卷消费记录,并删除对应用户卡卷
  axios.post('/user/couponsHistory',responseDate)
      .then(response =>{
        if (response.status === 200) {
          console.log('success')
        }
      })
      .catch(error =>{
        console.log(error)
      })
  oderNumber++;
  centerDialogVisible.value = false
  refreshCoupons();
}

function refreshCoupons(){
  axios.get('/user/allCoupons')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.data)
          props.userCouponsDate = response.data.data
        }
      })
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.myCoupons {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 每行两列 */
  grid-gap: 20px; /* 间距 */
  background-color: white;
  margin-top: 20px;
}

.userCoupon {
  position: relative;
  height: 250px;
  border: 1px solid #ccc;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  margin-top: 20px;
}
.use{
  display: grid;
  position: relative;
  margin-top: 145px;
  margin-left: 150px;
}

</style>