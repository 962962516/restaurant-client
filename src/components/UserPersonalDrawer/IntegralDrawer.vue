<template>

  <div class="integral">
    <p style="color: #545c64;">我的当前积分: {{integral}}</p>
    <hr>
    <p class="text" style="color: #545c64;">积分可兑换餐品</p>
<!--  50积分兑换  -->
    <div class="integral-img1">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="香芋派 50 积分"
          placement="top-start"
      >
      <el-button class="el-button1" @click="toDialogData(15)"></el-button>
      </el-tooltip>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="美式咖啡 50 积分"
          placement="top-start"
      >
        <el-button class="el-button2" @click="toDialogData(28)"></el-button>
      </el-tooltip>
    </div>

    <hr style="margin-top: 20px">

    <div class="integral-img2">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="中杯奶铁 100 积分"
          placement="top-start"
      >
        <el-button class="el-button3" @click="toDialogData(29)"></el-button>
      </el-tooltip>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="薯饼 100 积分"
          placement="top-start"
      >
        <el-button class="el-button4" @click="toDialogData(30)"></el-button>
      </el-tooltip>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="朱古力冰激凌 100 积分"
          placement="top-start"
      >
        <el-button class="el-button5" @click="toDialogData(31)"></el-button>
      </el-tooltip>
      </div>

      <hr style="margin-top: 20px">

      <div class="integral-img3">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="辣翅可乐组合 150 积分"
            placement="top-start"
        >
          <el-button class="el-button6" @click="toDialogDataCombo(1)"></el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="麦辣鸡翅 150 积分"
            placement="top-start"
        >
          <el-button class="el-button7" @click="toDialogData(8)"></el-button>
        </el-tooltip>
      </div>

      <hr style="margin-top: 20px">

      <div class="integral-img4">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="双杯奶铁 200 积分"
            placement="top-start"
        >
          <el-button class="el-button8" @click="toDialogDataCombo(2)"></el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="麦辣三件套 250 积分"
            placement="top-start"
        >
          <el-button class="el-button9" @click="toDialogDataCombo(3)"></el-button>
        </el-tooltip>
      </div>
    <hr style="margin-top: 20px">
    <h3 style="margin-top: 20px; color: #545c64">每周麦麦优惠卷</h3>

    <IntergralWeeklyDrawer :weekly-coupons="weeklyCoupons"></IntergralWeeklyDrawer>

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
        <el-button type="primary" @click="consumeIntegral(id)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
  import axios from "@/axios";
import IntergralWeeklyDrawer from "@/components/UserPersonalDrawer/IntergralDrawerChildren/IntergralWeeklyDrawer.vue";
  const props = defineProps({
    integral : Number,
    weeklyCoupons : Array
  })
  watch(()=>props.weeklyCoupons, (newDate)=>{
    console.log('zzz',newDate)
  })
  let id = ref(0)
  const requestData = reactive({//接收兑换商品的Id 单品
    productId : ref(0),
    integral : ref(0)
  })
  const requestDataCombo = reactive({
    comboId: ref(0),
    integral : ref(0)
  })
  let centerDialogVisible = ref(false)
  function toDialogData(productId) { //将商品id传入给响应式productId
    centerDialogVisible.value = true
    requestData.productId = productId
    id = productId
  }
