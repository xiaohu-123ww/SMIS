<template>
  <div v-if="show">
    <el-form ref="rf" label-width="80px" :rules="rules">
      <el-form-item label="资格证书">
        <el-select v-model="value" placeholder="请选择资格证书">
          <div style="display: flex">
            <div style="width: 150px">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="index"
                :value="index"
                @mousemove.native="industryChange(item)"
              >
              </el-option>
            </div>
            <div>
              <el-option
                v-for="item in field"
                :key="item.cert_id"
                :label="item.cert_name"
                :value="item.cert_id"
                @mousemove.native="fieldChange(item.cert_id)"
                >{{ item.cert_name }}-{{ item.cert_level }}
              </el-option>
            </div>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-form-item>
          <el-date-picker
            v-model="date1"
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
import { getCertList, getCertification } from '@/api/my/resume'
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      value: [],
      options: {},
      date1: '',
      rules: {

      },
      field: [],
      list:
      {
        cert_id: 0,
        cert_date: ''

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
  created () {
    this.getCert()
  },
  methods: {
    handleChange () {
      console.log(this.value)
    },
    async onSubmit () {
      this.list.cert_date = new Date(this.date1).toLocaleDateString().slice().replace(/\//g, '-')
      const res = await getCertification(this.list)
      console.log('绑定', res)
      this.$message.success('绑定成功')
      this.$emit('reset', false)
    },
    resetSubmit () {
      this.$emit('reset', false)
    },
    async getCert () {
      const { data } = await getCertList()
      console.log('系统证书列表', data)
      this.options = data
    },
    industryChange (item) {
      console.log(item)
      this.field = item
    },
    fieldChange (item) {
      this.list.cert_id = item
    }

  }
}
</script>
<style scoped lang="scss">
.el-cascader {
  width: 500px;
}
</style>
