<template>
  <el-button style="width: 160px; height: 40px; background-color: #07b880;color: white; margin-left: 850px; margin-top: 22px" @click="dialogVisible = true">
    <el-icon size="large" style="display: flex; margin-right: 8px"><Plus></Plus></el-icon>
    添加新餐品
  </el-button>

  <el-dialog
      v-model="dialogVisible"
      title="修改套餐信息"
      width="30%"
  >
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
    <el-input v-model="requestDate.productName" style="margin-top: 20px; color: darkgrey"/>
    <span style="display:flex; margin-left: 0; font-size: 16px;margin-top: 20px">餐品描述:</span>
    <el-input
        v-model="requestDate.description"
        :rows="2"
        type="textarea"
        style="margin-top: 20px"
    />
    <div style="display: flex; margin-top: 20px; height: 80px">
      <span style="display:flex; margin-left: 0; margin-right: 10px ;font-size: 16px;margin-top: 20px; width: 80px">餐品价格:</span>
      <el-input v-model="requestDate.price" style="display: flex; ;margin-top: 20px ; color: darkgrey; width: 50px; height: 30px"></el-input>
      <span style="display:flex; margin-left: 50px; margin-right: 20px ;font-size: 16px;margin-top: 20px; width: 80px">餐品数量:</span>
      <el-input  v-model="requestDate.productCount" :readonly="true" style="display: flex; ;margin-top: 20px ; color: darkgrey; width: 50px; height: 30px"></el-input>
      <el-checkbox v-model="checked" size="large" style="display: flex; margin-top: 80px; margin-left: 0;font-size: 100px">人气热卖</el-checkbox>
    </div>

    <span class="dialog-footer" style="display: flex; margin-left: 55px; margin-top: 6px" >
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addCombo">
                确定
              </el-button>
              </span>

  </el-dialog>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
import {reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import axios from "@/axios";
import router from "@/router";

const dialogVisible = ref(false)
const props = defineProps({
  which: {}
})
const checked = ref(false)
const requestDate = reactive({
  productName: '',
  description: '',
  price: 0,
  imgUrl: '',
  productCount: 0,
  isHot: 0
})

watch(() => checked.value, (newValue) => {
  if (checked.value === false) {
    requestDate.isHot = 0
  }else {
    requestDate.isHot = 1
  }
})
function addCombo(){
  axios.post('/admin/addCombo',requestDate)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          ElMessage({
            message: '添加成功',
            type: 'success'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  dialogVisible.value = false
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

  // 将图片URL存储到 requestDate
  requestDate.imgUrl = response.data.replace("文件上传成功！文件访问URL：", "");

  console.log('123456',requestDate.imgUrl)

}

const beforeAvatarUpload = (file) => {
  // 上传之前的处理，可以在此处执行验证等逻辑
  if (file.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size cannot exceed 2MB!')
    return false
  }
  return true
}

watch(()=>dialogVisible.value, (newValue) => {
  if (newValue === false){
    const fileName = requestDate.imgUrl.slice(requestDate.imgUrl.lastIndexOf('/') + 1); // 使用 slice() 方法提取文件名
    axios.delete(`/admin/deleteImage?fileName=${fileName}`)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    imageUrl.value = {} //情况表单上的图片
  }
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
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