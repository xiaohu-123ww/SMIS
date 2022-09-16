<template>
  <div class="pre">
    <div
      v-for="(item, index) in list"
      :id="index != num - 1 ? 'active' : ''"
      :key="index"
      class="content-box"
      @scroll="scroll"
    >
      <div class="title"><h3 style="margin: 0">项目案例</h3></div>
      <div class="subhead">Projects Story</div>
      <div v-for="(items, key) in list[index]" :key="key" class="left">
        <div class="box">
          <div class="intro" style="width: 100%">
            <div class="up">
              <img
                :src="disposeImg(items.image)"
                alt=""
                width="100%"
                height="300px"
                style="border-radius: 30px"
              >
            </div>
            <div class="down">
              <div
                class="text"
                style="color: #808080; font-size: 15px; line-height: 30px"
              >
                {{ items.introduction }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul class="yuan">
        <li
          v-for="(a, arr) in list"
          :key="arr"
          :class="num == arr + 1 ? 'click' : ''"
          @click="dian(arr)"
        >
          {{ arr + 1 }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { aboutUser } from '@/api/user';

export default {
  data() {
    return {
      list: [],
      num: 1
    };
  },
  created() {
    aboutUser().then(rs => {
      this.list = this.arrTrans(2, rs.data.projects);
    });
  },
  mounted() {
  },
  methods: {
    dian(e) {
      // console.log(this.list)
      this.num = e + 1;
    },
    scroll(e) {
      this.scrollHeight = e.detail.scrollHeight;
    },
    showClasses(index) {
      this.showClassesIndex = index - 1;
      this.scrollTop = -this.scrollHeight * index;
    }
  }
};
</script>
<style lang="scss" scoped>
.pre {
  position: relative;
  width: 62%;
  margin: 0px auto;
  min-width: 1000px;

  bottom: 0;
}
#active {
  opacity: 0;
  margin: 0 auto;
  min-width: 1000px;
  transition: 1.5s;
  position: absolute;
  top: 0px;
  // bottom: 0;
  // left: 250px;
}
.click {
  background: rgba($color: #fa0000, $alpha: 0.3) !important;
}
.box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.yuan {
  width: 100%;
  display: flex;
  list-style: none;
  padding-right: 20px;
  justify-content: flex-end;
  margin: 0;
  overflow: hidden;
  position: absolute;
  z-index: 9999;
  right: 0;
  bottom: 0;
}
.yuan li {
  color: #808080;
  margin: 30px 10px 0;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  background: #e2dfdf;
}
.yuan div {
  color: #808080;
  margin: 30px 10px 0;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  background: #e2dfdf;
}
.yuan li:hover {
  background: rgba($color: #fa0000, $alpha: 0.3);
  color: #ffffff !important;
}
.left {
  width: 50%;
  float: left;
}
// .left {
//   width: 50%;
//   align-self: flex-end;
// }
.content-box .left:nth-child(even) {
  margin-top: -90px;
}
.content-box {
  transition: 1.5s;
  position: relative;
  overflow: hidden;
  min-width: 1000px;
  margin: 0px auto;
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

  .intro {
    padding-top: 20px;
    // width: 45%;
    min-width: 420px;
    height: auto;

    .up {
      width: 92%;
      text-align: center;
      padding-left: 20px;

      img {
        width: 100%;
      }
    }

    .down {
      padding-top: 20px;
      width: 92%;
      text-align: center;

      .down-title {
        font-size: 30px;
        line-height: 56px;
        color: #2f2f2f;
      }

      .sub {
        font-size: 23px;
        line-height: 56px;
        color: #2f2f2f;
      }

      .text {
        width: 100%;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
