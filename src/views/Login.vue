<template>
  <div class="login-container">
    <el-form
        ref="ruleFormRef"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="120px"
        class="login-form"
        label-position="top"
    >
      <div class="logo-container">
        <el-image :src="MC" class="logo" />
        <span class="system-title">餐厅点餐管理系统</span>
      </div>

      <el-form-item label="用户名" prop="username" class="form-item" label-width="90px">
        <el-input
            class="username"
            v-model="formData.username"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
            @blur="validateField('username')"
            style="width: 100%; max-width: 350px;"
        />
      </el-form-item>

      <el-form-item label="密码" prop="password" class="form-item" label-width="80px">
        <el-input
            class="password"
            v-model="formData.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            @blur="validateField('password')"
            style="width: 100%; max-width: 350px;"
        />
      </el-form-item>

      <el-form-item class="form-item" style="display: flex; justify-content: space-between;">
        <router-link to="/register" class="register-link">
          还没有账号？注册一个吧
        </router-link>
        <el-button type="primary" class="login-button" @click="submitForm">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import axios from "@/axios"
import {useRouter} from "vue-router";
import MC from "@/assets/icon/MC.png"

const router = useRouter()

const formData = ref({
  username: "",
  password: "",
  userInfo: 0  //判断用户等级！！！！！！！
});

// 使用 ref 来保存表单的引用
const ruleFormRef = ref(null);

const rules = {
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度为3到20个字符", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9_-]+$/, // 只允许字母、数字、短横线和下划线
      message: "用户名只能包含字母、数字、短横线和下划线",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 8, message: "密码长度至少为8个字符", trigger: "blur" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      message: "密码必须包含大小写字母和数字",
      trigger: "blur",
    },
  ],
}

const validateField = (field) => {
  // 使用 ref 引用表单并调用 validateField 方法手动触发字段的验证
  ruleFormRef.value.validateField(field);
}

const submitForm = async() => {
  try{
    const response = await axios.post(`/login`, formData.value)
    if (response.status === 200) {
      if (response.data.code === 200) {
        alert('登录成功')
        localStorage.setItem('token',response.data.data.token)
        console.log('123',response.data.data.userInfo.userInfo)
        const userInfo = response.data.data.userInfo.userInfo
        if (userInfo === 0) {
          await router.push({path: '/userOder'});
        }else if(userInfo === 1){
          await router.push({path: '/admin'})
        }
      }else if(response.data.code === 100006) {
        alert(response.data.message)
      }
    }else {
      console.log('登录失败')
      alert('登录失败，请重新尝试')
    }
  }catch (error){
    console.log('请求失败:',error)
  }
}
//执行登录token验证
onBeforeMount(async () =>{
  try {
    // 从 localStorage 中获取 token
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get(`/user/verifyUserToken`)
      console.log(response.data.data.timeOut)
      if (response.data.data.timeOut === false) {
        await router.push({path: '/userOder'});
      }
    }else {
      alert('用户登录已过期，请重新登录')
    }
  }
  catch (error){
    console.error(error)
  }
});
</script>

<style scoped>
.login-form .el-form-item__label {
  /* 调整错误提示的位置 */
  margin-bottom: 5px;
}

.login-form .el-form-item__error {
  /* 调整错误提示的样式 */
  color: #ff4444;
  font-size: 12px;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5; /* Light background color */
}

.login-form {
  width: 400px;
  padding: 20px;
  background-color: #ffffff; /* White background for the form */
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Box shadow for a subtle lift */
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px; /* Adjusted logo size */
  height: auto;
  margin-right: 10px;
}

.system-title {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.login-button {
  width: 48%; /* Adjusted button width for better spacing */
  background-color: #409eff; /* Primary color for the button */
  margin-left: -60px;
  margin-top: 50px;
}

.register-link {
  margin-top: -40px;

}
</style>

