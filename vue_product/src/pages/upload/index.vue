<script setup lang="ts">
import { ref, watch } from 'vue'
import { QFile, Notify } from 'quasar'
import { upload } from '@/api/upload'

const value = ref<File>()
const img = ref('')

watch(
  () => value.value,
  async (newVal) => {
    try {
      const formData = new FormData()
      formData.append('file', newVal as File)
      const res: any = await upload(formData)
      if (!res) {
        throw new Error("");
      }
      console.log(res);
      img.value = res.url
      Notify.create({
        type: 'success',
        message: '上传成功',
      })
    } catch (error) {
      Notify.create({
        type: 'warning',
        message: '上传失败',
      })
    }
  }
)
</script>

<template>
  <div>
    <QFile style="width: 170px;" v-model="value" />
    <div v-if="img" class="img">
      <img :src="img" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.img {
  width: 150px;
  height: 150px;
  margin: 10px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
