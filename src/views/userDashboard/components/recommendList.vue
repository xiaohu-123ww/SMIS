<template>
  <div>
    <div class="square-list">
      <ul class="list-container">
        <li
          v-for="(item, index) in list.slice(0, 5)"
          :key="index"
          :class="'li' + index"
          @click="skip(item)"
        >
          <router-link
            :to="{
              path: '/postdes',
              name: 'postdes',
              query: { id: item.id }
            }"
          >
            <div class="avatar">
              <img :src="disposeImg(item.image)" height="100%" width="100%" />
            </div>
            <div class="user">
              <div class="user1">{{ item.pst_title }}</div>
              <div class="user2">{{ item.sub_title }}</div>
            </div>
            <div class="more">
              <el-button v-show="index < 1" round color="#E1E8F5"
                >查看详情</el-button
              >
            </div></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import { getCarousel } from '../../../api/user'

export default {
  props: ['cvlist'],
  data () {
    return {
      list: [{}, {}, {}, {}, {}],
      name: []
    }
  },
  watch: {
    Cvlist (Cvlist) {
      console.log(Cvlist)
      // console.log(Cvlist.rec_pst_list)

      this.list = Cvlist.rec_pst_list
    }
  },
  created () {
    // this.getReclist()
  },
  methods: {
    skip (e) {
      // this.$router.push({ path: 'postdes', query: { id: e.id }});
      // console.log(e);
    }
  }
};
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.square-list {
  width: 100%;
  margin: 20px auto;

  .list-container {
    position: relative;
    list-style: none;
    height: 400px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    li:hover {
      z-index: 2;
      -webkit-box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
      box-shadow: 0 15px 30pxrgba (0, 0, 0, 0.1);
      -webkit-transform: translate3d(0, -2px, 0);
      transform: translate3d(0, -2px, 0);
    }
    .li0 {
      display: inline-block;
      width: 40%;
      height: 100%;
      border: 1px solid #cecece;
      border-radius: 10px;
      position: relative;
      background-color: #f3f6fb;

      .avatar {
        // position: relative;
        width: 150px;
        height: 200px;
        // border-radius: 50%;
        // left: 200px;
        // top: 100px;
        img {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 380px;
          height: 380px;
        }
      }

      .user {
        width: 100%;
        position: absolute;
        left: 30px;
        top: 60px;
        .user1 {
          color: #000000;
          font-size: 20px;
        }
        .user2 {
          padding: 10px 0;
          font-size: 14px;
          color: #666666;
        }
      }
      .more {
        width: 100%;
        position: absolute;
        bottom: 20px;
        left: 20px;
        .el-button {
          width: 150px;
          background-color: #3f84f3;
          color: #fff;
        }
      }
    }
    .li1 {
      position: absolute;
      right: 30%;
    }
    .li2 {
      position: absolute;
      right: 0;
    }
    .li3 {
      position: absolute;
      right: 30%;
      bottom: 0;
    }
    .li4 {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .li1,
    .li2,
    .li3,
    .li4 {
      width: 25%;
      height: 45%;
      display: inline-block;
      border: 1px solid #cecece;
      border-radius: 10px;

      .avatar {
        width: 150px;
        height: 150px;
        margin: 10px auto;
        overflow: hidden;
      }

      .user {
        width: 100%;
        height: 30px;
        text-align: center;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.1);
        // background-color: #ebe0e08f;
        // background: rgba($color: #f2f2f2, $alpha: 0);
        // backdrop-filter: blur(20px);
        backdrop-filter: blur(9px);
        bottom: 0px;
        .user1 {
          float: left;
          font-size: 16px;
          line-height: 30px;
          padding-left: 20px;
        }
        .user2 {
          float: right;
          line-height: 30px;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
