<template>
  <div>
    <div
      v-for="(item, index) in gettalents(
        this.list.education_levels,
        this.list.list_rcm_recommend,
        this.list.rcms
      )"
      :key="index"
      class="square-list"
    >
      <!-- UI设计师-推荐候选人 -->
      <div class="title">{{ item.rcmname }}</div>
      <div style="display: flex; justify-content: space-around">
        <ul class="list-container">
          <li
            v-for="(items, index) in item.talentinfolist.splice(0, 4)"
            :key="index"
          >
            <div class="avatar">
              <img :src="items.headportrait">
            </div>
            <div class="user">
              <div style="font-size: 23px; margin-bottom: 10px">
                {{ items.applicant }}
              </div>
              <!--              <div style="margin-bottom: 10px; color: #646464">UI设计讲师</div>-->
              <div
                style="margin-bottom: 10px; margin-top: 20px; color: #646464"
              >
                {{ items.education }}
              </div>
            </div>
            <div class="info">
              <el-tag
                v-for="(tags, index) in items.professionallist"
                :key="index"
                size="medium"
                style="margin-bottom: 5px; margin-left: 5px"
                type="primary"
              >
                {{ tags }}
              </el-tag>
            </div>
            <div class="more">
              <router-link
                :to="{
                  path: '/talent/Cv/',
                  query: { item: item.cv, invite: true },
                }"
              >
                <el-button round>查看更多</el-button>
              </router-link>
            </div>
          </li>
        </ul>
        <div class="list-more" @click="listmore">更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Foundthattalent, searchFoundtalent } from '@/api/enterprise';

export default {
  data() {
    return {
      list: [{
        education_levels: [],
        list_rcm_recommend: [],
        rcms: []
      }]
    };
  },
  created() {
    this.gettalentsdata();
  },
  methods: {
    // 兄弟组件调取方法
    listmore() {
      searchFoundtalent().then(res => {
        this.$emit('getlistmore', res);
      });
    },
    async gettalentsdata() {
      await Foundthattalent().then(res => {
        // console.log(res);
        this.list = res.data;
        // this.list.education_levels = res.data.education_levels;
        // this.list.list_rcm_recommend = res.data.list_rcm_recommend;
        // this.list.rcms = res.data.rcms;
        // const arr = this.gettalents(this.list.education_levels,this.list.list_rcm_recommend,this.list.rcms);
        // console.log(arr);
        //  (this.list)
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.square-list {
  width: 90%;
  min-width: 1200px;
  height: auto;
  margin: 20px auto;

  .title {
    color: #2f2f2f;
    font-size: 20px;
    padding-top: 20px;
  }

  .list-container {
    list-style: none;
    width: 85%;
    height: 400px;
    margin-top: 20px;

    li {
      width: 20%;
      min-width: 240px;
      height: 100%;
      border: 1px solid #cecece;
      border-radius: 10px;
      float: left;
      margin-right: 10px;

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px auto;
      }

      .avatar img {
        width: 100%;
        height: 100%;
        // border-radius: 50%;
      }

      .user {
        width: 100%;
        text-align: center;
      }

      .info {
        width: 96%;
        height: auto;
        padding-left: 10px;

        .el-tag {
          border-radius: 30px;
        }
      }

      .more {
        width: 100%;
        text-align: center;

        .el-button {
          width: 100px;
          background-color: #3c69be;
          color: #fff;
        }
      }
    }
  }

  .list-more {
    width: 5%;
    min-width: 50px;
    height: 400px;
    border: 1px solid #cecece;
    border-radius: 10px;
    color: #646464;
    text-align: center;
    line-height: 400px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>
