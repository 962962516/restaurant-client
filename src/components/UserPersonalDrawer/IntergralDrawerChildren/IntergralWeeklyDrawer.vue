<template>
  <div class="weekly-coupons">
    <div class="weekly-food" v-for="(item,index) in weeklyCoupons" :key="index">
      <el-image :src="item.imageUrl" style="height: 130px; width: 150px;"/>
      <span style="font-size: 14.5px;color: #545c64; ">
        {{item.weeklyCouponsName}}
      </span>
      <span class="price" style="color: #545c64; font-size: 14px; width: 200px; margin-top: 0;margin-left: 0">
        折后价格：{{formatDecimal(item.price * item.discount)}}
      </span>
      <span class="integral" style="color: #545c64">
        所需积分: {{item.integral}}
      </span>
      <div class="button-container">
        <el-button class="el-button" @click="toDialog(item)" type="primary" style="margin-top: -10px; height: 25px;width: 40px; margin-left: 110px">兑换</el-button>
      </div>
    </div>
  </div>

  <el-dialog
      v-model="centerDialogVisible"
      title="消费兑换积分提示"
      width="30%"
      align-center
  >
    <span>您确定要兑换此优惠卷嘛？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="consumeIntegral(selectedItem)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
  import {CirclePlusFilled} from "@element-plus/icons-vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";
let centerDialogVisible = ref(false)
  const props = defineProps({
    weeklyCoupons : Array
  })
  watch(()=> props.weeklyCoupons,(newData)=>{
    console.log('222',props.weeklyCoupons)
  })

  function formatDecimal(value) {  //输出控制price
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      if (Number.isInteger(numericValue)) {
        // 如果是整数，不显示小数点
        return numericValue.toString();
      } else {
        // 如果是小数，保留一位小数
        return numericValue.toFixed(1);
      }
    }
    return value;
  }
  let selectedItem = ref(null);

  const weeklyCouponsId = ref()

  function toDialog(item){
    centerDialogVisible.value = true
    selectedItem.value = item
  }
  function consumeIntegral(item){
    weeklyCouponsId.value = item.weeklyCouponsId
    centerDialogVisible.value = false
    axios.post(`/user/consumeWeeklyCoupons?weeklyCouponsId=${weeklyCouponsId.value}`)
        .then(response =>{
          console.log(response.data)
          if (response.status === 200) {
            if(response.data.code === 100012){
              alert('积分不够兑换此商品')
            }
            else {
              ElMessage({
                message: '兑换成功',
                type: 'success'
              })
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
  }

</script>
<style>
.integral{
  font-size: 14px;
  margin-bottom: 5px;
}
.price{
  display: flex;
  position: relative;
  margin-top: 60px;
  margin-left: 120px;
}
.button-container {
  display: flex;
  position: relative;
}

.el-button {
  margin-top: 50px;
  margin-left: 105px; /* 按钮左外边距 */
}

.weekly-coupons {
  display: flex;
  position: relative;
  flex-wrap: wrap; /* 允许元素换行 */
  justify-content: space-between; /* 元素之间的间距均匀分布 */
  gap: 10px; /* 元素之间的间距大小 */
}

.weekly-food {
  width: calc(33.33% - 10px); /* 每行占用 33.33% 的宽度，减去间距大小 */
  background-color: white;
  border-radius: 10px;
  border: 1px ;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 50px;
  height: 250px;
  border: 1px solid #ccc;
}
</style>