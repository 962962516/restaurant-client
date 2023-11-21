<template>
  <h3 style="margin-bottom: 30px; color: #333333">请选择一个问题类型</h3>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item title="到店点餐" name="1" style="font-size: large">
        <ServiceRating :fa-class="'到店点餐'"></ServiceRating>
      </el-collapse-item>
      <el-collapse-item title="会员积分相关" name="2">
        <ServiceRating :fa-class="'会员积分相关'"></ServiceRating>
      </el-collapse-item>
      <el-collapse-item title="优惠卷相关" name="3">
        <ServiceRating :fa-class="'优惠卷相关'"></ServiceRating>
      </el-collapse-item>
      <el-collapse-item title="餐厅服务" name="4">
        <ServiceRating :fa-class="'餐厅服务'"></ServiceRating>
      </el-collapse-item>
      <el-collapse-item title="食品质量" name="5">
        <ServiceRating :fa-class="'食品质量'"></ServiceRating>
      </el-collapse-item>
      <el-collapse-item title="其他问题" name="6">
        <ServiceRating :fa-class="'其他问题'"></ServiceRating>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import ServiceRating from "@/components/UserPersonalDrawer/ServiceRating/ServiceRating.vue";
</script>

<style scoped>

</style>