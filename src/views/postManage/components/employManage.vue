<template>
  <div class="employManage-box">
    <div class="title" style="font-size: 30px; font-weight: 600">招聘管理</div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column style="position: relative" width="100">
          <svg-icon
            icon-class="zhi"
            style="font-size: 20px; position: absolute; left: 20px; top: 10px"
          />
        </el-table-column>
        <el-table-column label="岗位名称" prop="names" />
        <el-table-column label="岗位类别" prop="position.pst_class.name" />
        <!-- <el-table-column label="发布状态" prop="is_closed">
          <template scope="scope">
            <el-switch v-model="!scope.row.is_closed" />
          </template>
        </el-table-column> -->
        <el-table-column label="需求人数" prop="number_of_employers" />
        <el-table-column label="招聘截止" prop="post_limit_time" />
        <el-table-column width="270">
          <template slot="header">
            <div>
              <span>招聘操作</span>
            </div>
          </template>
          <template slot-scope="scope" style="display: flex">
            <el-button
              round
              size="small  "
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              round
              size="small  "
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >撤销
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="tableData.pageNum"
        :page-size="tableData.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="totalNum"
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800">
      <div class="dialog-form">
        <el-form :model="addEmployForm" label-position="top">
          <el-form-item label="招聘人数" prop="number_of_employers">
            <el-input
              v-model="addEmployForm.number_of_employers"
              placeholder="请输入招聘人数"
            />
          </el-form-item>
          <el-form-item label="薪资待遇" prop="salary_min">
            <el-col :span="6">
              <el-input v-model="addEmployForm.salary_min" />
            </el-col>
            <el-col :offset="1" :span="2"> ---</el-col>
            <el-col :span="6">
              <el-input v-model="addEmployForm.salary_max" />
            </el-col>
            <!-- <el-col :offset="1" :span="6"> 元/月</el-col> -->
            <el-col :offset="1" :span="6">
              <el-select
                v-model="addEmployForm.salary_unit"
                placeholder="请选择工资单位"
              >
                <el-option
                  v-for="item in options"
                  :key="item.idx"
                  :label="item.label"
                  :value="item.idx"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="工作经验" prop="job_experience">
            <!--            <el-input v-model="addEmployForm.job_experience" />-->
            <el-radio-group
              v-model="addEmployForm.job_experience"
              style="width: 100%"
              text-color="#191919"
              @change="changeDegree"
            >
              <el-radio-button
                v-for="(item, index) in expOptions"
                :key="item.label"
                :label="item.idx"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学历要求" prop="degree">
            <el-radio-group
              v-model="addEmployForm.education"
              style="width: 100%"
              text-color="#191919"
              @change="changeDegree"
            >
              <el-radio-button
                v-for="(item, index) in degreeList"
                :key="item.label"
                :label="item.idx"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="工作地点" prop="place">
            <!--            <el-input v-model="addEmployForm.place" />-->
            <el-select v-model="addEmployForm.city" placeholder="请选择">
              <el-option
                v-for="item in citiesOptions"
                :key="item.idx"
                :label="item.label"
                :value="item.idx"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="工作性质" prop="property">
            <el-radio-group
              v-model="addEmployForm.job_nature"
              style="width: 100%"
              text-color="#191919"
              @change="changeProperty"
            >
              <el-radio-button
                v-for="(item, index) in propertyList"
                :key="index.label"
                :label="item.idx"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="截止时间" prop="post_limit_time">
            <el-date-picker
              v-model="addEmployForm.post_limit_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              type="date"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { changePost, postList } from '@/api/enterprise';

