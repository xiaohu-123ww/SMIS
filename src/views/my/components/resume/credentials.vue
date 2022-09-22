<template>
  <div v-if="show">
    <el-form ref="rf" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="资格证书" prop="value">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ multiple: true, checkStrictly: true }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-form-item prop="date1">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 500px"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="resetSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }, {
            value: 'daohang',
            label: '导航'
          }]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic'
          }, {
            value: 'form',
            label: 'Form'
          }, {
            value: 'data',
            label: 'Data'

          }, {
            value: 'notice',
            label: 'Notice'

          }, {
            value: 'navigation',
            label: 'Navigation'

          }, {
            value: 'others',
            label: 'Others'
          }]

        }],
      form: {
        date1: ''
      },
      rules: {
        value: [
          { required: true, message: '请输入活动名称', trigger: 'blur change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {
    value (oldValue, newValue) {
      if (oldValue.length > 10) {
        this.$message({
          message: '最多只支持选择10项',
          duration: 1500,
          type: 'warning'
        })
        this.$nextTick(() => {
          this.value = newValue
        })
      }
    }
  },
  mounted () {

  },
  methods: {
    handleChange () {
      console.log(this.value)
    },
    onSubmit () {
      this.$refs.rf.validate()
    },
    resetSubmit () {
      this.$emit('reset', false)
    }
  }
}
</script>
<style scoped lang="scss">
.el-cascader {
  width: 500px;
}
</style>
