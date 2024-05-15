<script setup lang="ts">
import { ref, watch } from 'vue'
import { QFile, Notify } from 'quasar'
import Draggable from 'vuedraggable'
import { upload } from '../../api/upload'

const value = ref<File>()
const img = ref('')

const list = ref([
  {
    id: 1,
    name: 'item 1'
  },
  {
    id: 2,
    name: 'item 2'
  },
  {
    id: 3,
    name: 'item 3'
  },
  {
    id: 4,
    name: 'item 4'
  }
])


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
    <!-- 上传图片或文件到oss -->
    <div>
      <QFile style="width: 170px;" v-model="value" />
      <div v-if="img" class="img">
        <img :src="img" alt="">
      </div>
    </div>
    <!-- 拖动 -->
    <Draggable v-model="list" animation="300">
      <template #item="{ element }">
        <div class="move">{{ element }}</div>
      </template>
    </Draggable>
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

.move {
  cursor: move;
  padding: 4px 6px;
  border: 1px solid #ccc;
  display: flex;
  margin: 4px 0;
  user-select: none;
}
</style>
