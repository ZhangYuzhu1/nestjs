<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { createUserAPI } from '@/api/user'
import type { User } from '@/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const labelPosition = ref<FormProps['labelPosition']>('right')

const formLabelAlign = reactive<User>({
  name: '',
  password: '',
  code: '',
})

const imageCode = ref<string>('/api/user/code/c')

async function login() {
  const res = await createUserAPI(formLabelAlign)
  console.log(res);
  if (res.status === 0) {
    router.push('/')
  } else {
    ElMessage.error(res.message)
  }
}

function resetCode() {

}

onMounted(async () => {
})
</script>

<template>
  <el-form :label-position="labelPosition" label-width="auto" :model="formLabelAlign" style="max-width: 600px">
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item label="验证码">
      <div style="display: flex;">
        <el-input v-model="formLabelAlign.code" />
        <img v-if="imageCode.length" :src="imageCode" alt="" @click="resetCode">
      </div>
    </el-form-item>
    <el-form-item>
      <el-button style="margin-left: 125px;" type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>