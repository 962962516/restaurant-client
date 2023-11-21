<template>
  <EnterpriseAdminUser v-if="showWhich.value === 1" :all-admin="allAdmin"></EnterpriseAdminUser>
  <EnterpriseProductPrice v-if="showWhich.value === 2" :all-product="productData" ></EnterpriseProductPrice>
  <EnterpriseComboPrice v-if="showWhich.value === 3" :all-combo="comboData"></EnterpriseComboPrice>
  <EnterpriseSalesVolume v-if="showWhich.value === 5" ></EnterpriseSalesVolume>
  <EnterpriseServiceRating v-if="showWhich.value === 4" :service-rating="serviceRating"></EnterpriseServiceRating>
  <EnterpriseInAndOutHistory v-if="showWhich.value === 6" ></EnterpriseInAndOutHistory>
  <EnterpriseAddAndDeleteHistory v-if="showWhich.value === 7"></EnterpriseAddAndDeleteHistory>
</template>

<script setup>
import EnterpriseAdmin from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseProductPrice.vue";
import {onMounted, ref, watch} from "vue";
import EnterpriseProductPrice from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseProductPrice.vue";
import EnterpriseComboPrice from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseComboPrice.vue";
import EnterpriseAdminUser from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseAdminUser.vue";
import EnterpriseServiceRating from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseServiceRating.vue";
import EnterpriseSalesVolume from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseSalesVolume.vue";
import EnterpriseInAndOutHistory from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseInAndOutHistory.vue";
import EnterpriseAddAndDeleteHistory
  from "@/components/EnterpriseCom/EnterpriseMainCom/EnterpriseAddAndDeleteHistory.vue";

const props = defineProps({
  showWhich: 1,
  allProduct: ref([]),
  allCombo: ref([]),
  allAdmin: ref([]),
  serviceRating: ref([])
})

const productData = ref([])
const comboData =ref([])
const allAdmin = ref([])
const serviceRating = ref([])
watch(()=> props.showWhich,(newValue) => {
  console.log('enterprise接收showWhich',newValue)
})
watch(()=> props.allProduct,(newValue) => {
  productData.value = props.allProduct
  console.log('enterprise接收单品',productData.value)
})
watch(() => props.allCombo, (newValue) => {
  comboData.value = props.allCombo
  console.log('enterprise接收套餐',comboData.value)
})
watch(()=> props.allAdmin,(newValue) => {
  allAdmin.value = props.allAdmin
  console.log('enterprise接收allAdmin',newValue)
})
watch(()=> props.serviceRating,(newValue) => {
  serviceRating.value = props.serviceRating
  console.log('enterprise接收serviceRating',newValue)
})

</script>

<style scoped>

</style>