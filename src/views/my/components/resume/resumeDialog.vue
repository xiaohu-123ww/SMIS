<template>
  <div v-if="show">
    <el-form
      ref="rf"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top: 20px"
    >
      <el-form-item label="期望职位" prop="job">
        <el-select v-model="ruleForm.job" placeholder="请选择职位" class="box">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期望行业" prop="profession">
        <el-select
          v-model="ruleForm.profession"
          placeholder="请选择活期望行业"
          class="box"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期望城市" prop="city">
        <el-select
          v-model="ruleForm.city"
          placeholder="请选择活期望城市"
          class="box"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="薪资要求" required>
        <el-col :span="6">
          <el-form-item prop="beforeMoney">
            <el-select
              v-model="ruleForm.beforeMoney"
              placeholder="1k"
              class="money"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1" style="color: rgb(194, 194, 204)"
          >——</el-col
        >
        <el-col :span="12">
          <el-form-item prop="money">
            <el-select v-model="ruleForm.money" placeholder="10k">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="工作性质" prop="work">
        <el-radio-group v-model="ruleForm.work">
          <el-radio label="全职"></el-radio>
          <el-radio label="兼职"></el-radio>
          <el-radio label="实习"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
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
      ruleForm: {
        job: '',
        profession: '',
        city: '',
        beforeMoney: '',
        money: '',
        work: ''
      },
      rules: {
        job: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        profession: [
          { required: true, message: '请选择期望行业', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择期望城市', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请选择期望薪资', trigger: 'change' }
        ],
        beforeMoney: [
          { required: true, message: '请选择期望薪资', trigger: 'change' }
        ],
        work: [
          { required: true, message: '请至少选择一个工作性质', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.rf.validate()
    },
    resetForm () {
      console.log(1)
      this.$emit('reset', false)
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  width: 500px;
}
.money {
  width: 200px;
}
</style>
