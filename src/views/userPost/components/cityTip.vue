<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <div>
    <div class="recom-box">
      <!-- <div><h2 style="margin: 0">推荐岗位</h2></div> -->
      <!-- <div class="change-select">
        <el-select
          v-model="value1"
          class="true-select"
          placeholder="选择排序"
          @change="changes"
        >
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </div> -->
    </div>
    <!-- <div v-if="xian" class="city-box">
      <div class="city-list">
        <span
          ><span class="now-city"
            >{{ city }}<i class="el-icon-arrow-right" /></span
          ><span>热门城市</span></span
        >
        <span class="all-city" @click="dialogTableVisible = true">
          全部城市</span
        >
      </div>
      <el-dialog :visible.sync="dialogTableVisible" title="热门城市">
        <el-button
          v-for="(item, index) in cityChoices"
          :key="index"
          plain
          style="margin: 10px"
          @click="choice(item)"
          >{{ item.label }}
        </el-button>
      </el-dialog>
    </div> -->
    <div v-if="xian" class="tip-box">
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple">
            <div style="display: flex; padding-left: 11px">
              <div class="change-select">
                <el-select
                  v-model="expvalue"
                  class="true-select"
                  placeholder="工作经验"
                  @change="expchange"
                >
                  <el-option
                    v-for="item in expoptions"
                    :key="item.idx"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="choicesvalue"
                  class="true-select"
                  placeholder="学历要求"
                  @change="dianji"
                >
                  <el-option
                    v-for="item in choicesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.idx"
                  />
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="choicesvalue"
                  class="true-select"
                  placeholder="薪资要求"
                  @change="dianji"
                >
                  <el-option
                    v-for="item in choicesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.idx"
                  />
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="choicesvalue"
                  class="true-select"
                  placeholder="职位类型"
                  @change="dianji"
                >
                  <el-option
                    v-for="item in choicesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.idx"
                  />
                </el-select>
              </div>
              <!-- <div class="change-select">
        <el-select class="true-select" v-model="value" placeholder="薪资要求">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
              <div class="change-select">
                <el-select
                  v-model="financialvalue"
                  class="true-select"
                  placeholder="公司性质"
                  @change="dianji"
                >
                  <el-option
                    v-for="item in financialOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.idx"
                  />
                </el-select>
              </div>
              <div class="change-select">
                <el-select
                  v-model="staffvalue"
                  class="true-select"
                  placeholder="公司规模"
                  @change="dianji"
                >
                  <el-option
                    v-for="item in staffOptions"
                    :key="item.value"
                    :label="item.staff_size"
                    :value="item.staff_size"
                  />
                </el-select>
              </div>
            </div></div
        ></el-col>
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
import { jobSearch } from '@/api/jobs'
import { getUservitae } from '@/api/user'

