<template>
  <div v-if="person" style="margin-top: 30px">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="个人优势">
        <el-input
          v-model="list.text"
          type="textarea"
          :rows="5"
          style="width: 800px"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="resets">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getpersonalAdvantage } from '@/api/my/resume'
export default {
  props: {
    person: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object
    }
  },
  data () {
    return {
      form: {
      }
      // text: ''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    async onSubmit () {
      this.$emit('reset', false)

      const res = await getpersonalAdvantage(this.list)
      console.log('个人优势', res)
    },
    resets () {
      this.$emit('reset', false)
    }

  }
}
</script>
<style scoped>
</style>
