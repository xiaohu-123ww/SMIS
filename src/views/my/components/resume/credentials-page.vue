<template>
  <div class="box">
    <div class="preponderance-one">
      <div class="grid-content bg-purple" style="width: 95%">资格证书</div>
      <div class="grid-content bg-purple-light">
        <el-button
          v-if="!show"
          type="text"
          icon="el-icon-plus"
          :disabled="list.length === 10"
          @click="edit"
          >添加</el-button
        >
      </div>
    </div>
    <div v-if="!show" class="credentials">
      <div v-if="flagShow">
        <div>
          <div
            v-for="item in list"
            :key="item.id"
            style="display: flex; padding-right: 25px"
          >
            <div class="grid-content bg-purple" style="width: 40%">
              <!-- " -->
              <img
                :src="disposeImg(item.cert_info.sample)"
                alt=""
                style="width: 160px; height: 100px"
              />
            </div>
            <div class="grid-content bg-purple-light" style="width: 55%">
              {{ item.cert_info.cert_name }} - {{ item.cert_info.cert_level }}
            </div>
            <!-- <el-col :span="5">
              <div class="grid-content bg-purple" style="margin-left: 7px">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="switchover(item)"
                  >编辑</el-button
                >
              </div>
            </el-col> -->
            <div class="grid-content bg-purple-light">
              <el-button
                type="text"
                icon="el-icon-delete"
                @click="submit(item.cert_info.cert_id)"
                >删除</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <el-empty v-else :image-size="150" description="再无资格证书"></el-empty>
    </div>

    <div>
      <Credentials :show="show" :cert-list="certList" @reset="reset" />
    </div>
  </div>
</template>
<script>
import Credentials from './credentials.vue'
import { getcertificate, getCertificationDelete } from '@/api/my/resume'
import disposeImg from '@/utils/disposeImg'
export default {
  components: { Credentials },
  data () {
    return {
      show: false,
      text: '',
      empty: true,
      list: [],
      flagShow: false,
      certList: {},
      forbidden: true
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getCertificate()
  },
  methods: {
    edit () {
      this.show = true
    },
    reset (i) {
      this.show = i
      this.getCertificate()
    },
    // 证书列表
    async getCertificate () {
      const res = await getcertificate()
      console.log('证书', res)
      if (res.data.msg.length === 0) {
        this.flagShow = false
      } else {
        this.flagShow = true
      }
      this.list = res.data.msg
    },
    // 删除
    submit (id) {
      console.log(id)
      this.$confirm('确定要删除此证书吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(async () => {
        const { data } = await getCertificationDelete(id)
        console.log(data)
        this.getCertificate()
        this.$message.success('删除证书成功')
      })
    },
    // 编辑
    switchover (item) {
      this.certList = item
      this.edit()
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  margin: 15px 0 20px 25px;
  .preponderance-one {
    height: 50px;
    // background-color: aqua;
    display: flex;
    padding-right: 25px;
    .bg-purple {
      color: #256efd;
      font-weight: 600;
      font-size: 20px;
    }
  }
  .credentials {
    height: 100px;
    // background-color: #256efd;
    line-height: 100px;
    font-size: 18px;
    margin-bottom: 20px;
    display: inline;
  }
}
</style>
