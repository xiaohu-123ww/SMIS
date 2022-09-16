<template>
  <div>
    <!-- 网站UI岗位简历 -->
    <div
      v-for="(cvs, index) in getFullname(arr, tableData)"
      :key="index"
      class="postList-box"
    >
      <div class="title" style="font-size: 30px; font-weight: 600">
        {{ cvs.name }}
      </div>
      <div class="table">
        <el-table :data="cvs.value" style="width: 100%">
          <el-table-column
            label="姓名"
            prop="cv.user_id.first_name"
            width="80"
          />
          <el-table-column label="年龄" prop="candidate_age" width="80" />
          <el-table-column
            label="学历"
            prop="candidate_education_level"
            width="180"
          />
          <el-table-column label="匹配项" prop="fit" width="200">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag
                  :class="
                    scope.row.is_edu_match == true ? 'is_true' : 'is_false'
                  "
                  size="medium"
                  effect="dark"
                  style="margin-bottom: 5px; margin-left: 5px"
                >学历
                </el-tag>
                <el-tag
                  :class="
                    scope.row.is_jobExp_match == true ? 'is_true' : 'is_false'
                  "
                  effect="dark"
                  size="medium"
                  style="margin-bottom: 5px; margin-left: 5px"
                >工作经验
                </el-tag>
                <el-tag
                  :class="
                    scope.row.is_working_years_match == true
                      ? 'is_true'
                      : 'is_false'
                  "
                  size="medium"
                  effect="dark"
                  style="margin-bottom: 5px; margin-left: 5px"
                >工作年限
                </el-tag>
                <el-tag
                  :class="
                    scope.row.is_salary_match == true ? 'is_true' : 'is_false'
                  "
                  size="medium"
                  effect="dark"
                  style="margin-bottom: 5px; margin-left: 5px"
                >薪资
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" prop="progressState" width="150" />
          <el-table-column label="时间" prop="update_time" />
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <div class="abc">
                <router-link
                  :to="{
                    path: '/talent/Cv/',
                    query: { data: scope.row, pass: true }
                  }"
                >
                  <el-button
                    round
                    size="small  "
                    style="margin-right: 5px"
                    type="success"
                  >查看
                  </el-button>
                </router-link>
                <el-button-group>
                  <el-button
                    :disabled="scope.row.progress == 0 ? false : true"
                    type="primary"
                    round
                    size="small  "
                    @click="handlePass(scope.row)"
                  >通过</el-button>
                  <el-button
                    :disabled="scope.row.progress == 0 ? false : true"
                    type="primary"
                    round
                    size="small  "
                    @click="handleBack(scope.row)"
                  >退回</el-button>
                </el-button-group>
                <!--                <el-button-->
                <!--                  :disabled="scope.row.progress == 0 ? false : true"-->
                <!--                  round-->
                <!--                  size="mini"-->
                <!--                  type="primary"-->
                <!--                  @click="handlePass(scope.row)"-->
                <!--                  >通过-->
                <!--                </el-button>-->
                <!--                <el-button-->
                <!--                  round-->
                <!--                  size="mini"-->
                <!--                  type="primary"-->
                <!--                  @click="handleDelete(scope.$index, scope.row)"-->
                <!--                  >退回-->
                <!--                </el-button>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { enterpriseHr, resumeHr } from '@/api/enterprise';

export default {
  name: 'Index',
  data() {
    return {
      tableData: [
        {
          name: '张三',
          age: '22',
          degree: '本科',
          fit: ['工作经验', '工作经历', '工作年限', '学历'],
          status: '通过',
          time: '2021年04月25日',
          pageNum: 1,
          pageSize: 10
        }
      ],

      arr: [],
      fitList: ['工作经验', '工作经历', '工作年限', '学历']
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      enterpriseHr().then(rs => {
        //  (rs.data);
        // console.log(rs.data);
        this.arr = rs.data.rcms;
        // var  a = {applications:rs.data.applications}
        //  (this.arr)
        rs.data.education_levels.forEach(res => {
          // console.log(res);
          rs.data.applications.forEach(items => {
            // console.log(items.candidate_education_level == null);
            if (items.candidate_education_level == null) {
              // console.log(12);
              items.candidate_education_level = '无';
            } else {
              if (items.candidate_education_level == res.idx) {
                items.candidate_education_level = res.label;
              }
            }
            // console.log(items);
          });
        });
        rs.data.education_levels.forEach(item => {
          rs.data.applications.forEach(items => {
            // this.formateDate()
            items.update_time = this.dateFormat(
              'YYYY/mm/dd HH:MM',
              items.update_time
            );
            if (items.recruitment.education == item.idx) {
              items.recruitment.education = item.label;
            }
          });
        });
        rs.data.progress_choices.forEach(item => {
          rs.data.applications.forEach(items => {
            if (items.progress == item.idx) {
              items.progressState = item.label;
            }
          });
        });
        this.tableData = rs.data.applications;
      });
    },
    // 删除
    handleDelete() {},
    handleBack(row) {
      this.$confirm(`是否要退回${row.cv.user_id.first_name}的简历`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '退回',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      })
        .then(() => {
          resumeHr({
            type: '102',
            id: String(row.id)
          }).then(rs => {
            this.$message({
              type: 'success',
              message: `已退回${row.cv.user_id.first_name}的简历`
            });
            this.getList();
          });
        })
        .catch(action => {
          // resumeHr({
          //   type: '102',
          //   id: String(row.cv.id)
          // }).then(rs => {
          //   this.$message({
          //     type: 'success',
          //     message: `已退回${row.cv.user_id.first_name}的简历`
          //   })
          //   this.getList()
          // })
        });
    },
    // 通过
    handlePass(row) {
      //  (row)
      this.$confirm(`是否要通过${row.cv.user_id.first_name}的简历`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      })
        .then(() => {
          resumeHr({
            type: '101',
            id: String(row.id)
          }).then(rs => {
            this.$message({
              type: 'success',
              message: `已通过${row.cv.user_id.first_name}的简历`
            });
            this.getList();
          });
        })
        .catch(action => {
          // resumeHr({
          //   type: '102',
          //   id: String(row.cv.id)
          // }).then(rs => {
          //   this.$message({
          //     type: 'success',
          //     message: `已退回${row.cv.user_id.first_name}的简历`
          //   })
          //   this.getList()
          // })
        });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table {
  font-size: 16px;
  color: black;
  font-weight: 500;
}
.is_false {
  background: #cecece;
  border: 1px solid #cecece;
}
.is_true {
  background: #8ed0ff;
  border: 1px solid #8ed0ff;
}
.name-wrapper {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  span {
    width: 45%;
    text-align: center;
  }
}
.postList-box {
  width: 88%;
  // min-width: 1280px;
  height: auto;
  border: 1px #cecece solid;
  margin: 20px auto;
  border-radius: 10px;

  .title {
    width: 100%;
    height: 80px;
    color: #2f2f2f;
    font-size: 23px;
    padding-top: 20px;
    padding-left: 30px;
  }

  .table {
    width: 96%;
    height: auto;
    text-align: center;
    margin: 0 auto;

    .abc {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
