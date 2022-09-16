<template>
  <div class="postManage-box">
    <div class="title" style="font-size: 30px; font-weight: 600">岗位管理</div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column width="100">
          <template slot-scope="scope" style="cursor: pointer">
            <i
              class="el-icon-delete"
              style="font-size: 20px; padding-left: 20px; cursor: pointer"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="岗位名称" prop="names" />
        <el-table-column label="岗位类别" prop="pst_class.name" />
        <el-table-column label="更新时间" prop="update_time" />
        <el-table-column label="发布状态" prop="status">
          <template scope="scope">
            <el-switch v-model="scope.row.is_posting" disabled />
          </template>
        </el-table-column>
        <el-table-column width="270">
          <template slot="header">
            <div style="cursor: pointer" @click="addPost">
              <i
                class="el-icon-circle-plus"
                style="margin-right: 5px; font-size: 16px"
              /><span>添加岗位</span>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              round
              size="small  "
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              v-if="scope.row"
              round
              size="small  "
              :type="scope.row.is_posting == true ? 'info' : 'success'"
              :disabled="scope.row.is_posting == true ? true : false"
              @click="issuePost(scope.$index, scope.row)"
            ><span ref="posting">{{ scope.row.posting }}</span>
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
    <el-dialog :title="title" :visible.sync="isOpen" width="800">
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
                  v-for="item in salaryOptiond"
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
                :key="index"
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
                :key="index"
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
        <el-button type="primary" @click="issue">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="open" append-to-body width="600px">
      <el-form
        ref="form"
        :model="addEmployForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item
          v-if="addEmployForm.pst_class"
          label="岗位类别"
          prop="name"
        >
          <!--          <el-input-->
          <!--            v-model="addEmployForm.pst_class.name"-->
          <!--            placeholder="请输入岗位名称"-->
          <!--          />-->

          <el-cascader
            v-model="addEmployForm.pst_class.id"
            :props="{
              children: 'children',
              label: 'name',
              value: 'id',
            }"
            :options="options"
          />
        </el-form-item>
        <el-form-item label="岗位名称" prop="fullname">
          <el-input
            v-model="addEmployForm.fullname"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item label="岗位职责" prop="requirement">
          <el-input v-model="addEmployForm.requirement" type="textarea" />
        </el-form-item>
        <el-form-item label="工作内容" prop="job_content">
          <el-input v-model="addEmployForm.job_content" type="textarea" />
        </el-form-item>
        <el-form-item label="补充说明" prop="remark">
          <el-input v-model="addEmployForm.extra_info" type="textarea" />
        </el-form-item>
      </el-form>
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
      dis: true,
      open: false,
      isOpen: false,
      // 弹出框标题
      title: '',
      totalNum: 0,
      tableData: [
        {
          post: 'UI设计师',
          category: '网页UI设计师',
          update: '2021年4月29日 14:58',
          status: '招聘',
          addPost: '',
          pageNum: 1,
          pageSize: 10
        }
      ],
      expOptions: [],
      // 添加表单
      addEmployForm: {},
      options: [],
      salaryOptiond: [],
      degreeList: [],
      propertyList: ['全职', '兼职', '实习', '校园', '不限'],
      citiesOptions: [],
      inviteid: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    issue() {
      changePost({
        type: '202',
        id: this.inviteid,
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
          this.isOpen = false;
          this.getList();
          this.reload();
        } else {

        }
      });
    },
    changeDegree() {
    },
    getList() {
      postList().then(rs => {
        //  (rs.data);
        // console.log(rs.data);
        this.salaryOptiond = rs.data.salary_unit_options;
        this.citiesOptions = rs.data.cities_options;
        this.propertyList = rs.data.job_nature_options;
        this.expOptions = rs.data.exp_options;
        this.degreeList = rs.data.education_choices;
        this.options = this.trees(rs.data.position_class, 'id', 'parent_id');
        // console.log(this.options)
        this.tableData = rs.data.positions;
        this.tableData.forEach(item => {
          // this.options = item.is_posting
          if (item.fullname == '') {
            item.names = item.pst_class.name;
          } else {
            item.names = item.fullname;
          }
          // console.log(item.update_time);
          // item.update_time = this.formateDate(this.dateFormat('YYYY-mm-dd', item.update_time));
          item.update_time = item.update_time.split('T')[0];
          if (item.is_posting == true) {
            // console.log(this.$refs.posting.innerText)
            // this.$refs.posting.innerText='已发布'
            item.posting = '已发';
          } else {
            item.posting = '发布';
          }
        });
        //  (this.formateDate());
        //  (this.formateDate(this.dateFormat('YYYY-mm-dd HH:MM', '2021-05-17T01:44:45.452')))
      });
    },
    handleEdit() {
    },
    handleDelete() {
    },
    // 改变分页信息
    handleSizeChange(val) {
    },
    changeProperty() {
    },
    // 改变页码
    handleCurrentChange(val) {
    },
    // 发布招聘
    issuePost(index, item) {
      this.isOpen = true;
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
      this.inviteid = item.id;
    },
    // 删除
    handleDelete(index, item) {
      this.$confirm(`是否要删除`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      }).then(() => {
        changePost({
          type: '103',
          id: String(item.id)
        }).then(rs => {
          this.getList();
        });
      }
      ).catch(() => {

      });
    },
    // 编辑
    handleEdit(index, item) {
      this.open = true;
      //  (index);
      //  (item);
      this.addEmployForm = item;
      // console.log(item);
    },
    // 添加
    addPost() {
      this.addEmployForm = {
        pst_class: {
          name: ''
        },
        id: '',
        fullname: '',
        requirement: '',
        remark: '',
        job_content: '',
        extra_info: '',
        class: ''
      };
      this.open = true;
    },
    submit() {
      //  (this.addEmployForm.id == '');
      if (this.addEmployForm.id == '') {
        // 添加
        // console.log(this.addEmployForm)
        // console.log(this.addEmployForm.pst_class.id);
        if (this.addEmployForm.pst_class.id == undefined) {
          // console.log(this.addEmployForm.job_content);
          changePost({
            type: '000',
            name: this.addEmployForm.fullname,
            content: this.addEmployForm.job_content || '',
            requirement: this.addEmployForm.requirement || '',
            extra: this.addEmployForm.extra_info || '',
            class: this.addEmployForm.pst_class.id || ''
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
          changePost({
            type: '000',
            name: this.addEmployForm.fullname,
            content: this.addEmployForm.job_content,
            requirement: this.addEmployForm.requirement,
            extra: this.addEmployForm.extra_info,
            class: this.addEmployForm.pst_class.id[1] || ''
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
      } else {
        // 修改
        if (typeof (this.addEmployForm.pst_class.id) === 'number') {
          changePost({
            type: '201',
            id: this.addEmployForm.id,
            name: this.addEmployForm.fullname,
            content: this.addEmployForm.job_content,
            requirement: this.addEmployForm.requirement,
            extra: this.addEmployForm.extra_info,
            class: this.addEmployForm.pst_class.id
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
          changePost({
            type: '201',
            id: this.addEmployForm.id,
            name: this.addEmployForm.fullname,
            content: this.addEmployForm.job_content,
            requirement: this.addEmployForm.requirement,
            extra: this.addEmployForm.remark,
            class: this.addEmployForm.pst_class.id[1]
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

        // if (==array)
      }
    },
    cancel() {
      this.open = false;
      this.isOpen = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.postManage-box {
  width: 88%;
  // min-width: 1300px;
  margin: 20px auto;
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
}
</style>
