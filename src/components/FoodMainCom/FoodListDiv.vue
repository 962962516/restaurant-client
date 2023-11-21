<template>
  <div class="food-list">
    <div class="food" v-for="(item, index) in receivedData.data" :key="index">
      <div class="food-left">
        <el-image :src="item.imageUrl" class="image"></el-image>
      </div>
      <div class="food-right">
        <span class="food-name">{{ item.name }}</span>
        <span style="color: #cccccc; margin-top: 20px; margin-left: 30px">描述：{{item.description}}</span>
        <span class="food-price" v-if="isVip === 0">{{ item.price }}</span>

        <div v-if="isVip === 1" style="margin-top: 20px">
          <hr class="custom-hr">
          <span class="custom-text" v-if="isVip === 1">
          原价：{{ item.price }}
        </span>
        </div>
        <span style="font-size: 40px;color: #4c4b4b; margin-left: 250px" v-if="isVip === 1">{{ (item.price * 0.8).toFixed(0) }}</span>

        <el-icon style="color: black; margin-left: 300px; margin-top: -30px"><Money /></el-icon>
        <el-button class="add-button" @click="addToMyList(item)" type="primary" plain circle :size="buttonSize">
          <el-icon class="add-icon"><CirclePlusFilled></CirclePlusFilled></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, ref, watch, watchEffect} from "vue";
import {CirclePlusFilled, Money} from "@element-plus/icons-vue";
import axios from "@/axios";
import {ElMessage} from "element-plus";

const buttonSize = 'small'; // 按钮大小，可以根据需要调整
const productCountsTemp = inject('productCountsTemp')
const productCounts = inject('productCounts'); // 全局变量
const receivedData = ref(props.data);
const isVip = ref(0)
onMounted(() => {
  sendComboRequest()
  getUserIsVip()
})
function sendComboRequest(){
  axios.get('/serAsideCombo')
      .then(response => {
        console.log(response.data)
        receivedData.value = response.data
      })
      .then(error => {
        console.log(error)
      })
}
function getUserIsVip(){
  axios.get('/user/isVip')
      .then(response => {
        isVip.value = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
}

const props = defineProps({
  data: {},
});


watch(() => props.data, (newData) => {
  receivedData.value = newData;
  console.log("子组件 receivedData 更新了:", receivedData.value);
});

const emit = defineEmits(['myOder']);

function addToMyList(item) {
  // 统计点餐数量
  const productName = item.name;
  productCountsTemp.value[productName] = (productCountsTemp.value[productName] || 0) + 1;
  // 向父组件发送点击的数据

  emit('myOder', item);
  console.log('myOder发出的数据', item);
  ElMessage({
    message: '添加成功',
    type: 'success'
  })

}

  // 使用 watch 监视 productCountsTemp 的变化
  watchEffect(() => {
    // 在这里监听 productCountsTemp 的变化并更新全局变量 productCounts
    productCounts.value = { ...productCountsTemp.value }; // 创建一个新对象以触发响应
    console.log('productCounts全局变量更新',productCounts.value)

  });

</script>

<style scoped>
.custom-hr {
  position: absolute;
  width: 90px;
  border: none;
  border-top: 1px solid #4c4b4b; /* 添加边框样式，模拟 <hr> 的外观 */
  color: #4c4b4b;
  margin-top: 16px;
  margin-left: 25px;
  border-top: 2px solid #4c4b4b;
}

.custom-text {
  font-size: 22px;
  color: #4c4b4b;
  margin-left: 30px;
  margin-top: 15px;
  position: relative; /* 为了让文本正常显示 */
}
.image {
  height: 200px;
  width: 200px;
  margin-left: 10px;
}

.food-left {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 调整间距 */

}

.food-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.food-name {
  font-size: 28px;
  color: #181818;
  margin-left: 30px;
  margin-top: 5px;
}

.food-price {
  font-size: 40px;
  margin-left: 250px;
  margin-top: 30px;
  color: #181818;
}

.add-button {
  background-color: #222222;
  margin-top: -25px;
  margin-left: 360px;
}

.add-icon {
  color: goldenrod;
  font-size: 45px;
}

.food {
  height: 250px;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40vw;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
}

.food-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  background-color: whitesmoke;
  margin-left: -5px;
  margin-top: 10px;
  padding: 20px;
  border-radius: 10px;
}
</style>