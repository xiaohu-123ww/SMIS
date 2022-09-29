<template>
  <div>
    <div class="interview">
      <div>企业屏蔽</div>
      <el-button type="primary" icon="el-icon-edit" @click="add"
        >添加</el-button
      >
    </div>
    <div v-if="flag" class="privacy-check">
      <div class="privacy-checkbox">
        <el-checkbox
          v-model="checkAll"
          style="line-height: 40px"
          @change="checkboxChange"
        ></el-checkbox>
        <div class="text">全部公司</div>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">完成</el-button>
      </div>
      <div class="privacy-box">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            style="list-style: none"
          >
            <el-checkbox v-model="item.checked" class="privacy-chexkbox">
              <div class="text">{{ item.name }}</div>
            </el-checkbox>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <div class="privacy" style="margin-bottom: 20px">
        <div class="text">已屏蔽5家公司</div>
        <el-button type="primary" class="privacy-bt" @click="checkBox"
          >批量管理</el-button
        >
      </div>
      <div v-for="item in list" :key="item.id" class="privacy">
        <div class="text">{{ item.name }}</div>
        <el-button type="success" class="privacy-bt" icon="el-icon-delete"
          >删除</el-button
        >
      </div>
    </div>
    <el-pagination
      style="margin: 20px 0 0 300px"
      :current-page="query.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="query.pagesize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <Privacy :show="show" @reset="reset" />
  </div>
</template>
<script>
import Privacy from './privacy/index.vue'
export default {
  components: { Privacy },
  data () {
    return {
      list: [
        { id: 1, name: '北京智能科技有限公司', checked: false },
        { id: 2, name: '上海智能科技有限公司', checked: false },
        { id: 3, name: '广州智能科技有限公司', checked: false },
        { id: 4, name: '南京智能科技有限公司', checked: false },
        { id: 5, name: '广西智能科技有限公司', checked: false }
      ],
      query: {
        pagenum: 1, // 页码
        pagesize: 2, // 每页数据条数回所有数据
        // 分类和状态默认为空，反
        cate_id: '', // 文章分类ID
        state: '' // 文章发布状态
      },
      total: 10,
      show: false,
      flag: false,
      checkAll: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      // // 修改后台接口查询参数pagesize每页条数
      // this.query.pagesize = newSize
      // // 重置页码为第一页
      // this.pagenum = 1
      // // 根据最新页码重新查询列表收据
      // this.getArticleList()
    },
    handleCurrentChange (currPage) {
      // el-pagination组件内部通过：this.$emit('current-change', 最新页码)
      console.log('当前页码', currPage)
      // // 修改后台接口查询参数pagenum页码
      // this.query.pagenum = currPage
      // // 2.根据最新页码重新查询列表收据
      // this.getArticleList()
    },
    add () {
      this.show = true
    },
    reset (i) {
      this.show = i
    },
    checkBox () {
      this.flag = true
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
.interview {
  height: auto;
  // border-bottom: 1px solid #e6e3e3;
  line-height: 60px;
  padding-left: 30px;
  color: #256efd;
  font-weight: 600;
  font-size: 25px;
  display: flex;
  .el-button {
    margin-left: 970px;
    width: 100px;
    height: 40px;
  }
}
.privacy {
  height: auto;
  // background-color: #256efd;
  display: flex;
  font-size: 20px;
  .text {
    // width: 400px;
    line-height: 60px;
    // background-color: pink;
    padding-left: 100px;
    // font-weight: 600;
  }
  .privacy-bt {
    margin: 10px 0 0 800px;
    width: 100px;
    height: 40px;
  }
}
.privacy-check {
  // height: 500px;
  // background-color: pink;
  padding-left: 80px;
  .privacy-checkbox {
    height: 40px;
    // background-color: red;
    display: flex;
    .text {
      margin: 10px 747px 20px 20px;
      font-size: 20px;
      color: #256efd;
    }
    .el-button {
      width: 100px;
      height: 40px;
    }
  }
  .privacy-box {
    // height: 300px;
    // background-color: #256efd;
    .privacy-chexkbox {
      margin: 20px 0 0 0;
      height: 30px;
      width: 560px;
      line-height: 30px;
      // background-color: aqua;
      // border-bottom: 1px solid #e6e3e3;
      .text {
        font-size: 20px;
        margin-left: 20px;
        color: black;
      }
    }
  }
}
</style>
