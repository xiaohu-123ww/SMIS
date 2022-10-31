<template>
  <div>
    <div class="preponderance-one">
      <el-row>
        <el-col :span="20"
          ><div class="grid-content bg-purple">教育经历</div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button
              v-if="!show"
              type="primary"
              icon="el-icon-plus"
              @click="edit"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div>
      <div v-if="empty">
        <div v-for="(item, index) in list" :key="index" class="work">
          <div v-if="!show">
            <div class="school">
              <el-row>
                <el-col :span="14"
                  ><div class="grid-content bg" style="margin-left: 20px">
                    {{ list.company ? list.company : '北京智能制造大学' }}
                  </div></el-col
                >
                <el-col :span="3"
                  ><div class="grid-content bg-purple-light">
                    {{ list.data ? list.data : '工作时间' }}
                  </div></el-col
                >
                <el-col :span="3">
                  <div class="grid-content bg-purple">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      @click="edit(list)"
                      >编辑
                    </el-button>
                  </div>
                </el-col>
                <el-col :span="2"
                  ><div class="grid-content bg-purple-light">
                    <el-button type="success" icon="el-icon-delete"
                      >删除</el-button
                    >
                  </div></el-col
                >
              </el-row>
            </div>
            <div class="education">
              <el-row>
                <el-col :span="2" style="border-right: 1px solid #e3e6e6"
                  >本科</el-col
                >
                <el-col :span="7" style="margin-left: 15px"
                  >机器智造与自动化</el-col
                >
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <el-empty v-else :image-size="150" description="再无教育经历"></el-empty>
    </div>

    <Education :show="show" @reset="reset" />
  </div>
</template>
<script>
import Education from './education'
import { geteducation } from '@/api/my/resume'
export default {
  components: { Education },
  data () {
    return {
      show: false,
      list: [{
        company: '',
        data: '',
        subject: '',
        specialty: '',
        text: ''
      },
      {
        company: '',
        data: '',
        subject: '',
        specialty: '',
        text: ''
      }
      ],
      empty: true
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
    },
    reset (i) {
      this.show = i
    },
    async getList () {
      const { data } = await geteducation()
      console.log('教育经历列表', data)
      if (data.results.length === 0) {
        this.empty = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.preponderance-one {
  height: 50px;
  // background-color: aqua;
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
</style>
