<template>
    <el-button style="width: 160px; height: 40px; background-color: #07b880;color: white; margin-left: 850px; margin-top: 22px" @click="dialogVisible = true">
      <el-icon size="large" style="display: flex; margin-right: 8px"><Plus></Plus></el-icon>
      添加新餐品
    </el-button>

  <el-dialog
      v-model="dialogVisible"
      title="修改餐品信息"
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

    <span style="font-size: 16px;">餐品分类</span>
    <el-select v-model="selectedValue" class="m-2" placeholder="Select" size="default" style="margin-left: 20px;">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>

    <span class="dialog-footer" style="display: flex; margin-left: 55px; margin-top: 6px" >
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addProduct">
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
  import {useRouter} from "vue-router";

  const dialogVisible = ref(false)
  const selectedValue = ref()
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
    adiseListNo: 0,
    isHot: 0
  })

 //赋值adiseListNo
  watch(() =>selectedValue.value, (newValue) =>{
    console.log('selectedValue',selectedValue.value)
    requestDate.adiseListNo = selectedValue.value
  })

  const options = [
    {
      value: 2,
      label: '鸡肉汉堡/卷',
    },
    {
      value: 3,
      label: '巨无霸/牛肉汉堡',
    },
    {
      value: 4,
      label: '安格斯MAX厚牛堡',
    },
    {
      value: 5,
      label: '炸鸡',
    },
    {
      value: 7,
      label: '小食拼盘/甜品',
    },
    {
      value: 8,
      label: '麦咖啡/饮品',
    },
  ]



  watch(() => checked.value, (newValue) => {
    if (checked.value === false) {
      requestDate.isHot = 0
    }else {
      requestDate.isHot = 1
    }
  })

  const emit = defineEmits(['refresh'])
  function addProduct(){
    const refresh = ref(0)
    axios.post('/admin/addProduct',requestDate)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            ElMessage({
              message: '添加成功',
              type: 'success'
            })
            refresh.value = 1
            emit('refresh',refresh)
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