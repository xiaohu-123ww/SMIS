<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div>
    <div class="recom-box"></div>

    <div class="tip-box">
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple">
            <div style="display: flex; padding-left: 11px">
              <div class="change-select">
                <el-select
                  v-model="experience"
                  placeholder="工作经验"
                  @change="experienceChange"
                >
                  <el-option
                    v-for="(item, index) in experienceList"
                    :key="index"
                    :label="index"
                    :value="item"
                    >{{ index }}</el-option
                  >
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="requirements"
                  placeholder="学历要求"
                  @change="educationalChange"
                >
                  <el-option
                    v-for="(item, index) in educationalRequirements"
                    :key="index"
                    :label="index"
                    :value="item"
                    >{{ index }}</el-option
                  >
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="money"
                  placeholder="薪资要求"
                  @change="moneyChange"
                >
                  <el-option
                    v-for="(item, index) in moneyList"
                    :key="index"
                    :label="item"
                    :value="item"
                    >{{ item }}</el-option
                  >
                </el-select>
              </div>
              <div class="change-select">
                <el-select v-model="profession" placeholder="请选择职位类型">
                  <div style="display: flex">
                    <div>
                      <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="index"
                        :value="index"
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
              </div>
              <div class="change-select">
                <el-select
                  v-model="companyNature"
                  placeholder="公司性质"
                  @change="companyNatureChange"
                >
                  <el-option
                    v-for="(item, index) in companyNatureList"
                    :key="index"
                    :label="index"
                    :value="item"
                    >{{ index }}</el-option
                  >
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="people"
                  placeholder="公司规模"
                  @change="peopleChange"
                >
                  <el-option
                    v-for="(item, index) in peopleList"
                    :key="index"
                    :label="index"
                    :value="item"
                    >{{ index }}</el-option
                  >
                </el-select>
              </div>
            </div>
          </div></el-col
        >
        <el-col :span="3"
          ><div class="grid-content bg-purple-light">
            <span class="clear" @click="clearSearch">清空所有条件</span>
          </div></el-col
        >
      </el-row>

      <!-- <div class="change-select">
        <el-select class="true-select" v-model="value" placeholder="发布时间">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
    </div>
  </div>
</template>
<script>
import { getRequirement, getQuarters } from '@/api/postlist'
import { getSerchlist } from '@/api/position'
export default {

  data () {
    return {
      experience: '',
      requirements: '',
      money: '',
      profession: '',
      companyNature: '',
      people: '',
      list: {
        jobExperience: 0,
        education: 0,
        enterpriseNature: 0,
        salary: 0,
        qq: '',
        staffSize: 0
      },
      // 工作经验
      experienceList: {},
      // 学历要求
      educationalRequirements: {},
      // 薪资要求
      moneyList: ['5000', '6000', '7000', '8000', '9000', '10000', '10000以上'],
      // 职业类型
      options: {},
      // 公司性质
      companyNatureList: {},
      // 公司规模
      peopleList: {},
      // 职业分类
      tradelist: {},
      // 职位
      positionJobList: {}
    }
  },
  created () {
    this.jobRequirement()
    this.serch()
  },

  methods: {
    // getRequirement
    async jobRequirement () {
      const { data } = await getRequirement()
      console.log('其他要求', data)
      this.experienceList = data.job_experience
      this.educationalRequirements = data.education
      this.companyNatureList = data.enterprise_nature
      this.peopleList = data.staff_size
    },
    // 清除所有条件
    clearSearch () {
      this.experience = ''
      this.requirements = ''
      this.money = ''
      this.profession = ''
      this.companyNature = ''
      this.people = ''
      this.$emit('reset')
    },
    // 职位分类
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
    jobChange (item) {
      console.log('123', item, this.job_class)
      this.$emit('professionChange', item)
    },
    // 工作经验
    experienceChange (i) {
      console.log('aa', i)
      this.list.jobExperience = i
      this.$emit('experienceChange', i)
    },
    // 学历要求
    educationalChange (i) {
      console.log('bb', i)
      this.list.education = i
      this.$emit('educationalChange', i)
    },
    // 薪资要求
    moneyChange (i) {
      console.log('cc', i)
      this.list.salary = i
      this.$emit('moneyChange', i)
    },
    // 职位类型
    professionChange (i) {
      console.log('dd', i)
      this.qq = i
    },
    // 公司性质
    companyNatureChange (i) {
      console.log('ee', i)
      // this.list.enterpriseNature = i
      this.$emit('companyNatureChange', i)
    },
    // 公司规模
    peopleChange (i) {
      console.log('ff', i)
      this.list.salary = i
      this.$emit('peopleChange', i)
    }
  }
};
</script>
<style lang="scss" scoped>
.recom-box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  // border-bottom: 1.5px solid #ebebeb;
}
.city-box {
  width: 100%;
  height: auto;

  .city-list {
    width: 100%;
    color: #808080;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: space-evenly;
    padding: 10px;

    .now-city {
      margin-right: 20px;
    }

    .now-city:hover {
      color: #ff8383;
    }
  }
}
.change-select {
  margin: 0;
  padding: 0;
  width: auto;
  // background-color: #ff8383;
  // position: absolute ;
}

::v-deep {
  .el-input__inner {
    border: none;
    background-color: #fff;
    text-align: left;
    width: 130px;

    &::placeholder {
      color: #808080;
    }
  }

  .clear {
    color: #808080;
    padding-top: 8px;
  }

  .clear:hover {
    color: #ff8383;
  }
}
.tip-box {
  width: 100%;
  // height: 50px;
  // display: flex;
  // justify-content: space-between;
  // background-color: pink;

  .change-select {
    margin: 0;
    padding: 0;
    width: auto;
    // position: absolute ;
  }

  ::v-deep {
    .el-input__inner {
      border: none;
      background-color: #fff;
      text-align: left;
      width: 130px;

      &::placeholder {
        color: #808080;
      }
    }

    .clear:hover {
      color: #ff8383;
    }
  }
}
.clear {
  color: #808080;
  height: 30px;
  margin-top: 50px;
  font-size: 16px;
  text-align: center;
  color: #256efd;
  // background-color: red;
}
</style>
