<template>
  <div>
    <div>
      <div class="resume-job-one">
        <div style="width: 92%; margin-top: 10px">求职意向</div>
        <div>
          <el-button
            v-if="!show"
            type="text"
            icon="el-icon-plus"
            :disabled="list.length === 3"
            @click="add"
            >添加</el-button
          >
          <el-button v-if="show" type="text" icon="el-icon-edit" @click="add"
            >编辑</el-button
          >
        </div>
      </div>
      <div>
        <div v-if="!show" class="resume-job-two" style="margin: 20px 0">
          <div>
            <div>
              <div v-for="item in list" :key="item.id">
                <div style="display: flex; padding-right: 25px">
                  <div
                    class="grid-content bg-purple"
                    style="font-weight: 700; width: 77%"
                  >
                    {{ item.position_class }}
                  </div>
                  <div style="display: flex">
                    <el-button
                      type="text"
                      icon="el-icon-edit"
                      @click="modification(item)"
                      >编辑</el-button
                    >

                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      @click="deleteList(item.id)"
                      >删除</el-button
                    >
                  </div>
                </div>

                <div class="resum-jobs">
                  <el-row>
                    <el-col :span="12"
                      ><div class="grid">
                        期望薪资：{{ item.salary_min }} - {{ item.salary_max }}
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="grid">期望城市：{{ item.city }}</div></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="12"
                      ><div class="grid">
                        工作性质：{{ item.job_nature }}
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="grid">
                        期望行业：{{ item.field }}
                      </div></el-col
                    >
                  </el-row>
                </div>
              </div>
            </div>
            <el-empty
              v-if="list.length === 0"
              :image-size="150"
              description="再无求职意向列表"
            ></el-empty>
          </div>
        </div>
      </div>
      <ResumeDialog :show="show" :num="num" @reset="reset" />
    </div>
  </div>
</template>
<script>
import ResumeDialog from './resumeDialog.vue'
import { getjobIntention, getjobIntentionDelete } from '@/api/my/resume'
export default {
  components: { ResumeDialog },
  data () {
    return {
      // 求职意向
      show: false,
      empty: true,
      list: [],
      num: {}
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getJobList()
  },
  methods: {
    add () {
      this.show = true
      this.getJobList()
    },
    reset (i) {
      this.show = i
      this.getJobList()
    },
    async getJobList () {
      const { data } = await getjobIntention()
      console.log('求职意向列表', data)

      this.list = data.results
    },
    // 删除
    deleteList (id) {
      this.$confirm('是否删除此数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(async () => {
        const res = await getjobIntentionDelete(id)
        console.log(res)
        this.$message.success('删除成功')
        this.getJobList()
      })
    },
    // 修改
    modification (item) {
      console.log('item', item)
      this.show = true
      this.num = item
    }
  }
}
</script>
<style scoped lang="scss">
.resume-job-one {
  // height: 40px;
  // background-color: red;
  // border-bottom: 1px solid #e6e3e3;
  color: #256efd;
  font-weight: 700;
  display: flex;
  font-size: 20px;
  padding: 0px 25px;
  .bg-purple {
    margin-top: 20px;
    color: #256efd;
    font-weight: 600;
  }
  .bg-purple-light {
    margin-top: 15px;
  }
}
.resume-job-two {
  // height: 150px;
  .bg-purple {
    margin: 20px 0 0 50px;
    font-size: 20px;
  }
  .bg-purple-light {
    margin-top: 10px;
    padding-left: 10px;
  }
  .resum-jobs {
    height: 130px;

    .grid {
      margin: 30px 0 0 70px;
      font-size: 18px;
    }
  }
}
::v-deep .el-button + .el-button {
  margin-left: 30px;
}
</style>
