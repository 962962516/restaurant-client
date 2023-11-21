<template>
  <h3 style="margin-bottom: 30px; color: #333333">设置</h3>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item title="个人信息" name="1" style="font-size: large">
        <span class="span1">完善你的个人信息</span>
        <hr style="margin-top: 15px">
        <span class="span2" style="margin-top: 15px">你的邮箱</span>
        <el-form class="form1">
          <el-input
              v-model="requestDate.email"
              placeholder="请输入您的邮箱"
              size="large"/>
        </el-form>
        <span style="display: flex; margin-top: 10px; font-size: 16px; color: darkgray">方便我们将新的食品或新的活动和优惠发到您的邮箱</span>
        <span class="span2" style="margin-top: 15px">你的电话</span>
        <el-form class="form1">
          <el-input
              v-model="requestDate.phone"
              placeholder="请输入您的号码"
              size="large"/>
        </el-form>
        <span style="display: flex; margin-top: 10px; font-size: 16px; color: darkgray">如有重要通知时，我们会及时联系您</span>
        <el-button :plain="true" round style="margin-top: 35px; height: 30px; width: 90px; margin-left: 210px; background-color: cornflowerblue; color: #f2f2f2" @click="UserPersonInfo()">确认</el-button>
      </el-collapse-item>
      <el-collapse-item title="联系客服" name="2">
        <span style="margin-top: 15px; font-size: 20px">客服电话: 19802181518</span>
      </el-collapse-item>
    </el-collapse>

    <el-button @click="outLogin()" style=" display: flex; margin-left: 170px; margin-top: 550px; height: 40px; width: 200px; font-size: 18px; background-color: cornflowerblue; color: #f2f2f2" round>退出登录</el-button>
  </div>
</template>
<script setup>

import {reactive} from "vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
const requestDate = reactive({
  email : '',
  phone : ''
})
function UserPersonInfo(){
  axios.post('/user/personalInfo',requestDate)
      .then(response => {
        if (response.status === 200) {
          ElMessage({
            message: '提交成功',
            type: 'success',
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
}
// 使用 router.push 进行页面跳转
const router = useRouter();
function outLogin(){
  // 清除本地存储中的令牌
  localStorage.removeItem("token");

  router.push("/login");
}
</script>
<style scoped>
.span1,.span2{
  display: flex;
  margin-top: 10px;
  font-size: 16px;
}
.form1{
  margin-top: 15px;
}
</style>