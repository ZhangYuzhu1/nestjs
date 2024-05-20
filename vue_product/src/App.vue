<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
let onlineNumber = ref(0)
const socket = io('ws://localhost:3001'); // 替换为您的Nest.js服务器地址
onMounted(() => {
  // 监听 'usersCount' 事件，并更新用户数
  socket.on('usersCount', (count) => {
    console.log(count);

    onlineNumber.value = count;
    console.log(onlineNumber.value)
  });

})
</script>

<template>
  {{ onlineNumber }}
  <RouterView />
</template>
