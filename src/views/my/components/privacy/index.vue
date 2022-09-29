<template>
  <div>
    <el-dialog
      title="添加屏蔽企业"
      :visible.sync="show"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <div class="bt">
          <el-input
            v-model="keyWord"
            placeholder="请输入想搜索的公司"
          ></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            style="list-style: none"
          >
            <el-checkbox v-model="item.checked" class="privacy-chexkbox">
              {{ item.name }}
            </el-checkbox>
          </li>
        </ul>
      </div>
      <div class="footer">
        <el-checkbox
          v-model="checkAll"
          class="footer-check"
          @change="checkboxChange"
          >所有与“智能”相关的200家企业</el-checkbox
        >
        <el-button type="primary" @click="dialogVisible = false"
          >屏蔽所选企业</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      keyWord: '',
      list: [
        { id: 1, name: '北京智能科技有限公司', checked: false },
        { id: 2, name: '上海智能科技有限公司', checked: false },
        { id: 3, name: '广州智能科技有限公司', checked: false },
        { id: 4, name: '南京智能科技有限公司', checked: false },
        { id: 5, name: '广西智能科技有限公司', checked: false },
        { id: 6, name: '智能科技有限公司', checked: false },
        { id: 7, name: '天津京智能科技有限公司', checked: false },
        { id: 8, name: '四川智能科技有限公司', checked: false },
        { id: 9, name: '河北智能科技有限公司', checked: false },
        { id: 10, name: '石家庄智能科技有限公司', checked: false }
      ],
      checkAll: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.$emit('reset', false)
    },
    checkboxChange () {
      console.log(1)
      if (this.checkAll) {
        this.list.forEach(item => {
          console.log(item)
          item.checked = true // 只改变数据的状态
        })
      } else {
        this.list.forEach(item => {
          item.checked = false
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.bt {
  width: 500px;
  display: flex;
  // background-color: aqua;
  margin: 0 auto;
}
.privacy-chexkbox {
  margin: 20px 0 0 0;
  height: 30px;
  width: 560px;
  line-height: 30px;
  // background-color: aqua;
  border-bottom: 1px solid #e6e3e3;
}
.footer {
  height: 50px;
  // background-color: aqua;
  margin-left: 40px;
  .footer-check {
    margin-right: 180px;
    color: red;
    font-size: 20px;
  }
  .el-button {
  }
}
</style>
