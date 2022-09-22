<template>
  <div>
    <div class="textarea">
      <div class="work">
        <el-row>
          <el-col :span="14"
            ><div class="grid-content bg">
              {{ list.company ? list.company : 'XXXXXXX' }}
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple-light">
              {{ list.data ? list.data : '工作时间' }}
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
            list.subject ? list.subject : '机械工程师'
          }}</el-col>
          <el-col :span="6" class="row">{{
            list.specialty ? list.specialty : '智能制造'
          }}</el-col>
        </el-row>
      </div>
      <div class="describe">工作描述:</div>
      <div class="description">{{ list.text }}</div>
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
    padding: 15px;
    font-size: 15px;
  }
}
</style>
