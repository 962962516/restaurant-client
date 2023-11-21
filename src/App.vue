<template>
    <router-view></router-view>
</template>

<script>

import {defineComponent} from "vue";
import UserOder from "@/views/UserOder.vue";
import UserAside from "@/components/UserPage/UserAside.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export default defineComponent({
  components: {UserAside, UserOder,Login,Register}
})
</script>

<style>

</style>