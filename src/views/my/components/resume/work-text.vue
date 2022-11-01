<template>
  <div>
    <div v-for="item in list" :key="item.id" class="textarea">
      <div class="work">
        <el-row>
          <el-col :span="14"
            ><div class="grid-content bg">
              {{ list.enterprise }}
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple-light">
              {{ item.start_date }}-{{ item.end_date }}
            </div></el-col
          >
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-edit" @click="edit(list)"
                >编辑
              </el-button>
            </div>
          </el-col>
          <el-col :span="2"
            ><div class="grid-content bg-purple-light">
              <el-button type="success" icon="el-icon-delete">删除</el-button>
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
        <div v-html="item.job_desc">123</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object
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

  }
}
</script>
<style scoped lang="scss">
.textarea {
  // height: 300px;
  // background-color: pink;
  margin: 15px 0 0 25px;

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
    height: 30px;
    line-height: 30px;
    // background-color: blue;
    font-size: 15px;
    .row {
      padding-left: 15px;
    }
  }
  .describe {
    height: 30px;
    // background-color: blue;
    font-size: 15px;
    line-height: 30px;
  }
  .description {
    height: 200px;
    // background-color: pink;
    padding: 15px 15px 0;
    font-size: 15px;
  }
}
</style>
