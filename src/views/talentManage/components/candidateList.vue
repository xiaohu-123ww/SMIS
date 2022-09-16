<template>
  <div>
    <!-- 网站UI-候选人列表 -->
    <div class="candidateList-box">
      <div class="title">网站UI岗位-候选人列表</div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="姓名" prop="name" width="100" />
          <el-table-column label="年龄" prop="age" width="100" />
          <el-table-column label="学历" prop="degree" width="100" />
          <el-table-column label="匹配项" prop="fit">
            <!-- <template slot-scope="scope"> -->
            <!-- <div slot="reference" class="name-wrapper"> -->
            <el-tag
              v-for="(item, index) in fitList"
              :key="index"
              :type="item === '工作经验' ? 'primary' : 'success'"
              size="medium"
              style="margin-bottom: 5px; margin-left: 5px"
              >{{ item }}
            </el-tag>
            <!-- </div> -->
            <!-- </template> -->
          </el-table-column>
          <el-table-column label="审核状态" prop="status" />
          <el-table-column label="时间" prop="time" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                round
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >查看
              </el-button>
              <el-button
                round
                size="mini"
                type="info"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
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
      fitList: ['工作经验', '工作经历', '工作年限', '学历']
    }
  },

  methods: {
    // 查看
    handleEdit () {
      this.$router.push({ path: '/talent/Cv/' })
    },
    // 删除
    handleDelete () {
    }
  }
}
</script>

<style lang="scss" scoped>
.candidateList-box {
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
  }
}
</style>
