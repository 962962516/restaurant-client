<template>
  <el-container style="height: 100vh; width: 100vw">
    <el-header style="height: 7vh; background-color: white; border: 1px  solid black"><UserHead></UserHead></el-header>
    <el-container>
      <el-aside class="custom-scrollbar" width="175px">
        <UserAside @FoodData="handleDataUpdated"></UserAside>
      </el-aside>
      <el-container>
        <el-main class="main-content" style="background-color: whitesmoke; height: calc(100vh - 6vh);">
          <div class="main-content-inner">
            <FoodAdIcon style="margin-top: -15px"></FoodAdIcon>
            <hr style="color: #f2f2f2; ">
            <FoodListDiv :data="state.receivedData"  @myOder="handleMyOder" ></FoodListDiv>
          </div>
        </el-main>
        <el-footer style="height: 6vh; background-color: white; border-top: 1px solid #4c4b4b;"><UserFoot :data="state.receivedMyOder"></UserFoot></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>



<script lang="ts" setup>
  import UserAside from "@/components/UserPage/UserAside.vue";
  import UserHead from "@/components/UserPage/UserHead.vue";
  import FoodAdIcon from "@/components/UserPage/FoodAdIcon.vue";
  import FoodListDiv from "@/components/FoodMainCom/FoodListDiv.vue";
  import {inject, nextTick, reactive, ref, watch, watchEffect} from "vue";
  import UserFoot from "@/components/UserPage/UserFoot.vue";

  const state = reactive({
    receivedData: ref(''), // 初始化为初始值
    receivedMyOder: ref(''),

  });
  function handleDataUpdated(data) {
    // 在父组件中接收来自子组件的数据
    state.receivedData = data;
    console.log('父组件接收的数据 ',state.receivedData)
  }

  function handleMyOder(data){
    state.receivedMyOder = data
    console.log('父组件UserOder接收到FoodListDiv订单数据',state.receivedMyOder)
  }


</script>

<style scoped>

/* 隐藏滚动条和滚动条箭头 */
.custom-scrollbar {
  display: flex;
  position: relative;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  overflow-y: scroll; /* 显示滚动条内容并允许滚动 */
  height: 93vh;
  width: auto;
}

.custom-scrollbar::-webkit-scrollbar {
  overflow: hidden;
  width: 0; /* Chrome/Safari/Opera */
  background: transparent;
}

/* 隐藏滚动条和滚动条箭头 */
.main-content {
  display: flex;
  position: relative;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  overflow-y: scroll; /* 显示滚动条内容并允许滚动 */
  height: 10vh !important;
  width: auto;
}

.main-content::-webkit-scrollbar {
  overflow: hidden;
  width: 0; /* Chrome/Safari/Opera */
  background: transparent;
}

.main-content-inner {
  padding-right: 17px; /* 保持滚动条区域的右侧内边距，以防止内容被滚动条遮挡 */
}
</style>
