<template>
  <div :class="{ max: ematy === true }" style="height: 100%">
    <div class="interview">求职申请</div>
    <div style="background-color: rgb(244, 246, 249)">
      <el-row>
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 1 }"
            @click="helloChange"
          >
            新招呼
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 2 }"
            @click="haveIntentionTo"
          >
            有意向
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 3 }"
            @click="inCommunicationC"
          >
            沟通中
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 4 }"
            @click="posted"
          >
            已投递
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 5 }"
            @click="Invited"
          >
            邀面试
          </div></el-col
        >
        <el-col :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === 6 }"
            @click="inappropriate"
          >
            不合适
          </div></el-col
        >
      </el-row>
    </div>
    <el-empty
      v-if="ematy"
      description="暂无信息"
      style="height: 700px"
    ></el-empty>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgb(244, 246, 249)"
      style="height: 700px; font-size: 100px"
    ></div>
    <div>
      <div v-if="invite">
        <Job :list="list" :show="show" @like="like" @remind="remind" />
        <el-pagination
          v-if="list.length !== 0"
          style="margin: 20px 0 0 300px"
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
      <div v-else>
        <InviteList :list-invite="listInvite" />
        <!-- <el-pagination
          v-if="listInvite !== 0"
          style="margin: 20px 0 0 300px"
          :current-page="offset"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="limit"
          layout="sizes, prev, pager, next, jumper, total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
import Job from './job/job-list.vue'
import InviteList from './job/inviteList.vue'
import { getIndisposed } from '@/api/my/interview'
import { getpreChat, getInterests, getChating, getReject, getChatingList, getHasInterviews } from '@/api/my/job'
import { getList } from '@/api/my/interview'
export default {
  components: { Job, InviteList },

  data () {
    return {
      changeColor: 1,
      list: [],
      ematy: false,
      show: 1,
      offset: 1,
      limit: 5,
      total: 0,
      invite: true,
      listInvite: [],
      loading: false

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
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      if (this.changeColor === 1) {
        this.helloChange()
      } else if (this.changeColor === 2) {
        this.haveIntentionTo()
      } else if (this.changeColor === 3) {
        this.inCommunicationC()
      } else if (this.changeColor === 4) {
        this.posted()
      } else if (this.changeColor === 5) {
        this.Invited()
      } else {
        this.inappropriate()
      }
    },
    async handleCurrentChange (currPage) {
      console.log('当前页码', currPage)
      this.offset = currPage
      this.off = this.limit * (currPage - 1)
      if (this.changeColor === 1) {
        this.changeColor = 1
        const res = await getpreChat(this.limit, this.off)
        console.log('新招呼', res)

        this.list = res.data.results
        this.total = res.data.count
        this.show = 1
      } else if (this.changeColor === 2) {
        this.changeColor = 2
        const res = await getInterests(this.limit, this.off)
        console.log('有意向', res)

        this.list = res.data.results
        this.total = res.data.count
        this.show = 2
      } else if (this.changeColor === 3) {
        this.changeColor = 3
        const res = await getChating(this.limit, this.off)
        console.log('沟通中', res)

        this.list = res.data.results
        this.total = res.data.count
        this.show = 3
      } else if (this.changeColor === 4) {
        this.changeColor = 4
        const cv_exchange = 1
        const res = await getChatingList(cv_exchange, this.limit, this.off)
        console.log('已投递', res)

        this.list = res.data.results
        this.total = res.data.count
        this.show = 4
      } else if (this.changeColor === 5) {
        this.changeColor = 5
        this.invite = false
        const res = await getHasInterviews(this.limit, this.off)
        console.log('邀面试', res)

        this.listInvite = res.data.results
        this.total = res.data.count
        this.show = 5
      } else {
        this.changeColor = 6
        const res = await getReject(this.limit, this.off)
        console.log('不合适', res)

        this.list = res.data.results
        this.total = res.data.count
        this.show = 6
      }
    },
    // 新招呼
    async helloChange () {
      this.changeColor = 1
      this.ematy = false
      this.list = []
      this.loading = true
      const res = await getpreChat(this.limit)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        console.log('新招呼', res)
        this.list = res.data.results
        this.total = res.data.count
        this.show = 1
        this.loading = false
      }
    },
    // 有意向
    async haveIntentionTo () {
      this.changeColor = 2
      this.ematy = false
      this.list = []
      this.loading = true
      const res = await getInterests(this.limit)
      console.log('有意向', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 2
        this.loading = false
      }
    },
    // 沟通中
    async inCommunicationC () {
      this.changeColor = 3
      this.ematy = false
      this.list = []
      this.loading = true
      const res = await getChating(this.limit)
      console.log('沟通中', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 3
        this.loading = false
      }
    },
    // 已投递
    async posted () {
      this.changeColor = 4
      this.ematy = false
      this.list = []
      const cv_exchange = 1
      this.loading = true
      const res = await getChatingList(cv_exchange, this.limit)
      console.log('已投递', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 4
        this.loading = false
      }
    },
    // 邀面试
    async Invited () {
      this.changeColor = 5
      this.ematy = false
      this.list = []
      this.loading = true
      const res = await getHasInterviews(this.limit)
      console.log('邀面试', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 5
        this.loading = false
      }
      // this.listInvite = res.data.results
    },
    // 不合适
    async inappropriate () {
      this.changeColor = 6
      this.ematy = false
      this.list = []
      this.loading = true
      const res = await getReject(this.limit)
      console.log('不合适', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 6
        this.loading = false
      }
    },
    like () {
      this.helloChange()
    },
    remind () {
      this.haveIntentionTo()
    },
    async getList () {
      this.loading = true
      this.ematy = false
      this.list = []
      const res = await getpreChat(this.limit)
      console.log('新招呼', res)
      if (res.data.results.length === 0) {
        this.ematy = true
        this.loading = false
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 1
        this.loading = false
      }
    }

  }
}
</script>
<style scoped lang="scss">
.interview {
  height: 50px;
  border-bottom: 1px solid #e6e3e3;
  line-height: 50px;
  padding-left: 30px;
  color: #256efd;
  font-weight: 600;
  font-size: 20px;
}
.bt {
  // border-bottom: 2px solid #256efd;
  color: #256efd;
  background-color: #fff;
}
.grid-content {
  // height: 45px;
  // width: 60px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  // margin-bottom: 10px;
  // background-color: pink;
}
.max {
  height: 800px;
}
</style>