export default {
  inject: ['reload'],
  data() {
    return {
      // 弹出框
      open: false,
      totalNum: 0,
      tableData: [
        {
          post: 'UI设计师',
          category: '网页UI设计师',
          status: '招聘中',
          count: '3',
          stop: '2021年5月26日',
          addPost: '',
          pageNum: 1,
          pageSize: 10
        }
      ],
      // 弹出框标题
      title: '',
      // 学历要求
      degreeList: [
        '不限',
        '高中/中专',
        '高职/高专',
        '本科/职业本科',
        '硕士研究生',
        '硕士博士生'
      ],
      propertyList: ['全职', '兼职', '实习', '校园', '不限'],
      citiesOptions: [],
      expOptions: [],
      // 添加表单
      addEmployForm: {},

      options: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      postList().then(rs => {
        this.expOptions = rs.data.exp_options;
        this.tableData = rs.data.recruitment;

        this.options = rs.data.salary_unit_options;
        // this.tableData.post_limit_time=this.tableData.post_limit_time.split("-")[0]
        this.degreeList = rs.data.education_choices;
        this.citiesOptions = rs.data.cities_options;
        this.propertyList = rs.data.job_nature_options;
        this.tableData.forEach(item => {
          // console.log(item);
          // item.update_time = this.formateDate(this.dateFormat('YYYY-mm-dd HH:MM', item.update_time));
          if (item.position.fullname == '') {
            item.names = item.position.pst_class.name;
          } else {
            item.names = item.position.fullname;
          }
        });
      });
    },
    // 单选框
    changeDegree() {
    },
    changeProperty() {
    },
    // 改变分页信息
    handleSizeChange(val) {
    },
    // 改变页码
    handleCurrentChange(val) {
    },
    // 删除
    handleDelete(index, item) {
      this.$confirm('是否撤销该招聘', '提示', {
        iconClass: 'el-icon-question',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        showClose: true,
        type: 'warning'
      }).then(() => {
        changePost({
          type: '203',
          id: String(item.id)

        }).then(rs => {
          //  (rs)
          this.getList();
          this.reload();
        });
      });
    },
    // 编辑
    handleEdit(index, item) {
      this.open = true;
      //  (item);
      this.addEmployForm = item;
    },
    // 添加
    addEmp() {
      this.addEmployForm = {
        position: {
          fullname: ''
        },
        salary_unit: '',
        number_of_employers: '',
        salary_min: '',
        salary_max: '',
        job_experience: '',
        education: '',
        city: '',
        job_nature: '',
        post_limit_time: '',
        id: ''
      };
      this.open = true;
    },
    submit() {
      //  (this.addEmployForm.id == '')
      if (this.addEmployForm.id == '') {
        // 添加
        changePost({
          type: '202',
          number: this.addEmployForm.number_of_employers,
          education: this.addEmployForm.education,
          salary_1: this.addEmployForm.salary_min,
          salary_2: this.addEmployForm.salary_max,
          salary_unit: this.addEmployForm.salary_unit,
          city: this.addEmployForm.city,
          exp: this.addEmployForm.job_experience,
          nature: this.addEmployForm.job_nature,
          deadline: this.addEmployForm.post_limit_time
        }).then(rs => {
          //  (rs);
          if (rs !== undefined) {
            this.$message({
              message: rs.msg,
              type: 'success'
            });
            this.open = false;
            this.getList();
          } else {

          }
        });
      } else {
        // 修改
        changePost({
          type: '101',
          number: this.addEmployForm.number_of_employers,
          education: this.addEmployForm.education,
          salary_1: this.addEmployForm.salary_min,
          salary_2: this.addEmployForm.salary_max,
          salary_unit: this.addEmployForm.salary_unit,
          city: this.addEmployForm.city,
          exp: this.addEmployForm.job_experience,
          nature: this.addEmployForm.job_nature,
          deadline: this.addEmployForm.post_limit_time,
          id: this.addEmployForm.id
        }).then(rs => {
          //  (rs);
          if (rs !== undefined) {
            this.$message({
              message: rs.msg,
              type: 'success'
            });
            this.open = false;
            this.getList();
          } else {

          }
        });
      }
    },
    cancel() {
      this.open = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.employManage-box {
  width: 88%;
  // min-width: 1300px;
  margin: 40px auto;
  padding-left: 20px;

  .title {
    width: 100%;
    height: 80px;
    color: #2f2f2f;
    font-size: 23px;
    padding-top: 20px;
  }

  .table {
    width: 100%;
    height: auto;
    text-align: center;

    .el-icon-circle-plus:hover {
      color: #1996fc;
    }

    span:hover {
      color: #1996fc;
    }
  }

  .pagination {
    width: 80%;
    padding-top: 20px;
    margin: 0 auto;
    text-align: center;
  }

  .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__body {
        .dialog-form {
          .el-form-item__content {
            .el-radio-group {
              .el-radio-button {
                border: #d9d9d9 1px solid;
                margin-right: 7px;

                .el-radio-button__inner {
                  border: none;
                }
              }

              .is-active span {
                border: 1px solid #1996fc;
                background-color: #d8f3ff;
                box-sizing: border-box;
              }
            }
          }
        }
      }
    }
  }
}
</style>
