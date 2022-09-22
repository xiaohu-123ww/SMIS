<template>
  <div v-if="show">
    <el-form
      ref="rf"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学校名称" prop="name">
        <el-input v-model="ruleForm.name" class="box"></el-input>
      </el-form-item>
      <el-form-item label="最高学历" prop="education">
        <el-select
          v-model="ruleForm.education"
          placeholder="初中以下"
          class="box"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否统招" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="统招"></el-radio>
          <el-radio label="非统招"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所学专业" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          class="box"
          maxlength="100"
        ></el-input>
      </el-form-item>
      <el-form-item label="在校时间" required>
        <el-col :span="7">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">--</el-col>
        <el-col :span="14">
          <el-form-item prop="date2">
            <el-date-picker
              v-model="ruleForm.date2"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
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
        name: '',
        date1: '',
        date2: '',
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    submitForm () {
      this.$refs.rf.validate()
    },
    resetForm () {
      this.$emit('reset', false)
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  width: 500px;
}
</style>
