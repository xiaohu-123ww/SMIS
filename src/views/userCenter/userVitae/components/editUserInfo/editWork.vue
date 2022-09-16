<template>
  <div class="firstCom">
    <div class="title">编辑工作经历</div>
    <div class="company-form">
      <el-form
        v-for="(job, index) in form"
        :key="index"
        :inline="true"
        :model="job"
        label-position="top"
      >
        <!-- position_class_choices -->
        <el-form-item label="就职公司">
          <el-input v-model="job.enterprise" style="width: 86%" />
        </el-form-item>
        <!-- <el-form-item v-if="job.position" label="岗位">
          <el-select v-model="job.position.id" filterable placeholder="请选择">
            <el-option
              v-for="item in Options.position_class_choices"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->

        <el-form-item label="岗位">
          <el-cascader
            v-model="job.position.id"
            :props="{
              children: 'children',
              label: 'name',
              value: 'id',
            }"
            :options="positionChoices"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="在职时间" style="padding-top: 10px">
          <!--          <el-date-picker-->
          <!--            v-model="job.start_date"-->
          <!--            end-placeholder="结束日期"-->
          <!--            range-separator="至"-->
          <!--            start-placeholder="开始日期"-->
          <!--            value-format="yyyy-MM-dd"-->
          <!--            type="daterange"-->
          <!--            @change="getTime()"-->
          <!--          />-->
          <el-date-picker
            v-model="job.start_date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd"
          />
          至
          <el-date-picker
            v-model="job.end_date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            type="date"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="负责内容" style="padding-top: 10px; width: 100%">
          <el-input v-model="job.job_content" :rows="3" style="width: 86%" />
        </el-form-item>
        <el-form-item class="form-submit">
          <el-button
            round
            style="
              width: 100px;
              margin-left: 40px;
              margin-bottom: 30px;
              background-color: #cecece;
              color: #fff;
            "
            @click="cancel"
          >取消
          </el-button>
          <el-button
            round
            style="
              width: 100px;
              margin-left: 40px;
              margin-bottom: 30px;
              background-color: #3c69be;
              color: #fff;
            "
            @click="onSubmit(job)"
          >保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { editExperiences, getUservitae, editUserdetails } from '@/api/user';
export default {
  props: ['vitaed', 'workId'],
  data() {
    return {
      form: [],
      Options: [],
      showWork: true,
      positionChoices: [],
      value: [1, 12]
    };
  },
  created() {
    getUservitae().then(rs => {
      // rs.data.getUservitae

      this.positionChoices = this.trees(rs.data.position_class_choices, 'id', 'parent_id');
    });
    this.Options = this.vitaed;
    if (this.workId) {
      this.vitaed.job_info_set.forEach(rs => {
        if (rs.id == this.workId) {
          this.form.push(rs);
        }
      });
    } else {
      this.form = [
        {
          start_date: '',
          end_date: '',
          enterprise: '',
          position: {
            id: ''
          },
          job_content: ''
        }
      ];
    }

    // this.form = this.vitaed;
  },
  methods: {
    handleTree(data, id, parentId, children, rootId) {
      id = id || 'id';
      parentId = parentId || 'parentId';
      children = children || 'children';
      rootId = rootId || 0;
      // 对源数据深度克隆
      //  (JSON.stringify(data));\
      //  (rootId);
      const cloneData = JSON.parse(JSON.stringify(data));

      // 循环所有项
      const treeData = cloneData.filter(father => {
        const branchArr = cloneData.filter(child => {
          // 返回每一项的子级数组
          //  (father[id] === child[parentId]);

          return father[id] == child[parentId];
        });
        branchArr.length > 0 ? (father.children = branchArr) : '';
        // 返回第一层
        return father[parentId] == null;
      });
      //  (treeData);
      return treeData != '' ? treeData : data;
    },
    handleChange(value) {

    },
    changeRadio(e) {
    },
    getTime(date) {
    },
    onSubmit(item) {
      if (typeof (item.position.id) === 'number') {
        if (this.workId) {
          // 修改
          editUserdetails({
            type: '1051',
            id: String(item.id),
            start: item.start_date,
            end: item.end_date,
            enterprise: item.enterprise,
            position: String(item.position.id),
            content: item.job_content
          }).then(rs => {
            if (rs !== undefined) {
              this.$message({
                message: rs.msg,
                type: 'success'
              });
              this.$emit('editWork', this.showWork);
            } else {

            }
          });
        } else {
          // 新增
          editUserdetails({
            type: '1053',
            start: item.start_date,
            end: item.end_date,
            enterprise: item.enterprise,
            position: String(item.position.id),
            content: item.job_content
          }).then(rs => {
            if (rs !== undefined) {
              this.$message({
                message: rs.msg,
                type: 'success'
              });
              this.$emit('editWork', this.showWork);
            } else {

            }
          });
        }
      } else {
        if (this.workId) {
          // 修改
          editUserdetails({
            type: '1051',
            id: String(item.id),
            start: item.start_date,
            end: item.end_date,
            enterprise: item.enterprise,
            position: String(item.position.id[1]),
            content: item.job_content
          }).then(rs => {
            if (rs !== undefined) {
              this.$message({
                message: rs.msg,
                type: 'success'
              });
              this.$emit('editWork', this.showWork);
            } else {

            }
          });
        } else {
          // 新增
          editUserdetails({
            type: '1053',
            start: item.start_date,
            end: item.end_date,
            enterprise: item.enterprise,
            position: String(item.position.id[1]),
            content: item.job_content
          }).then(rs => {
            if (rs !== undefined) {
              this.$message({
                message: rs.msg,
                type: 'success'
              });
              this.$emit('editWork', this.showWork);
            } else {

            }
          });
        }
      }
    },
    cancel() {
      this.$emit('editWork', this.showWork);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.el-form--inline .el-form-item {
  width: 45%;
}

.firstCom {
  .title {
    width: 100%;
    height: 100px;
    padding-top: 30px;
    padding-left: 30px;
    font-size: 20px;
    color: #2f2f2f;
  }

  .company-form {
    width: 100%;
    height: auto;
    padding-left: 30px;

    .el-radio-button {
      border: #d9d9d9 1px solid;
      width: 100px;
      margin-right: 20px;
    }

    .elBtn span {
      width: 100px;
      border-radius: 0;
    }

    .is-active span {
      border: 1px solid #1996fc;
      background-color: #d8f3ff;
      box-sizing: border-box;
    }

    .form-submit {
      width: 86%;
      min-height: 75px;
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
    }
  }
}
</style>