export default {
  data () {
    return {
      statu: true,
      xian: true,
      option: [{
        value: '选项1',
        label: '最新发布'
      }, {
        value: '选项2',
        label: '工作经验升序'
      }, {
        value: '选项3',
        label: '即将截止'
      }],
      value: '',

      dialogTableVisible: false,
      expvalue: '',
      choicesvalue: '',
      value1: '',
      staffvalue: '',
      financialvalue: '',
      staffOptions: [],
      financialOptions: [],
      city: '不限',
      options: [
        {
          value: 'beijing',
          label: '暂无'
        }
      ],
      choicesOptions: [],
      expoptions: [
        {
          value: 'beijing',
          label: '暂无'
        }
      ],
      lists: [],
      cityChoices: [],
      arr: [],
      arrs: [],
      limit: {

      }
    }
  },
  computed: {
    list () {
      //  (this.$store.state.user.searchList);
      return this.$store.state.user.searchList
    },
    status () {
      return this.$store.state.user.status
    }

  },
  watch: {
    status (status) {
      // console.log(status);
      if (status == false) {
        this.clearSearch()
      }
    }
  },
  created () {
    const b = this.$route.query.name
    // console.log(b);
    // console.log(this.$route.query.name);
    getUservitae().then((rs) => {
      console.log('qwqeqwewqewq', rs)
      this.cityChoices = rs.data.province_choices
      this.dict = rs.data
    })
    jobSearch(b).then(rs => {
      console.log('初始化的', rs, b)
      console.log('1111', rs.data)
      this.arrs = rs.data.post_list
      this.expoptions = rs.data.exp_options
      this.choicesOptions = rs.data.education_choices
      this.financialOptions = rs.data.financial_options
      rs.data.staff_size_options.forEach(item => {
        if (item.max_number !== null) {
          item.staff_size = item.min_number + '-' + item.max_number
        } else {
          item.max_number = '100000'
          item.staff_size = item.min_number + '-' + item.max_number
        }
      })
      this.staffOptions = rs.data.staff_size_options
      this.arrs.forEach((item) => {
        item.salary_min = parseInt(item.salary_min)
        item.salary_max = parseInt(item.salary_max)
        item.enterprise.logo = this.disposeImg(item.enterprise.logo)
        // 工资单位
        rs.data.salary_unit_options.forEach(unit => {
          if (item.salary_unit == unit.idx) {
            item.salary_unit = unit.label
          }
        })
        // 融资
        rs.data.financial_options.forEach((financial) => {
          if (financial.idx == item.enterprise.financing_status) {
            item.enterprise.financing_status = financial.label
            //  (this.userVitaed);
          }
        })
        // 工作性质
        rs.data.job_nature_options.forEach((nature) => {
          if (nature.idx == item.job_nature) {
            item.job_nature = nature.label
            //  (this.userVitaed);
          }
        })
        // 工作经验 job_experience
        rs.data.exp_options.forEach((exp) => {
          if (exp.idx == item.job_experience) {
            item.job_experience = exp.label
            //  (this.userVitaed);
          }
        })
        if (this.dict) {
          // 地址
          this.dict.province_choices.forEach((choices) => {
            if (choices.idx == item.city) {
              item.city = choices.label
              //  (this.userVitaed);
            }
          })
          // 学历
          this.dict.education_choices.forEach((education) => {
            if (education.idx == item.education) {
              item.education = education.label
            }
          })
        }

        if (item.position.job_content.indexOf('；') > 0) {
          item.position.jobContent = item.position.job_content.split('；')
          item.position.jobContent = item.position.jobContent.filter((rs) => {
            return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
          })
        } else if (item.position.job_content.indexOf(' ') > 0) {
          item.position.jobContent = item.position.job_content.split(' ')
          // item.position.jobContent=item.position.job_content
        } else {
          return (item.position.jobContent = [item.position.job_content])
          //  ();
        }

        if (item.position.requirement.indexOf('；') >= 0) {
          item.position.jobrequirement = item.position.requirement.split('；')

          item.position.jobrequirement = item.position.jobrequirement.filter(
            (rs) => {
              return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
            }
          )
        } else if (item.position.requirement.indexOf(' ') >= 0) {
          item.position.jobrequirement = item.position.jobrequirement.split(' ')
          // item.position.jobContent=item.position.job_content
        } else {
          return (item.position.jobrequirement = [item.position.requirement])
          //  ();
        }

        // let a = "1.努力 2.上进 3.有潜力"
        //  (item.position.job_content.indexOf(" "));
        // if(item.position.job_content.indexOf(" ")){
        //    item.position.jobContent = item.position.job_content.split(" ");
        //    item.position.jobContent = item.position.jobContent.filter(rs=> {
        //   return rs && rs.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        // });
        // }

        //  (item.position.jobContent);
        if (item.salary_min > 1000) {
          item.salary_min = item.salary_min / 1000 + 'K'
        }
        if (item.salary_max > 1000) {
          item.salary_max = item.salary_max / 1000 + 'K'
        }
      })
    })
  },
  methods: {
    //  排序加个时间戳
    dateToTimestamp (dateStr) {
      if (!dateStr) {
        return -5364691200000
      }
      const newDataStr = dateStr.replace(/\.|\-/g, '/')
      const date = new Date(newDataStr)
      const timestamp = date.getTime()
      return timestamp
    },
    changes (e) {
      this.$store.commit('user/SET_STATUS', this.statu)
      if (e === '最新发布') {
        // console.log(this.list)
        this.list.sort(this.descOrder('datatime'))
      }
      if (e === '工作经验升序') {
        // console.log(this.list)
        this.list.sort(this.compare('jobid'))
      }
      if (e === '即将截止') {
        // console.log(this.list)
        this.list.sort(this.compare('datatime'))
      }
    },
    // 升序排列
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    // 降序排列
    descOrder (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    expchange (e) {
      this.lists = this.arrs
      const arr = []
      // console.log(this.lists)
      this.lists.forEach(rs => {
        // console.log(rs.job_experience == e);
        if (rs.job_experience == e) {
          arr.push(rs)
        } else {
          // this.lists=arr
        }
        // this.lists=arr
      })
      this.arr = arr
      // console.log(arr);
      this.$store.commit('user/SET_SERCHLIST', this.arr)
    },
    choice (item) {
      //  (item.label)
      this.city = item.label
      this.dialogTableVisible = false
      this.serchJob(item.label)
    },
    serchJob (e) {
      //  (jobName);
      jobSearch(e).then((res) => {
        //  (res.data);
        //  (this.dict);
        this.lists = res.data.post_list
        // console.log(this.lists)
        //  (this.list)
        this.lists.forEach((item) => {
          item.salary_min = parseInt(item.salary_min)
          item.salary_max = parseInt(item.salary_max)
          item.enterprise.logo = this.disposeImg(item.enterprise.logo)
          item.datatime = this.dateToTimestamp(item.post_limit_time)
          // 工资单位
          res.data.salary_unit_options.forEach(unit => {
            if (item.salary_unit == unit.idx) {
              item.salary_unit = unit.label
            }
          })
          // 融资
          res.data.financial_options.forEach((financial) => {
            if (financial.idx == item.enterprise.financing_status) {
              item.enterprise.financing_status = financial.label
              //  (this.userVitaed);
            }
          })
          // 工作性质
          res.data.job_nature_options.forEach((nature) => {
            if (nature.idx == item.job_nature) {
              item.job_nature = nature.label
              //  (this.userVitaed);
            }
          })
          // 工作经验 job_experience
          res.data.exp_options.forEach((exp) => {
            if (exp.idx == item.job_experience) {
              item.job_experience = exp.label
              item.jobid = exp.idx
              //  (this.userVitaed);
            }
          })

          if (this.dict) {
            // 地址
            this.dict.province_choices.forEach((choices) => {
              if (choices.idx == item.city) {
                item.city = choices.label
                //  (this.userVitaed);
              }
            })
            // 学历
            this.dict.education_choices.forEach((education) => {
              if (education.idx == item.education) {
                item.education = education.label
                item.educationid = education.idx
              }
            })
          }

          if (item.position.job_content.indexOf('；') > 0) {
            item.position.jobContent = item.position.job_content.split('；')
            item.position.jobContent = item.position.jobContent.filter((rs) => {
              return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
            })
          } else if (item.position.job_content.indexOf(' ') > 0) {
            item.position.jobContent = item.position.job_content.split(' ')
            // item.position.jobContent=item.position.job_content
          } else {
            return (item.position.jobContent = [item.position.job_content])
            //  ();
          }

          if (item.position.requirement.indexOf('；') >= 0) {
            item.position.jobrequirement = item.position.requirement.split('；')

            item.position.jobrequirement = item.position.jobrequirement.filter(
              (rs) => {
                return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
              }
            )
          } else if (item.position.requirement.indexOf(' ') >= 0) {
            item.position.jobrequirement = item.position.jobrequirement.split(' ')
            // item.position.jobContent=item.position.job_content
          } else {
            return (item.position.jobrequirement = [item.position.requirement])
            //  ();
          }

          // let a = "1.努力 2.上进 3.有潜力"
          //  (item.position.job_content.indexOf(" "));
          // if(item.position.job_content.indexOf(" ")){
          //    item.position.jobContent = item.position.job_content.split(" ");
          //    item.position.jobContent = item.position.jobContent.filter(rs=> {
          //   return rs && rs.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
          // });
          // }

          //  (item.position.jobContent);
          if (item.salary_min > 1000) {
            item.salary_min = item.salary_min / 1000 + 'K'
          }
          if (item.salary_max > 1000) {
            item.salary_max = item.salary_max / 1000 + 'K'
          }
        })
        this.$store.commit('user/SET_SERCHLIST', this.lists)
        //  (this.$store.state.user.searchList);
      })
    },
    dianji (e) {
      // this.list()
      // console.log(e);
      // console.log(this.list);
      // console.log(1)
      // await jobSearch('').then((res) => {
      //   //  (res.data);
      //   //  (this.dict);
      //   this.lists = res.data.post_list;
      //   // console.log(res.data.post_list)
      //   //  (this.list)
      //   this.lists.forEach((item) => {
      //     item.salary_min = parseInt(item.salary_min);
      //     item.salary_max = parseInt(item.salary_max);
      //     item.enterprise.logo = this.disposeImg(item.enterprise.logo);
      //     // 工资单位
      //     res.data.salary_unit_options.forEach(unit => {
      //       if (item.salary_unit == unit.idx) {
      //         item.salary_unit = unit.label;
      //       }
      //     });
      //     // 融资
      //     res.data.financial_options.forEach((financial) => {
      //       if (financial.idx == item.enterprise.financing_status) {
      //         item.enterprise.financing_status = financial.label;
      //         //  (this.userVitaed);
      //       }
      //     });
      //     // 工作性质
      //     res.data.job_nature_options.forEach((nature) => {
      //       if (nature.idx == item.job_nature) {
      //         item.job_nature = nature.label;
      //         //  (this.userVitaed);
      //       }
      //     });
      //     // 工作经验 job_experience
      //     res.data.exp_options.forEach((exp) => {
      //       if (exp.idx == item.job_experience) {
      //         item.job_experience = exp.label;
      //         //  (this.userVitaed);
      //       }
      //     });
      //
      //     if (this.dict) {
      //       // 地址
      //       this.dict.province_choices.forEach((choices) => {
      //         if (choices.idx == item.city) {
      //           item.city = choices.label;
      //           //  (this.userVitaed);
      //         }
      //       });
      //       // 学历
      //       this.dict.education_choices.forEach((education) => {
      //         if (education.idx == item.education) {
      //           item.education = education.label;
      //         }
      //       });
      //     }
      //
      //     if (item.position.job_content.indexOf('；') > 0) {
      //       item.position.jobContent = item.position.job_content.split('；');
      //       item.position.jobContent = item.position.jobContent.filter((rs) => {
      //         return rs && rs.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
      //       });
      //     } else if (item.position.job_content.indexOf(' ') > 0) {
      //       item.position.jobContent = item.position.job_content.split(' ');
      //       // item.position.jobContent=item.position.job_content
      //     } else {
      //       return (item.position.jobContent = [item.position.job_content]);
      //       //  ();
      //     }
      //
      //     if (item.position.requirement.indexOf('；') >= 0) {
      //       item.position.jobrequirement = item.position.requirement.split('；');
      //
      //       item.position.jobrequirement = item.position.jobrequirement.filter(
      //         (rs) => {
      //           return rs && rs.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
      //         }
      //       );
      //     } else if (item.position.requirement.indexOf(' ') >= 0) {
      //       item.position.jobrequirement = item.position.jobrequirement.split(' ');
      //       // item.position.jobContent=item.position.job_content
      //     } else {
      //       return (item.position.jobrequirement = [item.position.requirement]);
      //       //  ();
      //     }
      //
      //     // let a = "1.努力 2.上进 3.有潜力"
      //     //  (item.position.job_content.indexOf(" "));
      //     // if(item.position.job_content.indexOf(" ")){
      //     //    item.position.jobContent = item.position.job_content.split(" ");
      //     //    item.position.jobContent = item.position.jobContent.filter(rs=> {
      //     //   return rs && rs.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
      //     // });
      //     // }
      //
      //     //  (item.position.jobContent);
      //     if (item.salary_min > 1000) {
      //       item.salary_min = item.salary_min / 1000 + 'K';
      //     }
      //     if (item.salary_max > 1000) {
      //       item.salary_max = item.salary_max / 1000 + 'K';
      //     }
      //   });
      //   this.$store.commit('user/SET_SERCHLIST', this.lists);
      //   //  (this.$store.state.user.searchList);
      // });
      this.lists = this.arrs
      const arr = []
      // console.log(this.lists)
      this.lists.forEach(rs => {
        // console.log(rs.job_experience == e);
        if (rs.job_experience == e) {
          arr.push(rs)
        } else {
          // this.lists=arr
        }
        // this.lists=arr
      })
      this.arr = arr
      // console.log(arr);
      this.$store.commit('user/SET_SERCHLIST', this.arr)
    },
    clearSearch () {
      // this.expvalue = '';
      // this.choicesvalue = '';
      // this.staffvalue = '',
      //   this.financialvalue = '';
      this.value = ''
      // this.city = '不限';
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
