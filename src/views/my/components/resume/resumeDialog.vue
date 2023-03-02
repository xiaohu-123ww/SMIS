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
      <el-form-item label="期望职业" prop="pst_class_id">
        <el-select v-model="ruleForm.pst_class_id" placeholder="请选择职位类型">
          <div style="display: flex">
            <div>
              <el-option
                v-for="(item, index) in options"
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
                @click.native="jobChange(item, index)"
              >
              </el-option>
            </div>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="期望行业" prop="field">
        <el-select v-model="ruleForm.field" placeholder="请选择行业类型">
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

      <el-form-item v-if="address" label="期望城市" prop="address">
        <el-input
          v-model="address"
          style="width: 300px"
          @click.native="inputChange"
        ></el-input>
      </el-form-item>

      <div v-else>
        <el-form-item prop="province" label="期望城市">
          <el-col :span="8">
            <el-form-item prop="province">
              <el-select v-model="ruleForm.province" placeholder="请选择省">
                <el-option
                  v-for="item in city"
                  :key="item.key"
                  :label="item.name"
                  :value="item.adcode"
                  @click.native="provinceChange(item)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="8">
            <el-form-item prop="city">
              <el-select v-model="ruleForm.city" placeholder="请选择市">
                <el-option
                  v-for="item in cityList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.adcode"
                  @click.native="cityChange(item)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择区">
                <el-option
                  v-for="item in regionList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.adcode"
                  @click.native="regionChange(item)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </div>

      <el-form-item label="薪资要求" required>
        <div style="display: flex">
          <el-form-item prop="salary_min" style="margin-right: 10px">
            <el-select
              v-model="ruleForm.salary_min"
              placeholder="2k"
              class="money"
            >
              <el-option
                v-for="(item, index) in money"
                :key="index"
                :label="item"
                :value="item"
                @click.native="moneyChange(item)"
                >{{ item }}</el-option
              >
            </el-select>
          </el-form-item>
          <div style="color: rgb(220, 223, 230); margin-right: 10px">K</div>
          <div style="color: rgb(220, 223, 230); margin-right: 10px">——</div>

          <el-form-item prop="salary_max">
            <el-select
              v-model="ruleForm.salary_max"
              placeholder="4k"
              class="money"
            >
              <el-option
                v-for="(item, index) in lastMoney"
                :key="index"
                :label="item"
                :value="item"
                @click.native="lastMoneyChange(item)"
                >{{ item }}</el-option
              >
            </el-select>
          </el-form-item>
          <div style="color: rgb(220, 223, 230); margin-left: 10px">K</div>
        </div>
      </el-form-item>
      <el-form-item label="工作性质" prop="job_nature">
        <el-radio-group v-model="ruleForm.job_nature">
          <el-radio
            v-for="item in work"
            :key="item.id"
            :label="item.name"
            @click.native="workChange(item.id)"
          ></el-radio>
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

