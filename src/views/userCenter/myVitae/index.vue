<template>
  <div class="myvitae-box">
    <div v-for="(item, index) in list" :key="index" class="vitea-list">
      <div class="left">
        <div class="title">{{ item.cvname }}简历</div>
        <p style="line-height: 30px">创建时间：{{ item.create_time }}</p>
        <p style="line-height: 30px">上次修改：{{ item.update_time }}</p>
        <p style="line-height: 30px">求职意向：{{ item.get_intention }}</p>
      </div>
      <div class="right">
        <router-link :to="{ path: '/talent/edit/', query: { item: item } }">
          <el-button round size="medium" style="color: #fff" type="success"
            >查看
          </el-button>
        </router-link>

        <el-button
          round
          size="medium"
          style="background: #3c69be; color: #fff; margin-left: 10px"
          @click="addVitea(item)"
          >修改
        </el-button>
        <el-button round size="medium" type="danger" @click="deletecv(item)"
          >删除
        </el-button>
      </div>
    </div>
    <div class="vitea-btn">
      <div
        style="color: blue; font-size: 20px; cursor: pointer"
        @click="Backto"
      >
        <el-button type="primary" round>返回</el-button>
      </div>

      <el-button
        round
        style="background: #3c69be; color: #fff; padding: 10px 40px 10px 40px"
        @click="addVitea()"
        >新建简历
      </el-button>
    </div>

    <!-- 弹出框 -->
    <vitea-dialog
      ref="ruleForm"
      :buttonname="buttonname"
      :dictionaries="dictionaries"
      :list="vitealist"
      :open="open"
      :viteaname="name"
      :status="status"
      @dialogClose="dialogClose"
    />
  </div>
</template>
<script>
import viteaDialog from './components/viteaDialog.vue'
import { delCv, getVitaelist } from '@/api/user'

export default {
  components: {
    viteaDialog
  },
  data () {
    return {
      open: false,
      list: ['', ''],
      name: '',
      vitealist: {},
      buttonname: '',
      dictionaries: '',
      status: ''
    }
  },
  created () {

    this.getList()
  },
  methods: {

    Backto () {
      this.$router.go(-1);
    },
    getList () {
      getVitaelist().then(res => {

        this.dictionaries = res.data
        this.list = res.data.cv_list
        // console.log(this.list);
        this.list.forEach(date => {
          date.cvname = date.industry.name
          date.create_time = this.formateDate(this.dateFormat('YYYY-mm-dd HH:MM', date.create_time))
          date.update_time = this.formateDate(this.dateFormat('YYYY-mm-dd HH:MM', date.update_time))
        })
        res.data.position_class.forEach(itmes => {
          this.list.forEach(job => {
            if (job.get_intention == itmes.name) {
              job.intention = itmes.id
            }
            if (job.industry.id == itmes.id) {
              job.post = itmes.name
            }
          })
        })
        // res.data.skill_levels.forEach(skill => {
        //   this.list.forEach(item => {
        //     if (item.english_skill == skill.idx) {
        //       item.english_skill = skill.label
        //     }
        //     if (item.computer_skill == skill.idx) {
        //       item.computer_skill = skill.label
        //     }
        //   })
        // })

      })
    },
    deletecv (cv) {
      this.$confirm(`是否要删除`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      })
        .then(() => {
          delCv({
            type: '403',
            id: cv.id
          }).then(rs => {

            this.getList()
          })
        });

    },
    addVitea (item) {
      if (item) {
        // console.log(item);
        this.name = '修改简历'
        this.vitealist = item
        this.status = true
        this.open = true
        this.buttonname = '保存'
      } else {
        this.status = false
        this.vitealist = {
          cvname: '',
          major: '',
          courses: '',
          post: '',
          intention: '',
          industry: {
            name: ''
          },
          englistSkill: '',
          computerSkill: '',
          expected_salary: '',
          professional_skill: '',
          award: '',
          talent: ''
        }
        this.name = '创建简历'
        this.open = true
        this.buttonname = '创建'
      }
    },
    // 对话框关闭
    dialogClose (val) {
      this.open = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.myvitae-box {
  width: 62%;
  min-width: 1000px;
  height: auto;
  padding: 30px 0 50px 0;
  margin: 0 auto;

  .vitea-list {
    width: 100%;
    height: auto;
    border: 1px solid #cecece;
    border-radius: 10px;
    padding: 35px 30px 35px 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .left {
      width: 70%;

      .title {
        font-size: 28px;
        font-weight: 600;
        line-height: 42px;
        color: #2f2f2f;
      }
    }

    .right {
      width: 30%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
  }

  .vitea-btn {
    width: 100%;
    padding: 25px 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
