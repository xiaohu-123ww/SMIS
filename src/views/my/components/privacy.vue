<template>
  <div>
    <div class="interview">
      <div>企业屏蔽</div>
      <el-button type="primary" icon="el-icon-edit" @click="add"
        >添加</el-button
      >
    </div>
    <div v-if="ematy">
      <div v-if="flag" class="privacy-check">
        <div class="privacy-checkbox">
          <el-checkbox
            v-model="checkAll"
            style="line-height: 40px"
            @change="checkboxChange"
          ></el-checkbox>
          <div class="text">全部公司</div>
          <el-button type="primary" @click="deletechange">删除</el-button>
          <el-button type="primary">完成</el-button>
        </div>
        <div class="privacy-box">
          <ul>
            <li
              v-for="(item, index) in list"
              :key="index"
              style="list-style: none"
            >
              <el-checkbox v-model="item.checked">
                <div class="text" style="font-size: 20px; margin-bottom: 20px">
                  {{ item.enterprise_name }}
                </div>
              </el-checkbox>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="privacy" style="margin-bottom: 20px">
          <div class="text">已屏蔽{{ code }}家公司</div>
          <el-button type="primary" class="privacy-bt" @click="checkBox"
            >批量管理</el-button
          >
        </div>
        <div v-for="item in list" :key="item.id" class="privacy">
          <div class="text">{{ item.enterprise_name }}</div>
          <el-button
            type="success"
            icon="el-icon-delete"
            class="privacy-bt"
            @click="deleteList(item.enterprise_id)"
            >删除</el-button
          >
        </div>
      </div>
      <el-pagination
        style="margin: 30px 0 0 300px"
        :current-page="offset"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        layout="sizes, prev, pager, next, jumper, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-empty v-else description="再无企业屏蔽列表"></el-empty>
    <Privacy :show="show" @reset="reset" />
  </div>
</template>
<script>
import Privacy from './privacy/index.vue'
import { getList, getListDelete } from '@/api/my/privacy'
export default {
  components: { Privacy },
  data () {
    return {
      list: [

      ],

      total: 10,
      show: false,
      flag: false,
      checkAll: false,
      ematy: true,
      code: 0,
      job: {
        hidden: ''
      },
      arrList: [],
      limit: 10,
      offset: 1
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getPrivacyList()
  },
  methods: {
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      this.getPrivacyList()
    },
    handleCurrentChange (currPage) {
      // el-pagination组件内部通过：this.$emit('current-change', 最新页码)
      console.log('当前页码', currPage)
      this.offset = this.limit * (currPage - 1)
      this.getPrivacyList()
    },
    add () {
      this.show = true
    },
    reset (i) {
      this.show = i
      this.getPrivacyList()
    },
    checkBox () {
      this.flag = true
    },
    checkboxChange () {
      console.log(1)
      if (this.checkAll) {
        this.list.forEach(item => {
          // console.log(item)
          this.arrList.push(item.enterprise_id)
          console.log('123', this.arrList)
          item.checked = true // 只改变数据的状态
        })
      } else {
        this.list.forEach(item => {
          item.checked = false
        })
      }
    },
    // 列表
    async getPrivacyList () {
      const res = await getList()
      console.log('隐私设置', res)
      if (res.data.results.length === 0) {
        this.ematy = false
      }
      this.list = res.data.results
      this.code = res.data.count
      this.total = res.data.count
    },
    // 删除
    async deleteList (id) {
      // console.log(item)
      const num = id
      this.job.hidden = num.toString()
      console.log(this.job.hidden)
      const res = await getListDelete(this.job)
      console.log('res', res)
      this.$message.success('删除成功')
      this.getPrivacyList()
    },
    async deletechange () {
      this.job.hidden = this.arrList.toString()
      console.log(this.job)
      const { data } = await getList()
      console.log('133', data)

      const res = await getListDelete(this.job)
      console.log('res', res)
      this.$message.success('批量删除成功')
      this.getPrivacyList()
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
    margin: 10px 0 0 700px;
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
    font-size: 20px;
    .privacy-chexkbox {
      margin: 20px 0 0 0;
      height: 30px;
      width: 560px;
      line-height: 30px;
      // background-color: aqua;
      // border-bottom: 1px solid #e6e3e3;
      .text {
        font-size: 20px;
        width: 350px;
        margin-left: 20px;

        border-bottom: 1px solid #e6e3e3;
        color: black;
      }
    }
  }
}
.text {
  width: 400px !important;
}
</style>
