<template>
  <div class="UserAside">
    <div class="food1" style="height: 200px; width: 175px">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(1)">
        <el-image :src="List1" style="display: flex;height: 100px; width: 100px; margin-top: -20px; margin-left: -20px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -80px" >人气热卖</span>
      </el-button>
    </div>
    <div class="combo">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendComboRequest()">
        <el-image :src="List2" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -20px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -100px" >甄选套餐</span>
      </el-button>
    </div>
    <div class="food2">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(2)">
        <el-image :src="List2" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -10px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -110px" >鸡肉汉堡/卷</span>
      </el-button>
    </div>
    <div class="food3">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(3)">
        <el-image :src="List3" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -30px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -95px" >巨无霸<br>牛鱼汉堡</span>
      </el-button>
    </div>
    <div class="food4">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(4)">
        <el-image :src="List4" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -15px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -100px" ><br>安格斯MAX<br>厚牛堡</span>
      </el-button>
    </div>
    <div class="food5">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(5)">
        <el-image :src="List5" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -40px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -85px" >炸鸡</span>
      </el-button>
    </div>
    <div class="food5">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(7)">
        <el-image :src="List6" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -10px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -115px" >小食拼盘/甜品<br>/其他</span>
      </el-button>
    </div>
    <div class="food5">
      <el-button style="height: 200px; width: 175px; margin-top: 0; margin-left: 0" @click="sendRequest(8)">
        <el-image :src="List7" style="display: flex;height: 100px; width: 120px; margin-top: -50px; margin-left: -20px"></el-image>
        <span style="display: flex;margin-top: 100px; font-size: 16px; margin-left: -105px" > 麦咖啡/饮品<br>超值特惠</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import axios from '@/axios';
import List1 from '@/assets/icon/List1.jpg'
import List2 from '@/assets/icon/List2.jpg'
import List3 from '@/assets/icon/List3.jpg'
import List4 from '@/assets/icon/List4.jpg'
import List5 from '@/assets/icon/List5.jpg'
import List6 from '@/assets/icon/List6.jpg'
import List7 from '@/assets/icon/List7.jpg'

const emit = defineEmits(['FoodData']);
  function sendRequest(req) {
      const url = `/UserAside?adiseListNo=${req}`;
      axios.get(url)
          .then(response => {
            //console.log('GET请求成功', response.data);
            emit('FoodData',response.data) //向父组件传入数据
          })
          .catch(error => {
            console.error('GET请求失败', error);
          });
 }
  function sendComboRequest(){
    axios.get('/serAsideCombo')
        .then(response => {
          console.log(response.data)
          emit('FoodData',response.data)
        })
        .then(error => {
          console.log(error)
        })
  }
</script>


<style>
  .UserAside{
    background-color: white;
    height: auto;
    width: 175px;
  }
</style>