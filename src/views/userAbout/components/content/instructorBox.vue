<template>
  <div class="content-box">
    <div class="title"><h3 style="margin: 0">讲师介绍</h3></div>
    <div class="subhead">Trainers Profile</div>
    <div v-for="(item, index) in list" :key="index" class="intro">
      <div class="text">
        <div class="text-title">{{ item.name }}</div>
        <!-- <div class="text-sub">工业机器人高级讲师</div> -->
        <!-- <div class="text-intro">
          {{ item.introduction }}
        </div> -->
        <div style="padding-bottom: 30px; height: 286px; overflow: hidden">
          <div
            class="text-intro"
            v-for="(info, keys) in item.introduction"
            :key="keys"
            style="
              line-height: 30px;
              color: #808080;
              font-size: 15px;
              margin: 2px 0;
            "
          >
            {{ info }}
          </div>
        </div>

        <!--        <div class="text-pic">-->
        <!--          <div class="pic">-->
        <!--            <img alt="" src="@/assets/images/about3.png">-->
        <!--            <div style="color:#808080">苏州某厂机器人项目</div>-->
        <!--          </div>-->
        <!--          <div class="pic">-->
        <!--            <img alt="" src="@/assets/images/about3.png">-->
        <!--            <div style="color:#808080">苏州某厂机器人项目</div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="picture">
        <img :src="disposeImg(item.image)" alt="" height="100%" width="100%" />
      </div>
    </div>
  </div>
</template>
<script>
import { aboutUser } from '@/api/user'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
  },
  created () {
    aboutUser().then(rs => {
      //  (rs.data);
      // console.log(rs.data);
      this.list = rs.data.teachers
    })
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  width: 62%;
  min-width: 1000px;
  margin: 20px auto;
  height: 100%;

  .title {
    width: 240px;
    font-size: 30px;
    color: #191919;
    padding-top: 30px;
  }

  .subhead {
    width: 240px;
    padding-top: 5px;
    font-size: 20px;
    color: #808080;
  }
  .intro:nth-child(even) {
    overflow: hidden;
    height: 400px;
    padding-right: 40px;
    .picture {
      height: 100%;
      width: 35%;
      text-align: center;
      float: left;
      height: 100%;
      border-radius: 0 44px 44px 0;
    }
    .text {
      width: 60%;
      min-width: 570px;
      height: 100%;
      float: right;
      // padding-bottom: 30px;
      // box-sizing: border-box;
      .text-title {
        // width: 250px;
        height: 84px;
        font-size: 30px;
        line-height: 84px;
        font-weight: 600;
        color: #191919;
      }

      .text-sub {
        height: 40px;
        color: #808080;
        font-size: 23px;
      }

      .text-intro {
        width: 90%;
        color: #808080;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .text-pic {
        width: 70%;
        padding-top: 20px;
        padding-bottom: 40px;
        display: flex;
        text-align: center;

        .pic {
          width: 43%;
          margin-right: 20px;

          img {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .intro:nth-child(odd) {
    overflow: hidden;
    height: 400px;
    padding-left: 40px;
    .picture {
      height: 100%;
      width: 35%;
      text-align: center;
      float: right;
      height: 100%;
      border-radius: 0 44px 44px 0;
    }
    .text {
      width: 65%;
      min-width: 570px;
      height: 100%;
      float: left;
      // padding-bottom: 30px;
      .text-title {
        // width: 180px;
        height: 84px;
        font-size: 30px;
        line-height: 84px;
        color: #191919;
        font-weight: 600;
      }

      .text-sub {
        height: 40px;
        color: #808080;
        font-size: 23px;
      }

      .text-intro {
        width: 90%;
        color: #808080;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .text-pic {
        width: 70%;
        padding-top: 20px;
        padding-bottom: 40px;
        display: flex;
        text-align: center;

        .pic {
          width: 43%;
          margin-right: 20px;

          img {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .intro {
    // padding-top: 20px;
    width: 100%;
    min-width: 960px;
    background-color: #fff;
    margin: 20px auto;
    // height: auto;
    height: 400px;
    border-radius: 44px;

    // display: flex;

    .picture {
      height: 100%;
      width: 350px;
      text-align: center;
      height: 100%;
      border-radius: 0 44px 44px 0;
    }

    .text {
      width: 60%;
      min-width: 570px;
      height: 100%;
      // padding-bottom: 30px;
      .text-title {
        // width: 250px;
        height: 84px;
        font-weight: 600;
        font-size: 30px;
        line-height: 84px;
        color: #191919;
      }

      .text-sub {
        height: 40px;
        color: #808080;
        font-size: 23px;
      }

      .text-intro {
        width: 90%;
        color: #808080;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .text-pic {
        width: 70%;
        padding-top: 20px;
        padding-bottom: 40px;
        display: flex;
        text-align: center;

        .pic {
          width: 43%;
          margin-right: 20px;

          img {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
