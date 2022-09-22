<template>
  <div v-if="work">
    <el-form
      ref="rf"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top: 20px"
    >
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="ruleForm.name" class="box"></el-input>
      </el-form-item>
      <el-form-item label="所属行业" prop="job">
        <el-select v-model="ruleForm.job" placeholder="互联网" class="box">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称" prop="jobWork">
        <el-input
          v-model="ruleForm.jobWork"
          class="box"
          maxlength="100"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位类别" prop="profession">
        <el-select
          v-model="ruleForm.profession"
          placeholder="机械工程师"
          class="box"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在职时间" required>
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
      <el-form-item label="当前月薪" prop="money">
        <el-input
          v-model="ruleForm.money"
          class="box"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作描述" prop="desc">
        <el-input
          v-model="ruleForm.desc"
          type="textarea"
          maxlength="3000"
          show-word-limit
          :rows="8"
          class="box"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位技能">
        <el-select
          v-model="value"
          multiple
          placeholder="请选择职业技能"
          class="box"
          @change="bindChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
    work: {
      type: Boolean
    }
  },
  data () {
    return {
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      value: [],
      ruleForm: {
        name: '',
        job: '',
        jobWork: '',
        profession: '',
        city: '',
        beforeMoney: '',
        money: '',
        work: '',
        date1: '',
        date2: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请选择活行业', trigger: 'change' }
        ],
        jobWork: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '请选择活行业', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入当前月薪', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写工作内容', trigger: 'blur' }
        ],
        beforeMoney: [
          { type: 'date', required: true, message: '请选择期望薪资', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个工作性质', trigger: 'change' }
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
    },
    // 最多可选择五个数据
    bindChange (e) {
      if (e.length > 5) {
        this.$message.warning('最多可选择五个技能')
        this.value.splice(-1)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  width: 550px;
}
.money {
  width: 200px;
}
</style>
