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
      <el-form-item label="公司名称" prop="enterprise">
        <el-input v-model="ruleForm.enterprise" class="box"></el-input>
      </el-form-item>
      <el-form-item label="所属行业" prop="field_name">
        <el-select
          v-model="ruleForm.field_name"
          placeholder="请选择行业类型"
          style="width: 300px"
        >
          <div style="display: flex">
            <div style="width: 150px">
              <el-option
                v-for="(item, index) in IndustryList"
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
                v-for="(item, index) in field"
                :key="index"
                :label="index"
                :value="index"
                @mousemove.native="fieldChange(item)"
              >
              </el-option>
            </div>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称" prop="position_name">
        <el-input
          v-model="ruleForm.position_name"
          class="box"
          maxlength="100"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位类别" prop="position_class_id">
        <el-select
          v-model="ruleForm.position_class_id"
          placeholder="请选择职位类型"
        >
          <div style="display: flex">
            <div>
              <el-option
                v-for="(item, index) in optionsList"
                :key="index"
                :label="index"
                :value="index"
                disabled
                @mousemove.native="tradeChange(item)"
              >
              </el-option>
            </div>
            <div>
              <el-option
                v-for="(item, index) in tradelist"
                :key="index"
                :label="index"
                :value="index"
                disabled
                @mousemove.native="serchPostChange(item)"
              >
              </el-option>
            </div>
            <div>
              <el-option
                v-for="(item, index) in positionJobList"
                :key="index"
                :label="index"
                :value="index"
                @click.native="jobChange(item)"
              >
              </el-option>
            </div>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="在职时间" required>
        <el-col :span="7">
          <el-form-item prop="start_date">
            <el-date-picker
              v-model="ruleForm.start_date"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">--</el-col>
        <el-col :span="14">
          <el-form-item prop="end_date">
            <el-date-picker
              v-model="ruleForm.end_date"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="工作类型" prop="job_nature">
        <el-select v-model="ruleForm.job_nature" placeholder="全职" class="box">
          <el-option
            v-for="(item, index) in nature"
            :key="index"
            :label="index"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前月薪">
        <el-input
          v-model="ruleForm.salary_max"
          class="box"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作描述" prop="job_desc">
        <el-input
          v-model="ruleForm.job_desc"
          type="textarea"
          maxlength="3000"
          show-word-limit
          :rows="8"
          class="box"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位技能" prop="job_keywords">
        <el-select
          v-model="ruleForm.job_keywords"
          placeholder="请选择行业类型"
          multiple
          style="width: 500px"
          @change="bindChange"
        >
          <div style="display: flex">
            <div style="width: 150px">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                disabled
                @mousemove.native="optionsChange(item)"
              >
              </el-option>
            </div>
            <div style="width: 150px">
              <el-option
                v-for="item in children"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </div>
          </div>
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
import { getexperiencesList, etShowJobkeywords, getShowJobkeywords, getjobExperiencesAdemn } from '@/api/my/resume'
import { getIndustryField, getQuarters, getRequirement } from '@/api/postlist'
export default {
  props: {
    work: {
      type: Boolean
    },
    workList: {
      type: Object
    },
    workShow: {
      type: Boolean
    }
  },
  data () {
    return {

      nature: {},
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true,
        multiple: true
      },
      options: [
      ],
      value: [],
      ruleForm: {
        job_keywords: [],
        position: null,
        start_date: '',
        end_date: '',
        job_nature: null,
        salary_max: null,
        job_desc: '',
        enterprise: '',
        position_name: '',
        field_name: '',
        field: ''

      },
      children: [],
      // 职业分类
      tradelist: {},
      // 职位
      positionJobList: {},
      optionsList: {},

      rules: {
        enterprise: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        field_name: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
        position_name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        position_class_id: [
          { required: true, message: '请选择活类别', trigger: 'change' }
        ],
        salary_max: [
          { required: true, message: '请输入当前月薪', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              const boolean = new RegExp('^[1-9][0-9]*$').test(value)
              // console.log(boolean)
              if (!boolean) {
                cb(new Error('只能输入整数'))
              } else {
                cb()
              }
            }
          }
        ],
        job_desc: [
          { required: true, message: '请填写工作内容', trigger: 'blur' }
        ],
        start_date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        end_date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        job_nature: [
          { required: true, message: '请选择期望薪资', trigger: 'change' }
        ],
        job_keywords: [
          { type: 'array', required: true, message: '请至少选择一个工作性质', trigger: 'change' }
        ]
      },
      IndustryList: {},
      field: {},
      business: {},
      flagShow: false,
      id: 0

    }
  },
  watch: {
    workList (newVal, oldVal) {
      console.log(newVal)
      if (newVal) {
        this.ruleForm.enterprise = newVal.enterprise
        this.ruleForm.position_class_id = newVal.position_info.position_class_name
        this.ruleForm.job_nature = newVal.job_nature
        this.ruleForm.salary_max = newVal.position_info.salary
        this.ruleForm.job_desc = newVal.position_info.job_desc
        this.ruleForm.start_date = newVal.start_date
        this.ruleForm.end_date = newVal.end_date
        this.ruleForm.job_keywords = newVal.job_keywords.map(item => item.name)
        this.ruleForm.field_name = newVal.position_info.field_name
        this.ruleForm.position_name = newVal.position_info.position_name
        this.id = newVal.id
        this.flagShow = true
      }
    }
  },
  created () {
    this.getwork()
    this.getIndustry()
    this.serch()
    this.jobRequirement()
  },
  methods: {
    // 保存

    // 关闭
    resetForm () {
      console.log(1)

      this.$confirm('确定取消此添加吗？', '提醒', {

        confirmButtonText: '确定',

        cancelButtonText: '取消',

        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
        this.getdelete()
      })
    },

    async getList () {

    },
    async getwork () {
      const { data } = await getShowJobkeywords()
      console.log('职位技能', data)
      this.options = data.data
    },
    optionsChange (item) {
      console.log('item', item)
      this.children = item.children
    },
    bindChange (e) {
      if (e.length > 5) {
        this.$message.error('只可选择五个技能')
        this.ruleForm.job_keywords.splice(-1)
      }
    },
    // 行业
    async getIndustry () {
      const { data } = await getIndustryField()
      console.log('行业领域', data)
      this.IndustryList = data
    },
    industryChange (item) {
      this.field = item
    },
    fieldChange (item) {
      console.log('hangye112', item)
      this.ruleForm.field = item
      console.log(this.ruleForm.field_name)
      console.log(this.ruleForm)
    },
    // 职位分类
    async serch () {
      const { data } = await getQuarters()
      console.log('岗位', data)
      this.optionsList = data
    },
    // 职位下拉框
    tradeChange (index) {
      console.log('index', index)
      this.tradelist = index
    },

    serchPostChange (index) {
      console.log('index1', index)
      this.positionJobList = index
    },
    jobChange (item) {
      console.log('123', item, this.job_class)
      this.ruleForm.position = item
    },
    // 工作类别
    async jobRequirement () {
      const { data } = await getRequirement()
      console.log('其他要求', data)
      this.nature = data.job_nature
    },
    getdelete () {
      this.ruleForm.job_keywords = []
      this.ruleForm.position = null
      this.ruleForm.start_date = ''
      this.ruleForm.end_date = ''
      this.ruleForm.job_nature = null
      this.ruleForm.salary_max = null
      this.ruleForm.job_desc = ''
      this.ruleForm.enterprise = ''
      this.ruleForm.position_class_name = ''
      this.ruleForm.field_name = ''
      this.ruleForm.position_class_id = ''
      this.ruleForm.position_name = ''
    },
    async submitForm () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          this.getList()
          this.ruleForm.start_date = new Date(this.ruleForm.start_date).toLocaleDateString().slice().replace(/\//g, '-')
          this.ruleForm.end_date = new Date(this.ruleForm.end_date).toLocaleDateString().slice().replace(/\//g, '-')
          console.log(this.ruleForm)

          if (this.workShow) {
            console.log(1)
            console.log(1)
            console.log(this.id)
            console.log('121323', this.ruleForm)
            const arr = this.ruleForm
            if (arr.field_name === '') {
              delete arr.field_name
            }
            if (arr.position_class_name === '') {
              delete arr.position_class_name
            }
            if (arr.position === '') {
              delete arr.position
            }
            if (arr.position === null) {
              delete arr.position
            }
            if (arr.field === '') {
              delete arr.field
            }
            if (arr.position_class_id === this.workList.position_class_name) {
              delete arr.position_class_id
            }
            if (arr.job_nature === this.workList.job_nature) {
              delete arr.job_nature
            }
            console.log(arr)
            const res = await getjobExperiencesAdemn(this.id, arr)
            console.log('res', res)
            this.$message.success('修改成功')
            this.$emit('reset', false)
          } else {
            // this.getdelete()
            console.log(this.ruleForm)
            const res = await getexperiencesList(this.ruleForm)
            console.log('res', res)
            this.$message.success('添加成功')
            this.$emit('reset', false)
            // this.delete()
          }
          this.getdelete()
        }
      })
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
/* 设置下拉框中，隐藏第1级的勾选，设置第2级点击label就可以选中 */
/* 注：当一个页面有多个级联组件，为了区分，可设置 popper-class="custom_cascader" 属性来区分！
   下面设置的css前再加上自定义类名即可。nth-of-type(2)为第2级下拉菜单父容器
*/

.el-cascader__dropdown
  .el-cascader-menu:nth-of-type(1)
  .el-cascader-node
  label {
  display: none !important;
}
.el-cascader-panel .el-cascader-menu:nth-of-type(2) .el-checkbox {
  width: 100% !important;
}

.el-cascader-panel .el-cascader-menu:nth-of-type(2) .el-cascader-node__label {
  margin-left: -90% !important;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
