<template>
  <div>
    <div class="search-list">
      <ul>
        <li v-for="(item, index) in getseaechlist(list)" :key="index">
          <div class="avatar">
            <img :src="disposeImg(item.image)">
          </div>
          <div class="user">
            <div v-if="item.user_id.last_name" style="font-size: 23px; margin-bottom: 10px">
              {{ item.user_id.last_name + item.user_id.first_name }}
            </div>
            <div v-else style="font-size: 23px; margin-bottom: 10px">
              {{ item.user_id.username }}
            </div>
            <!--            <div style="margin-bottom: 10px; color: #646464">UI设计讲师</div>-->
            <div style="margin-bottom: 10px; color: #646464">
              {{ item.education_level }}
            </div>
          </div>
          <div class="info">
            <el-tag
              v-for="(items, index) in gettag(item.professional_skill)"
              :key="index"
              size="medium"
              style="margin-bottom: 5px; margin-left: 5px"
              type="primary"
            >
              {{ items }}
            </el-tag>
          </div>
          <div class="more">
            <router-link
              :to="{
                path: '/talent/Cv/',
                query: { item: item, invite: false },
              }"
            >
              <el-button round>查看更多</el-button>
            </router-link>
          </div>
        </li>
      </ul>

    </div>
    <div style="width: 62%;margin: 0 auto;">
      <el-button type="primary" round @click="listsearch">返回</el-button>
    </div>
  </div>
</template>
<script>
import { inviteFind, searchFoundtalent } from '@/api/enterprise';

export default {
  data() {
    return {
      list: [],
      status: true
    };
  },
  created() {

  },
  methods: {
    listsearch() {
      this.$emit('getsearch', this.status);
    },
    getItem(list) {
      this.list = list;
      // console.log(list)
    },
    invite(item) {
      inviteFind({
        type: '101',
        cv_id: item.id,
        rcm_id: ''
      }).then(rs => {
        //  (rs)
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.search-list {
  width: 60%;
  height: auto;
  margin: 20px auto;
  border: #cecece 1px solid;
  border-radius: 10px;

  ul {
    width: 100%;
    height: 100%;
    list-style: none;

    li {
      width: 100%;
      min-height: 160px;
      border-bottom: 1px solid #cecece;
      padding-top: 20px;
      padding-left: 20px;
      display: flex;
      justify-content: space-between;

      .avatar {
        width: 80px;
        height: 80px;
        background-color: cornflowerblue;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .user {
        width: 20%;
        text-align: left;
        padding-left: 15px;
      }

      .info {
        width: 40%;
        padding-left: 10px;

        .el-tag {
          border-radius: 30px;
        }
      }

      .more {
        width: 30%;
        text-align: center;
        padding-top: 30px;

        .el-button {
          width: 100px;
          background-color: #3c69be;
          color: #fff;
        }
      }
    }
  }
}
</style>
