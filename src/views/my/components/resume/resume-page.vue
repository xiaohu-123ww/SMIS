<template>
  <div>
    <div>
      <div class="resume-job-one">
        <el-row>
          <el-col :span="20"
            ><div class="grid-content bg-purple">求职意向</div></el-col
          >
          <el-col :span="1"
            ><div class="grid-content bg-purple-light">
              <el-button
                v-if="!show"
                type="primary"
                icon="el-icon-plus"
                :disabled="list.length === 3"
                @click="add"
                >添加</el-button
              >
              <el-button
                v-if="show"
                type="primary"
                icon="el-icon-edit"
                @click="add"
                >编辑</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
      <div>
        <div v-if="!show" class="resume-job-two" style="margin: 20px 0">
          <div>
            <div v-if="empty">
              <div v-for="item in list" :key="item.id">
                <el-row>
                  <el-col :span="17"
                    ><div
                      class="grid-content bg-purple"
                      style="font-weight: 700"
                    >
                      {{ item.position_class }}
                    </div></el-col
                  >
                  <el-col :span="2"
                    ><div class="grid-content bg-purple-light">
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        @click="modification(item)"
                        >编辑</el-button
                      >
                    </div></el-col
                  >
                  <el-col :span="3"
                    ><div
                      class="grid-content bg-purple-light"
                      style="margin-left: 30px"
                    >
                      <el-button
                        type="success"
                        icon="el-icon-delete"
                        @click="deleteList(item.id)"
                        >删除</el-button
                      >
                    </div></el-col
                  >
                </el-row>
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
              v-else
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
    },
    reset (i) {
      this.show = i
      this.getJobList()
    },
    async getJobList () {
      const { data } = await getjobIntention()
      console.log('求职意向列表', data)
      if (data.results.length === 0) {
        this.empty = false
      }
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
  font-size: 20px;
  padding-left: 25px;
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
</style>
