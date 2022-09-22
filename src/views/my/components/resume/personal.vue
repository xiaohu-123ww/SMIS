<template>
  <div v-if="person" style="margin-top: 30px">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动形式">
        <el-input
          v-model="text"
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
export default {
  props: {
    person: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
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
    onSubmit () {
      this.$emit('reset', false)
      this.$emit('writing', this.text)
    },
    resets () {
      this.$emit('reset', false)
    }

  }
}
</script>
<style scoped>
</style>