import { getQuarters, getIndustryField } from '@/api/postlist'
import { getcity, getjobIntentionList, getjobIntentionAmend } from '@/api/my/resume'
import { getRequirement } from '@/api/postlist'
export default {
  props: {
    show: {
      type: Boolean
    },
    num: {
      type: Object
    }
  },
  data () {
    return {
      address: '',
      ruleForm: {
        city: '',
        salary_min: '',
        salary_max: '',
        pst_class_id: null,
        field: null,
        job_nature: null,
        job: null,
        province: null,
        region: null
      },
      rules: {
        region: [
          { required: true, message: '请选择期望行业', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择期望行业', trigger: 'change' }
        ],
        field: [
          { required: true, message: '请选择期望行业', trigger: 'change' }
        ],
        pst_class_id: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        job: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择期望城市', trigger: 'change' }
        ],
        salary_min: [
          { required: true, message: '请选择期望薪资', trigger: 'change' }
        ],
        salary_max: [
          { required: true, message: '请选择期望薪资', trigger: 'change' }
        ],
        job_nature: [
          { required: true, message: '请至少选择一个工作性质', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择省市县', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择省市县', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择省市县', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择省市县', trigger: ['chnage', 'blur'] }
        ]

      },
      fieldList: {},
      options: {},
      tradelist: {},
      positionJobList: {},
      IndustryList: {},
      field: {},
      profession: '',
      job_class: '',
      city: [],
      cityList: [],
      regionList: [],
      list: {
        city: '',
        salary_min: '',
        salary_max: '',
        position_class_id: 0,
        field: 0,
        job_nature: 0,
        position_class: ''

      },
      money: ['2', '4', '8', '12', '16', '20', '24', '28'],
      lastMoney: ['4', '8', '12', '16', '20', '24', '28', '32'],
      work: [
        {
          id: 1,
          name: '全职'
        }, {
          id: 2,
          name: '兼职'
        },
        {
          id: 3,
          name: '实习'
        }, {
          id: 4,
          name: '校园'
        }
      ],
      id: 0,

      //
      city: '',
      salary_min: '',
      salary_max: '',
      position_class_id: 0,
      field: 0,
      job_nature: 0,
      position_class: '',
      add: {}
    }
  },
  watch: {
    num (newVal, oldVal) {
      this.ruleForm.salary_min = newVal.salary_min
      this.ruleForm.salary_max = newVal.salary_max
      this.ruleForm.pst_class_id = newVal.position_class
      this.ruleForm.field = newVal.field
      this.ruleForm.job_nature = newVal.job_nature
      this.address = newVal.city
      this.id = newVal.id
    }
  },
  created () {
    this.getIndustry()
    this.serch()
    this.getList()
    this.jobRequirement()
  },
  methods: {
    async submitForm () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          if (this.id === 0) {
            const res = await getjobIntentionList(this.list)
            console.log('新增', res)
            if (res.code === 200) {
              this.$message.success('新增成功')
              this.$emit('reset', false)
              this.getjobList()
            }
          } else {
            this.add = this.list
            if (this.add.city === '') {
              delete this.add.city
            }
            if (this.add.salary_min === '') {
              delete this.add.salary_min
            }
            if (this.add.salary_max === '') {
              delete this.add.salary_max
            }
            if (this.add.field === 0) {
              delete this.add.field
            }
            if (this.add.position_class_id === 0) {
              delete this.add.position_class_id
            }
            if (this.add.position_class === '') {
              delete this.add.position_class
            }
            if (this.add.job_nature === 0) {
              delete this.add.job_nature
            }
            console.log(this.add)
            const res = await getjobIntentionAmend(this.id, this.add)
            console.log('res', res)
            this.$emit('reset', false)
            this.getjobList()
          }
        }
      })
    },
    resetForm () {
      console.log(1)

      this.$confirm('确定取消添加吗?', '提示', {

        confirmButtonText: '确定',

        cancelButtonText: '取消',

        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
      })
    },

    fieldChange (index) {
      console.log('index', index)
    },
    async serch () {
      const { data } = await getQuarters()
      console.log('岗位', data)
      this.options = data
      localStorage.getItem('options', JSON.stringify(data))
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
    jobChange (item, i) {
      console.log('123', item)
      this.list.position_class_id = item
      // this.list.position_class = i
    },

    // 行业领域分类
    async getIndustry () {
      const { data } = await getIndustryField()
      console.log('行业领域', data)
      this.IndustryList = data
    },
    industryChange (item) {
      this.field = item
    },
    fieldChange (item) {
      console.log('hangye', item)
      // this.serchPost.field = item
      this.list.field = item
    },
    async getList () {
      const res = await getcity()
      console.log('城市', res)
      this.city = res.data.data
      console.log('this.city', this.city)
    },
    provinceChange (item) {
      console.log('item', item)
      this.cityList = item.children
    },
    cityChange (item) {
      console.log('市', item)

      this.regionList = item.children
    },
    regionChange (item) {
      console.log('区', item.adcode, item)
      this.list.city = item.adcode
    },
    moneyChange (i) {
      console.log('money', i)
      this.list.salary_min = i
    },
    lastMoneyChange (item) {
      this.list.salary_max = item
    },
    // 其他条件
    async jobRequirement () {
      const { data } = await getRequirement()
      console.log('其他要求', data)
      // this.work = data.job_nature
    },
    workChange (item) {
      this.list.job_nature = item
    },
    // 新增
    getjobList () {
      this.ruleForm.city = ''
      this.ruleForm.salary_min = ''
      this.ruleForm.salary_max = ''
      this.ruleForm.pst_class_id = null
      this.ruleForm.field = null
      this.ruleForm.job_nature = null
      this.ruleForm.job = null
      this.ruleForm.province = null
      this.ruleForm.region = null
    },
    inputChange () {
      this.address = ''
    }

  }
}
</script>
<style scoped lang="scss">
.box {
  width: 500px;
}
.money {
  // width: 220px;
}
::v-deep .el-select-dropdown__item.is-disabled {
  color: rgb(37, 110, 253);
}
</style>
