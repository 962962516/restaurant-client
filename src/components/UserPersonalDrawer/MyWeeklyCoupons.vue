<template>
  <hr>
  <div class="myCoupons">
    <div class="userCoupon" v-for="(item, index) in weeklyCouponsDate" :key="index">
      <div>
        <el-image :src="item.imageUrl" style="width: 200px;height: 180px"/>
      </div>
      <span style="color: #545c64;">{{item.name}}</span>
      <span style="color: #545c64; font-size: 18px">{{item.priceAfterDiscount}}</span>
      <el-icon style="display: flex ;color: #545c64;margin-left: 55px; margin-top: -18px"><Money /></el-icon>
      <el-button class="use" @click="useCoupon(item)" style="margin-top: -30px; margin-left: 180px">使用</el-button>

      <el-dialog
          v-model="centerDialogVisible"
          title="消费卡卷提醒"
          width="30%"
          align-center
      >
        <span>亲，您确定要消费并下单此卡卷吗？</span>

        <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button :plain="true" type="primary" @click="isUseCoupon()">
          立即下单
        </el-button>
      </span>
      </el-dialog>

    </div>
  </div>
</template>

<script setup>
import {Money} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";
const centerDialogVisible = ref(false)
const weeklyCouponsDate = ref([])
onMounted(() => {
  getWeeklyCoupons()
})
async function getWeeklyCoupons(){
  try{
    const response = await axios.get('/user/getWeeklyCoupons')
    if (response.status === 200) {
      weeklyCouponsDate.value = response.data.data
      console.log('weeklyCouponsDate',weeklyCouponsDate.value)
    }
  }catch (error){
    console.log(error)
  }
}
function useCoupon(item){
  centerDialogVisible.value = true
  responseDate.comboId = item.comboId
  responseDate.productId = item.productId
  responseDate.isSingle = item.isSingle
  responseDate.isWeeklyCoupons = 1
  console.log('responseData',responseDate)
}

let oderNumber = 100000
const responseDate = reactive({
  comboId : ref(),
  productId : ref(),
  isSingle : ref(),
  oderNumber: oderNumber,
  isWeeklyCoupons: ref(0)
})
function isUseCoupon(){
  ElMessage({
    message: '下单成功, 请稍等正在为您准备餐品.',
    type: 'success',
  })
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
  getWeeklyCoupons(); //刷新数据
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