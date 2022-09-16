<template>
  <div class="content-box">
    <div class="job-box">
      <div class="title">求职列表</div>
      <div class="table">
        <el-table :data="jobWantList" style="width: 100%">
          <el-table-column align="center" label="招聘信息">
            <!--            prop="recruitment.position.pst_class.name"-->
            <!--            <template slot-scope="scope">-->
            <!--              <router-link :to="{path:'/postdes',query:{scope.row.recruitment}}" />-->

            <!--            </template>-->
            <template slot-scope="scope">
              <router-link
                :to="{
                  path: '/postdes',
                  name: 'postdes',
                  query: { id: scope.row.recruitment.id },
                }"
              >
                <p class="userclick">
                  {{ scope.row.recruitment.position.pst_class.name }}
                </p>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="公司名称"
            prop="recruitment.enterprise.name"
          />
          <el-table-column
            align="center"
            label="工作城市"
            prop="recruitment.city"
          />
          <el-table-column align="center" label="所投简历">
            <template slot-scope="scope">
              <!-- <router-link :to="{ path: '/talent/edit/', query: { item: item } }">
              <el-button round>查看更多</el-button>
            </router-link> -->
              <router-link
                :to="{ path: '/talent/edit/', query: { item: scope.row.cv } }"
              >
                <a href="" style="color: #0a76a4">{{
                  scope.row.cvs
                }}</a></router-link
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="投递时间" prop="create_time" />
          <el-table-column align="center" label="当前进度" prop="progress" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.progress == '未开始' ? false : true"
                :type="scope.row.progress == '未开始' ? 'danger' : 'info'"
                round
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                >撤回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        style="
          color: blue;
          font-size: 20px;
          margin: 20px auto;
          display: inline-block;
        "
        @click="Backto"
      >
        <el-button type="primary" style="cursor: pointer" round>返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { repList, sendList } from '@/api/jobs'

export default {
  data () {
    return {

      jobWantList: []
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    Backto () {
      this.$router.go(-1);
    },
    getlist () {
      sendList().then(rs => {
        //  (rs.data);
        // console.log(rs.data);

        rs.data.my_applications.forEach(res => {
          rs.data.city_choices.forEach(rs => {
            if (rs.idx == res.recruitment.city) {
              res.recruitment.city = rs.label
            }
          })
          res.cvs = '点击查看'
          res.create_time = res.create_time.split('T')[0]
          rs.data.my_cvs.forEach(item => {
            if (res.cv.id == item.id) {
              res.cv.name = item.major
            }
          })
          rs.data.progress_choices.forEach(plan => {
            if (res.progress == plan.idx) {
              //  (plan.label)
              res.progress = plan.label
              //  (res.progress)
            }
          })
        })
        this.jobWantList = rs.data.my_applications
        //  (this.jobWantList);
      })
    },
    handleDelete (index, item) {
      this.$confirm(`是否确定撤回该投递？`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      })
        .then(() => {
          repList({
            type: '103',
            id: item.id
          }).then(rs => {
            //  (rs);
            this.getlist()
          })
        });

    }
  }
}
</script>
<style lang="scss" scoped>
.userclick {
  text-decoration: underline;
  color: rgb(10, 118, 164) !important;
}
.content-box {
  background: #fff;
  width: 100%;
  // min-width: 1280px;
  height: 100%;
  overflow: hidden;

  .job-box {
    width: 62%;
    min-width: 1000px;
    margin: 0 auto;
    background-color: #fff;

    .title {
      width: 100%;
      padding: 60px 0 30px 30px;
      font-size: 30px;
      color: #2f2f2f;
    }

    .table {
      width: 100%;
      padding: 10px 0 10px 0;
      border: 1px solid #cecece;
      border-radius: 10px;
      margin-bottom: 30px;
    }
  }
}
</style>
