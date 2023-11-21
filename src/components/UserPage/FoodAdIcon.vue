<template>
  <div class="el-div">
    <el-carousel indicator-position="outside" class="custom-carousel">
      <el-carousel-item v-for="(item, index) in imageList" :key="index">
        <el-image style="width: 1450px; height: 40vh;border-radius: 10px" :src="item"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
  import Ad1 from '@/assets/icon/Ad1.png'
  import Ad2 from '@/assets/icon/Ad2.png'
  import Ad3 from '@/assets/icon/Ad3.png'
  import Ad4 from '@/assets/icon/Ad4.png'
  const imageList = {
    Ad2,
    Ad1,
    Ad3,
    Ad4,
  }
</script>

<style scoped>
.el-div {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%;
  height: 40vh; /* 或者适当的高度 */
  border-radius: 10px;
}

.custom-carousel {
  margin-top: 100px;
  width: 1450px;
  height: 45vh;
  border-radius: 10px;
}

.carousel-item-content {
  font-size: 2rem;
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>