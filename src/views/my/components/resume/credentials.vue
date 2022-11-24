<template>
  <div v-if="show">
    <el-form ref="rf" label-width="80px" :rules="rules" :model="num">
      <el-form-item label="资格证书">
        <el-select
          v-model="num.value"
          placeholder="请选择资格证书"
          :disabled="state"
          prop="value"
        >
          <div style="display: flex">
            <div style="width: 150px">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="index"
                :value="index"
                disabled
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
        <el-form-item prop="date1">
          <el-date-picker
            v-model="num.date1"
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
import { getCertList, getCertification, getCertificationAmend } from '@/api/my/resume'
export default {
  props: {
    show: {
      type: Boolean
    },
    certList: {
      type: Object,
      default: () => { }
    },
    forbidden: {
      type: Boolean
    }
  },
  data () {
    return {
      num: {
        value: [],
        data1: ''
      },

      options: {},

      rules: {
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      field: [],
      list: {
        cert_id: 0,
        cert_date: ''
      },
      state: false,
      id: 0,
      num: {
        cert_date: ''
      }

    }
  },
  computed: {

  },
  watch: {
    certList (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.value = newVal.cert_info.cert_name
      this.date1 = newVal.cert_date

      this.id = newVal.cert_info.cert_id
      if (this.value === newVal.cert_info.cert_name) {
        this.state = true
      }
    }
  },
  mounted () {

  },
  created () {
    this.getCert()
  },
  methods: {

    async onSubmit () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          this.list.cert_date = new Date(this.num.date1).toLocaleDateString().slice().replace(/\//g, '-')
          this.num.cert_date = new Date(this.num.date1).toLocaleDateString().slice().replace(/\//g, '-')
          console.log(this.list)
          if (this.state === false) {
            const res = await getCertification(this.list)
            console.log('绑定', res)
            this.$message.success('绑定成功')
          } else {
            const res = await getCertificationAmend(this.id, this.num)
            console.log('修改', res)
            this.$message.success('修改成功')
          }
          this.$emit('reset', false)
          this.num.value = ''
          this.num.date1 = ''
        }
      })
    },
    resetSubmit () {
      this.$confirm('确定取消吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
        this.num.value = ''
        this.num.date1 = ''
      })
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
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
