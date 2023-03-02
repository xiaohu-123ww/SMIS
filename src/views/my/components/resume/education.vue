<template>
  <div v-if="show">
    <el-form
      ref="rf"
      :model="list"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学校名称" prop="school">
        <el-input v-model="list.school" class="box"></el-input>
      </el-form-item>
      <el-form-item label="最高学历" prop="education">
        <el-select v-model="list.education" placeholder="初中以下" class="box">
          <el-option
            v-for="item in education"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="educationChange(item.id)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否统招" prop="is_unified_recruit ">
        <el-radio-group v-model="list.is_unified_recruit">
          <el-radio label="统招"></el-radio>
          <el-radio label="非统招"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所学专业" prop="major">
        <el-input v-model="list.major" class="box" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="在校时间" prop="value1">
        <el-date-picker
          v-model="list.value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptionsStart"
        >
        </el-date-picker>
        <!-- <el-col :span="7">
          <el-form-item prop="start_date">
            <el-date-picker
              v-model="list.start_date"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col> -->
        <!-- <el-date-picker
          v-model="list.value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker> -->
        <!-- <el-col class="line" :span="2">--</el-col>
        <el-col :span="14">
          <el-form-item prop="end_date">
            <el-date-picker
              v-model="list.end_date"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getRequirement } from '@/api/postlist'
import { getEducationExperiences, getEducatioAmend } from '@/api/my/resume'
export default {
  props: {
    show: {
      type: Boolean
    },
    educationList: {
      type: Object
    },
    time: {
      type: Boolean
    }

  },
  data () {
    return {
      pickerOptionsStart: {
        // 时间不能大于当前时间
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }

      },

      rules: {
        school: [
          { required: true, message: '请输入学校名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
        start_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        end_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        is_unified_recruit: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        major: [
          { required: true, message: '请填写专业', trigger: 'blur' }
        ],
        value1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      list: {
        school: '',
        major: '',
        education: null,
        start_date: '',
        end_date: '',
        is_unified_recruit: null,
        value1: []
      },
      education: [
        {
          id: 1,
          name: '初中以下'
        },
        {
          id: 2,
          name: '高中'
        },
        {
          id: 3,
          name: '中专/技校'
        },
        {
          id: 4,
          name: '大专'
        },
        {
          id: 5,
          name: '本科'
        },
        {
          id: 6,
          name: '硕士'
        },
        {
          id: 7,
          name: 'MBA/EMBA'
        },
        {
          id: 8,
          name: '博士'
        }
      ],
      id: 0
    }
  },
  computed: {

  },
  watch: {
    educationList (newVal, oldVal) {
      console.log(newVal)
      this.list.school = newVal.education_info.school
      this.list.major = newVal.education_info.major
      this.list.is_unified_recruit = newVal.education_info.is_unified_recruit === false ? '非统招' : '统招'
      this.list.education = newVal.degree
      this.list.value1[0] = newVal.start_date
      this.list.value1[1] = newVal.end_date
      this.id = newVal.id
    }
  },
  mounted () {

  },
  created () {
    this.getrequire()
  },
  methods: {
    // 保存
    async submitForm () {
      this.$refs.rf.validate()

      this.list.start_date = new Date(this.list.value1[0]).toLocaleDateString().slice().replace(/\//g, '-')
      this.list.end_date = new Date(this.list.value1[1]).toLocaleDateString().slice().replace(/\//g, '-')
      if (this.list.is_unified_recruit === '统招') {
        this.list.is_unified_recruit = true
      } else {
        this.list.is_unified_recruit = false
      }

      if (this.time === true) {
        console.log(this.list.education)
        if (this.list.education === '无') {
          this.list.education = 0
        } else if (this.list.education === '初中以下') {
          this.list.education = 1
        } else if (this.list.education === '高中') {
          this.list.education = 2
        } else if (this.list.education === '中专/技校') {
          this.list.education = 3
        } else if (this.list.education === '大专') {
          this.list.education = 4
        } else if (this.list.education === '本科') {
          this.list.education = 5
        } else if (this.list.education === '硕士') {
          this.list.education = 6
        } else if (this.list.education === 'MBA/EMBA') {
          this.list.education = 7
        } else {
          this.list.education = 8
        }
        const res = await getEducatioAmend(this.id, this.list)
        console.log(this.list)
        this.$message.success('修改成功')
        this.$emit('reset', false, false)
      } else {
        console.log('123', this.list)
        const res = await getEducationExperiences(this.list)
        console.log('res', res)
        this.$message.success('添加成功')
        this.$emit('reset', false)
      }
      this.num()

      // // console.log(this.list)
      //
    },
    resetForm () {
      this.$confirm('确定退出此编辑吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
        this.num()
      })
    },
    // 学历
    async getrequire () {
      const res = await getRequirement()
      console.log('其他', res)
      // this.education = res.data.education
    },
    educationChange (item) {
      console.log('122', item)
      this.list.education = item
    },
    num () {
      this.list.school = ''
      this.list.major = null
      this.list.education =
        this.list.start_date = ''
      this.list.end_date = ''
      this.list.is_unified_recruit = null
      this.list.value1 = []
    }

  }
}
</script>
<style scoped lang="scss">
.box {
  width: 500px;
}
</style>
