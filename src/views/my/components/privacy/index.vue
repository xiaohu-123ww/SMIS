<template>
  <div>
    <el-dialog
      title="添加屏蔽企业"
      :visible.sync="show"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <div class="bt" style="margin-bottom: 20px">
          <el-input v-model="qw" placeholder="请输入关键词"></el-input>
          <el-button type="primary" @click="getprivacy">搜索</el-button>
        </div>
        <ul v-if="state">
          <li
            v-for="(item, index) in list"
            :key="index"
            style="list-style: none"
          >
            <el-checkbox
              v-model="item.checked"
              class="privacy-chexkbox"
              @change="checkBox"
            >
              {{ item.name }}
            </el-checkbox>
          </li>
        </ul>
      </div>
      <el-pagination
        v-if="state"
        style="margin: 30px 0 30px 40px"
        :current-page="query.pagenum"
        :page-sizes="[5, 10, 20]"
        :page-size="query.pagesize"
        layout="sizes, prev, pager, next, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
      <div v-if="state" class="footer">
        <el-checkbox
          v-model="checkAll"
          class="footer-check"
          @change="checkboxChange"
          >所有与“智能”相关的200家企业</el-checkbox
        >
        <el-button type="primary" @click="dialog">屏蔽所选企业</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getEnterpriseQuick, getListHidden, getListSearch } from '@/api/my/privacy'
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      qw: '',
      checked: [],
      list: [

      ],
      checkAll: false,
      query: {
        pagenum: 1, // 页码
        pagesize: 2, // 每页数据条数回所有数据
        // 分类和状态默认为空，反
        cate_id: '', // 文章分类ID
        state: '' // 文章发布状态
      },
      total: 10,
      state: false,
      limit: 10,
      offset: 10,
      arrList: [],
      city: {
        relation: ''
      },
      job: {
        hidden: ''
      },
      text: {
        qw: ''
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {

  },
  methods: {
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      this.offset = newSize
      this.getprivacy()
    },
    handleCurrentChange (currPage) {
      // el-pagination组件内部通过：this.$emit('current-change', 最新页码)
      console.log('当前页码', currPage)
      this.offset = currPage
      this.getprivacy()
    },
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
    },
    async getprivacy () {
      const res = await getEnterpriseQuick(this.qw, this.limit, this.offset)
      console.log('列表', res)
      this.list = res.data.results
      if (this.list.length !== 0) {
        this.state = true
      }
      this.total = res.data.count
    },
    // 数据处理
    checkBox (item) {
      console.log(item)
      this.list.forEach((item, index) => {
        if (item.checked === true) {
          console.log(item)
          this.arrList.push(item.id)
          console.log(this.arrList)
        } else {
          this.arrList.splice(index)
        }
      })
    },
    // 屏蔽
    async dialog () {
      if (this.checkAll === false) {
        console.log(this.arrList.toString())
        this.job.hidden = this.arrList.toString()
        console.log(this.job.hidden)
        const res = await getListHidden(this.job)
        console.log('屏蔽', res)
        this.$message.success('屏蔽企业成功')
        this.$emit('reset', false)
      } else {
        console.log(1)
        this.text.qw = this.qw
        const res = await getListSearch(this.text)
        console.log('res', res)
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
