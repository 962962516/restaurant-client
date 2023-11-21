<template>
  <div class="register-container">
    <el-form
        ref="ruleFormRef"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="120px"
        class="register-form"
    >
      <el-form-item label="用户名" prop="username" class="form-item" label-width="70px">
        <el-input
            class="username"
            v-model="formData.username"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
            @blur="validateField('username')"
            style="width: 300px"
        />
      </el-form-item>

      <el-form-item label="密码" prop="password" class="form-item" label-width="55px">
        <el-input
            class="password"
            v-model="formData.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            @blur="validateField('password')"
            style="width: 300px"
        />
      </el-form-item>

      <el-form-item class="form-item">
        <el-button type="primary" class="submit-button" @click="submitForm">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import axios from "@/axios"

  const formData = ref({
    username : "",
    password : "",
    userInfo : 0
  })

  const ruleFormRef = ref(null)

  const rules = {
    username : [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      { min: 3, max: 20, message: "用户名长度为3到20个字符", trigger: "blur" },
      {
        pattern: /^[a-zA-Z0-9_-]+$/, // 只允许字母、数字、短横线和下划线
        message: "用户名只能包含字母、数字、短横线和下划线",
        trigger: "blur",
      },
    ],
    password : [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 8, message: "密码长度至少为8个字符", trigger: "blur" },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        message: "密码必须包含大小写字母、数字和特殊字符",
        trigger: "blur",
      },
    ]
  }

  const validateField = (field) => {
    // 使用 ref 引用表单并调用 validateField 方法手动触发字段的验证
    ruleFormRef.value.validateField(field);
  }

  const submitForm = async() => {
    await ruleFormRef.value.validate();
    const response = await axios.post("/register", formData.value)
    try{
      if (response.status === 200) {
        if (response.data.code === 200) {
          alert('注册成功')
        }else if(response.data.code === 100007) {
          alert(response.data.message)
        }
      }
    }catch (error){
      console.log('请求失败',error)
    }

  }
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.register-form {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

}

.form-item {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.username,
.password {
  width: 100%;
  margin-top: 10px;
}

.submit-button {
  width: 100%;
  background-color: #67c23a;
}

.submit-button:hover {
  background-color: #5aaf31;
}
</style>