function toDialogDataCombo(comboId){ //更改2件组合商品积分并保存到用户优惠卷
  centerDialogVisible.value = true
  requestDataCombo.comboId = comboId
  id = comboId
}
  function consumeIntegral(id){ //更改单件商品积分并保存到用户优惠卷 id：单品为productId 套餐为comboId
    if(id > 10 || id === 8){ //判断是否为组合套餐优惠卷
      if(id === 15 || id === 28){
        requestData.integral = 50
      }else if(id === 29 || id === 30 || id === 31){
        requestData.integral = 100
      }else if(id === 8){
        requestData.integral = 150
      }
      centerDialogVisible.value = false
      axios.post('/user/consumeIntegral',requestData)
          .then(response =>{
            if (response.status === 200) {
              console.log(response.data)
              if(response.data.code === 100012){
                alert('积分不够兑换此商品')
              }else if(response.data.code === 100014){
                alert('您已经兑换了此卡卷，请先使用后再来兑换')
              }else {
                alert('兑换成功')
              }
            }
          })
          .catch(error =>{
            console.log(error)
          })
    }else{
      if(id === 1){
        requestDataCombo.integral = 150
      }else if(id === 2){
        requestDataCombo.integral = 200
      }else if(id === 3){
        requestDataCombo.integral = 200
      }
      centerDialogVisible.value = false
      axios.post('/user/consumeComboIntegral',requestDataCombo)
          .then(response =>{
            console.log(response.data)
            if (response.status === 200) {
              if(response.data.code === 100012){
                alert('积分不够兑换此商品')
              }else if(response.data.code === 100014){
                alert('您已经兑换了此卡卷，请先使用后再来兑换')
              }
              else {
                alert('兑换成功')
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
    }

  }

</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-button1{
  display: flex;
  position: relative;
  height: 120px;
  width: 90px;
  margin-left: 60px;
  top: 50px;
  background: transparent;
  border: none;
  color: #333;
}

.el-button2 {
  display: flex;
  position: relative;
  height: 100px;
  width: 80px;
  left: 185px;
  bottom: 70px;
  margin-right: 10px; /* 设置按钮之间的间距 */
  background: transparent;
  border: none;
  color: #333;
}

.el-button3{
  display: flex;
  position: relative;
  height: 120px;
  width: 110px;
  margin-left: 40px;
  top: 30px;
  background: transparent;
  border: none;
  color: #333;
}

.el-button4 {
  display: flex;
  position: relative;
  height: 120px;
  width: 150px;
  left: 160px;
  bottom: 90px;
  margin-right: 10px; /* 设置按钮之间的间距 */
  background: transparent;
  border: none;
  color: #333;
}
.el-button5 {
  display: flex;
  position: relative;
  height: 95px;
  width: 110px;
  left: 110px;
  bottom: 110px;
  margin-right: 10px; /* 设置按钮之间的间距 */
  background: transparent;
  border: none;
  color: #333;
}
.el-button6{
  display: flex;
  position: relative;
  height: 170px;
  width: 160px;
  margin-left: 20px;
  top: 50px;
  background: transparent;
  border: none;
  color: #333;
}
.el-button7 {
  display: flex;
  position: relative;
  height: 170px;
  width: 160px;
  left: 175px;
  bottom: 140px;
  margin-right: 10px; /* 设置按钮之间的间距 */
  background: transparent;
  border: none;
  color: #333;
}
.el-button8{
  display: flex;
  position: relative;
  height: 170px;
  width: 160px;
  margin-left: 20px;
  top: 50px;
  background: transparent;
  border: none;
  color: #333;
}
.el-button9 {
  display: flex;
  position: relative;
  height: 170px;
  width: 160px;
  left: 175px;
  bottom: 140px;
  margin-right: 10px; /* 设置按钮之间的间距 */
  background: transparent;
  border: none;
  color: #333;
}
.el-button:hover,
.el-button:active,
.el-button:focus {
  background: transparent !important;
  outline: none !important; /* 防止按钮获取焦点时显示默认的轮廓 */
}
.text{
  display: flex; /* 使用 Flex 布局 */
  margin-left: 230px;
  margin-top: 15px;
}
.integral-img1{
  background-image: url("@/assets/icon/intergral/integral1.jpg");
  background-size: cover;
  margin-left: 120px;
  margin-top: 30px;
  height: 250px;
  width: 360px;
}
.integral-img2{
  background-image: url("@/assets/icon/intergral/integral2.jpg");
  background-size: cover;
  margin-left: 120px;
  margin-top: 30px;
  height: 250px;
  width: 360px;
}
.integral-img3{
  background-image: url("@/assets/icon/intergral/integral3.jpg");
  background-size: cover;
  margin-left: 120px;
  margin-top: 30px;
  height: 250px;
  width: 360px;
}
.integral-img4{
  background-image: url("@/assets/icon/intergral/integral4.jpg");
  background-size: cover;
  margin-left: 120px;
  margin-top: 30px;
  height: 250px;
  width: 360px;
}
.integral{
  font-size: 18px;
}
</style>