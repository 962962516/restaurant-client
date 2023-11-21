<template>
  反馈主题<span style="font-size: 18px; margin-left: 40px">{{ faClass }}</span>
  <hr style="margin-top: 16px">
  <div>
    <span style="font-size: 18px" class="span1">服务评价</span>
    <el-rate
        v-model="requestDate.rating"
        :texts="['很差', '较差', '一般', '良好', '优秀']"
        show-text
        size="large"
        style="margin-top: 15px; margin-left: 15px"
    />
  </div>
  <div>
    <el-input
        v-model="requestDate.reaction"
        :rows="8"
        type="textarea"
        placeholder="请简要描述您的问题或建议"
        style="margin-top: 20px"
    />
    <el-button size="default" style="height: 35px; width: 100px; margin-top: 25px; margin-left: 200px; background-color: cornflowerblue; color: #f2f2f2" round @click="submit()" :plain="true">提交</el-button>
  </div>
</template>

<script setup>
import { reactive, ref, watch, defineProps } from "vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";
const props = defineProps({
  faClass: String
});
const requestDate = reactive({
  raClass: ref(''),
  rating: ref(''),
  reaction: ref()
});

function submit() {
  requestDate.raClass = props.faClass
  console.log(requestDate.raClass)
  axios.post('/user/serviceRating', requestDate)
      .then(response => {
        if (response.status === 200) {
          ElMessage({
            message: '提交成功',
            type: 'success',
          })
        }else {
          ElMessage.error('提交失败')
        }
      })
      .catch(error => {
        console.log(error)
      })
}
</script>


<style scoped>

</style>