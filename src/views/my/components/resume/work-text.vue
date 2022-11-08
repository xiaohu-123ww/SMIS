<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
      class="textarea"
      style="margin-left: 50px"
    >
      <div class="work">
        <el-row>
          <el-col :span="11"
            ><div class="grid-content bg" style="font-weight: 700">
              {{ item.project_info.project_name }}项目
            </div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple-light">
              {{ item.start_date }}-{{ item.end_date }}
            </div></el-col
          >
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-button
                type="primary"
                icon="el-icon-edit"
                style="margin-left: 32px"
                @click="editChange(item)"
                >编辑
              </el-button>
            </div>
          </el-col>
          <el-col :span="3"
            ><div
              class="grid-content bg-purple-light"
              style="width: 150px; margin-left: 65px"
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
          v-html="item.project_info.project_desc"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProjectExperiencesDelete } from '@/api/my/resume'
export default {
  props: {
    list: {
      type: Array
    }

  },
  data () {
    return {

    }
  },
  computed: {
    commendContent () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.list.job_desc
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }
  },
  mounted () {

  },
  methods: {
    // 删除
    deleteList (id) {
      this.$confirm('确定要删除此数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await getProjectExperiencesDelete(id)
        console.log('删除', res)
        this.$message.success('删除成功')
        this.$emit('projectExperiences')
      })
    },
    editChange (item) {
      this.$emit('open', true, item)
    }
  }
}
</script>
<style scoped lang="scss">
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
</style>
