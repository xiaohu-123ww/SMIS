<template>
  <div>
    <div class="preponderance-one">
      <div class="grid-content bg-purple" style="width: 92%">工作经历</div>
      <div v-if="!work" class="grid-content bg-purple-light">
        <el-button type="text" icon="el-icon-plus" @click="workEdit"
          >添加</el-button
        >
      </div>
    </div>
    <div v-if="!work">
      <div>
        <div>
          <div
            v-for="item in list"
            :key="item.id"
            class="textarea"
            style="margin-left: 50px"
          >
            <div class="work" style="display: flex; padding-right: 25px">
              <div
                class="grid-content bg"
                style="font-weight: 700; width: 62.8%"
              >
                {{ item.enterprise }}
              </div>
              <div
                class="grid-content bg-purple-light;"
                style="width: 22.2%; color: #bcb9b9"
              >
                {{ item.start_date }}-{{ item.end_date }}
              </div>
              <el-button
                type="text"
                icon="el-icon-edit"
                @click.native="editChange(item)"
                >编辑
              </el-button>

              <el-button
                type="text"
                icon="el-icon-delete"
                style="margin-left: 30px"
                @click="deleteList(item.id)"
                >删除</el-button
              >
            </div>
            <div class="specialty">
              <el-row>
                <el-col :span="4" style="border-right: 1px solid #e6e3e3">{{
                  item.position_nam
                }}</el-col>
                <el-col :span="6" class="row">{{ item.field_name }}</el-col>
              </el-row>
            </div>
            <div class="describe">工作描述:</div>
            <div class="description">
              <div
                style="line-height: 30px"
                v-html="item.position_info.job_desc"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <el-empty
        v-if="list.length === 0"
        :image-size="150"
        description="再无工作经历"
      ></el-empty>
    </div>
    <Work
      :work="work"
      :work-list="workList"
      :work-show="workShow"
      @reset="reset"
    />
  </div>
</template>
<script>
import Work from './work.vue'
import WorkText from './work-text.vue'
import { getexperiences, getjobExperiences } from '@/api/my/resume'
export default {
  components: { Work, WorkText },
  data () {
    return {
      // 工作经历
      work: false,
      list: {},
      empty: true,
      state: true,
      workList: {},
      workShow: false
    }
  },
  computed: {

  },
  mounted () {
    this.getList()
  },
  created () {
    this.getList()
  },
  methods: {
    // 列表
    async getList () {
      const { data } = await getexperiences()
      console.log('工作经历', data)
      this.list = data.results
      console.log('this.list', this.list)
    },
    async reset (i) {
      this.work = i
      this.getList()
    },
    workEdit () {
      this.work = true
    },
    edit (row) {
      // this.work = true
      console.log(row)
    },
    deleteList (id) {
      console.log(id)
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(async () => {
        const res = await getjobExperiences(id)
        console.log('res', res)
        this.$message.success('删除成功')
        this.getList()
      })
    },
    editChange (item) {
      console.log(item)
      this.work = true
      this.workList = item
      this.workShow = true
    }

  }
}

</script>
<style scoped lang="scss">
.preponderance-one {
  height: 50px;
  // background-color: aqua;
  margin-top: 10px;
  display: flex;
  padding-right: 25px;
  .bg-purple {
    color: #256efd;
    font-weight: 600;
    font-size: 20px;
    margin: 10px 0 0 25px;
  }
}
.textarea {
  // height: 300px;
  // background-color: pink;
  margin: 15px 0 0 25px;
}
.textarea {
  // height: 300px;
  // background-color: pink;
  margin: 15px 0 30px 25px;

  .work {
    // background-color: #256efd;
    line-height: 40px;
    font-size: 15px;
    .bg {
      font-size: 18px;
    }
    .bg-purple-light {
      color: #bcb9b9;
    }
  }
  .specialty {
    height: 10px;
    line-height: 10px;
    // background-color: blue;
    font-size: 15px;
    .row {
      padding-left: 15px;
    }
  }
  .describe {
    height: 20px;
    // background-color: blue;
    font-size: 16px;
    // line-height: 30px;
    // font-weight: 700;
  }
  .description {
    // height: 200px;
    // background-color: pink;
    padding: 0 20px 0;
    font-size: 15px;
    margin-top: 2px;
  }
}
::v-deep .el-empty__description p {
  margin: 30px;
}
</style>
