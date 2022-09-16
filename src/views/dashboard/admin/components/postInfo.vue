<template>
  <div class="content">
    <div class="content-title">职位</div>
    <div class="content-main">
      <div class="mian-count">
        岗位数:{{ information.num_of_positions }}个<span
          style="color: #292929; font-size: 25px"
        />
      </div>
      <div class="mian-target">
        <ul>
          <!--          <li>-->
          <!--            <div></div>-->
          <!--          </li>-->
          <li>
            <div>招聘数:{{ information.num_of_rcms }}人</div>
          </li>
          <!--          <li>-->
          <!--            <div>已面试:20人</div>-->
          <!--          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { enterprisePage } from '@/api/enterprise';

export default {
  name: 'PostInfo',
  data() {
    return {
      information: {
        num_of_positions: 0,
        num_of_rcms: 0
      }
    };
  },
  created() {
    enterprisePage().then(rs => {
      //  (rs.data);
      this.information = rs.data;
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.line {
  width: 1px;
  height: 240px;
  max-height: 280px;
  background-color: #cecece;
}

.content {
  width: 33.33%;
  min-width: 384px;
  height: 240px;
  max-height: 280px;
  box-sizing: border-box;
  border-right: #cecece 1px solid;

  .content-title {
    width: 100%;
    height: 20%;
    background-color: #5f7198;
    color: #ffffff;
    line-height: 48px;
    font-size: 18px;
    padding-left: 20px;
  }

  .content-main {
    width: 100%;
    height: 80%;

    .mian-count {
      width: 100%;
      height: 50%;
      padding-top: 20px;
      padding-left: 30px;
      color: #006dff;
      font-size: 40px;
    }

    .mian-target {
      width: 100%;
      height: 50%;
      padding-top: 20px;
      padding-left: 20px;

      ul {
        width: 100%;
        height: 100%;
        display: flex;
      }

      ul li {
        width: 33%;
        height: 100%;

        div {
          width: 80%;
          height: 48%;
          color: #191919;
          text-align: center;
          line-height: 30px;
          background-color: #f6fbff;
          border-radius: 16px;
        }
      }
    }
  }
}
</style>
