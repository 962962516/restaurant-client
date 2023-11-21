<template>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 20px; padding: 20px; background-color: #f5f5f5;">
    <div v-for="(item, index) in serviceRating" :key="index" style="border: 1px solid #ccc; padding: 20px; background-color: #fff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <div style="height: 400px;">
        <el-avatar :icon="UserFilled" style="margin-top: 5px"/>
        <span style="color: #4c4b4b; margin-left: 20px;">{{ item.userId }}</span>
        <span style="display: flex; align-items: center; color: darkgrey; margin-top: 15px;margin-left: 5px">评分</span>
        <el-rate
            v-model="item.rating"
            :texts="['很差', '较差', '一般', '良好', '优秀']"
            show-text
            size="large"
            :disabled="true"
            style="margin-top: 10px;"
        />
        <span style="color: #4c4b4b; margin-top: 10px; display: block;">反映类型: {{ item.raClass }}</span>
        <el-input
            :disabled="true"
            v-model="item.reaction"
            :rows="6"
            type="textarea"
            style="margin-top: 30px;"
        />
      </div>
    </div>
  </div>


</template>

<script setup>
  import {ref} from "vue";
  import {UserFilled} from "@element-plus/icons-vue";

  const props = defineProps({
    serviceRating: ref({})
  })
  const serviceRating = props.serviceRating
</script>

<style scoped>

</style>