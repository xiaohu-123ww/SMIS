<template>
  <div>
    <div class="preponderance-one" style="display: flex">
      <div class="grid-content bg-purple" style="width: 92%">教育经历</div>
      <div class="grid-content bg-purple-light">
        <el-button
          v-if="!show"
          type="text"
          icon="el-icon-plus"
          :disabled="list.length === 10"
          style="margin-top: 10px"
          @click="edit"
          >添加</el-button
        >
      </div>
    </div>
    <div>
      <div>
        <div v-if="empty">
          <div v-if="state">
            <div v-for="item in list" :key="item.id" class="work">
              <div v-if="!show" style="margin-bottom: 30px">
                <div class="school" style="display: flex; padding-right: 25px">
                  <div
                    class="grid-content bg"
                    style="
                      margin-left: 30px;
                      font-weight: 700;
                      font-size: 16px;
                      width: 66%;
                    "
                  >
                    {{ item.education_info.school }}
                  </div>
                  <div class="grid-content bg-purple-light" style="width: 19%">
                    {{ item.start_date }} -{{ item.end_date }}
                  </div>

                  <a href="javascript:;">
                    <el-button
                      type="text"
                      icon="el-icon-edit"
                      @click="editChange(item)"
                      >编辑
                    </el-button>
                  </a>

                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    @click="deleteEduction(item.id)"
                    >删除</el-button
                  >
                </div>
                <div class="education">
                  <el-row>
                    <el-col :span="2" style="border-right: 1px solid #e3e6e6">{{
                      item.degree
                    }}</el-col>
                    <el-col :span="7" style="margin-left: 15px">{{
                      item.education_info.major
                    }}</el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else style="height: 400px; background-color: #fff">
          <img
            src="../../../../assets/imgs/jiao.png"
            alt=""
            style="width: 330px; height: 300px; margin: 20px 0 0 330px"
          />
        </div>
      </div>

      <Education
        :show="show"
        :education-list="educationList"
        :time="time"
        @reset="reset"
      />
    </div>
  </div>
</template>
<script>
import Education from './education'
import { geteducation, getEducationDelete } from '@/api/my/resume'
export default {
  components: { Education },
  data () {
    return {
      show: false,
      list: [
      ],
      empty: true,
      state: false,
      educationList: {},
      time: false

    }
  },
  computed: {

  },
  mounted () {

  },

  created () {
    this.getList()
  },
  methods: {
    edit () {
      this.show = true
      this.empty = true
    },
    reset (i, a) {
      this.show = i
      this.getList()
      this.time = a
    },
    // 列表a
    async getList () {
      const { data } = await geteducation()
      console.log('教育经历列表', data)
      if (data.results.length === 0) {
        this.empty = false
      } else {
        this.state = true
      }
      this.list = data.results
    },
    // 删除
    deleteEduction (id) {
      this.$confirm('确定要删除此数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await getEducationDelete(id)
        this.$message.success('删除成功')
        this.getList()
      })
    },
    // 修改
    editChange (item) {
      this.educationList = item
      this.edit()
      this.time = true
    }

  }
}
</script>
<style scoped lang="scss">
.preponderance-one {
  height: 50px;
  // background-color: aqua;
  padding-right: 25px;
  .bg-purple {
    color: #256efd;
    font-weight: 600;
    font-size: 20px;
    margin: 15px 0 0 25px;
  }
}
.work {
  // height: 100px;
  // background-color: red;
  margin: 0 0 50px 20px;
  .school {
    // background-color: #256efd;
    line-height: 40px;
    font-size: 15px;
    margin: 20px 0;
    .bg {
      font-size: 15px;
    }
    .bg-purple-light {
      color: #bcb9b9;
    }
  }
  .education {
    margin-left: 10px;
    height: 30px;
    // background-color: #256efd;
    padding-left: 20px;
    font-size: 15px;
  }
}
::v-deep .el-button {
  margin-left: 30px;
}
</style>
