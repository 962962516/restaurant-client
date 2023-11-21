<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="userId" label="管理员Id" width="320" />
    <el-table-column prop="username" label="Name" width="180" />
    <el-table-column >
      <template #default="scope">
        <div style="display: flex; height: 50px; width: 400px; margin-left: 400px">
          <el-button size="large" style="display: flex; background-color: #069c4e; color: white;margin-left: 0; margin-top: 5px"
                     @click="handleChangeUsername(scope.row)">
            更改用户名
          </el-button>
          <el-button size="large" style="display: flex; background-color: #069c4e; color: white; margin-top: 5px; margin-left: 40px " @click="changePassword(scope.row)">
            更改密码
          </el-button>
          <el-button size="large" style="display: flex; background-color: #da2315; color: white; margin-top: 5px; margin-left: 40px " @click="deleteAdmin(scope.row)">
            删除此管理员
          </el-button>

          <el-dialog
              v-model="dialogVisible"
              title="修改提示"
              width="30%"
          >
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px;">
              <span style="display: flex ; margin-top: 0; font-size: 18px">修改管理员名称</span><br>
              <el-input v-model="requestData.username" style="width: 200px"></el-input>
              <span class="dialog-footer" style="margin-right: 100px;">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="reportData(scope.row)">
                确定
              </el-button>
              </span>
            </div>
          </el-dialog>

          <el-dialog
              v-model="dialogVisible2"
              title="修改提示"
              width="30%"
          >
            <el-form ref="passwordForm" :model="requestDate2Temp" label-width="100px" :rules="rules">
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="requestDate2Temp.newPassword" type="password" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="surePassword">
                <el-input v-model="requestDate2Temp.surePassword" type="password" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="reportData2(scope.row)" :disabled="!isFormValid">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

        </div>
      </template>
    </el-table-column>
  </el-table>


</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";

onMounted(() => {
  axios.get('/enterprise/allAdmin')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          tableData.value = response.data.data
        }
      })
      .catch(error => {
        console.log(error)
      })
})
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const tableData = ref([])
const props = defineProps({
  allAdmin: {}
})

watch(()=> props.allAdmin,(newValue => {
  tableData.value = props.allAdmin
  console.log(tableData.value)
}))
const requestData = reactive({
  username: '',
  userId: {}
})
function handleChangeUsername(row){
  dialogVisible.value = true
  requestData.username = row.username
}
function reportData(row){
  console.log(row.userId)
  requestData.userId = row.userId
  axios.post('/enterprise/changeAdminUsername',requestData)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          ElMessage({
            message:'修改成功',
            type:'success'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  dialogVisible.value = false
}
function deleteAdmin(row){
  const userId = row.userId
  axios.post(`/enterprise/deleteAdmin?userId=${userId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          ElMessage({
            message: '删除成功',
            type: 'success'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
}

const rules = {
    newPassword: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 8, message: "密码长度至少为8个字符", trigger: "blur" },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
        message: "密码必须包含大小写字母和数字",
        trigger: "blur",
      },
    ],
    surePassword: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      {
        validator: (rule, value, callback) => {
          if (value !== requestDate2Temp.value.newPassword) {
            callback(new Error('新密码和确认密码不一致'));
          } else {
            callback();
          }
        },
        trigger: 'blur',
      },
    ],
}

const requestDate2Temp = ref({
  newPassword: '',
  surePassword: ''
});
const requestData2 = reactive({
  password: '',
  userId: {}
})
function changePassword(row){
  dialogVisible2.value = true
  requestData2.userId = row.userId
}
function reportData2(row){
  if (requestDate2Temp.value.newPassword === requestDate2Temp.value.surePassword) {
    requestData2.password = requestDate2Temp.value.newPassword
    requestData2.userId = row.userId
    axios.post('/enterprise/changeAdminPassword',requestData2)
        .then(response => {
          if (response.status === 200) {
            dialogVisible2.value = false
            console.log(response.data)
            ElMessage({
              message: '修改成功！',
              type: 'success'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
  }
}

const isFormValid = computed(() => {
  return requestDate2Temp.value.newPassword && requestDate2Temp.value.surePassword;
});
</script>


<style scoped>

</style>