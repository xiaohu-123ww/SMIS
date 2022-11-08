<template>
  <div :class="{ max: ematy === true }">
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
      style="margin-top: 100px"
    ></el-empty>
    <div v-else>
      <div v-if="invite">
        <Job :list="list" :show="show" @like="like" @remind="remind" />
        <el-pagination
          style="margin: 20px 0 0 300px"
          :current-page="offset"
          :page-sizes="[2, 3, 5, 10]"
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
        <el-pagination
          style="margin: 20px 0 0 300px"
          :current-page="offset"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="limit"
          layout="sizes, prev, pager, next, jumper, total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Job from './job/job-list.vue'
import InviteList from './job/inviteList.vue'
import { getIndisposed } from '@/api/my/interview'
import { getpreChat, getInterests, getChating, getReject, getChatingList } from '@/api/my/job'
import { getList } from '@/api/my/interview'
export default {
  components: { Job, InviteList },

  data () {
    return {
      changeColor: 1,
      list: [],
      ematy: true,
      show: 1,
      offset: 1,
      limit: 5,
      total: 0,
      invite: true,
      listInvite: []

    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.helloChange()
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
    handleCurrentChange (currPage) {
      console.log('当前页码', currPage)
      this.offset = this.limit * (currPage - 1)
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
    // 新招呼
    async helloChange () {
      this.changeColor = 1
      const res = await getpreChat(this.limit, this.offset)
      console.log('新招呼', res)
      if (res.data.results.length === 0) {
        this.ematy = true
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 1
      }
    },
    // 有意向
    async haveIntentionTo () {
      this.changeColor = 2
      const res = await getInterests(this.limit, this.offset)
      console.log('有意向', res)
      if (res.data.results.length === 0) {
        this.ematy = true
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 2
      }
    },
    // 沟通中
    async inCommunicationC () {
      this.changeColor = 3
      const res = await getChating(this.limit, this.offset)
      console.log('沟通中', res)
      if (res.data.results.length === 0) {
        this.ematy = true
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 3
      }
    },
    // 已投递
    async posted () {
      this.changeColor = 4
      const cv_exchange = 1
      const res = await getChatingList(cv_exchange, this.limit, this.offset)
      console.log('已投递', res)
      if (res.data.results.length === 0) {
        this.ematy = true
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 4
      }
    },
    // 邀面试
    async Invited () {
      this.changeColor = 5
      this.invite = false
      const res = await getIndisposed(this.limit, this.offset)
      console.log('邀面试', res)
      if (res.data.results.length === 0) {
        this.ematy = true
      } else {
        this.ematy = false
        this.listInvite = res.data.results
        this.total = res.data.count
        this.show = 5
      }
    },
    // 不合适
    async inappropriate () {
      this.changeColor = 6
      const res = await getReject(this.limit, this.offset)
      console.log('不合适', res)
      if (res.data.results.length === 0) {
        this.ematy = true
      } else {
        this.ematy = false
        this.list = res.data.results
        this.total = res.data.count
        this.show = 6
      }
    },
    like () {
      this.helloChange()
    },
    remind () {
      this.haveIntentionTo()
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
