<template>
  <div class="tranwrapper">
    <el-collapse v-model="activetran">
      <el-collapse-item style="ma" title="我的培训" name="1">
        <el-collapse v-if="has_joined">
          <el-collapse-item v-for="(item, index) in joined_list" :key="index">
            <template slot="title">
              <div class="time">
                <div class="left">{{ item.class_info.class_name }}</div>
                <div class="right">
                  <!-- <span style="margin: 0 20px"> </span> <span style="margin: 0 20px"></span>-->
                  {{ item.class_info.start_date }}-
                  {{ item.class_info.end_date }}
                </div>
              </div>

            </template>
            <div class="detail-wrapper">
              <div class="left">线上学习</div>
              <div class="moddle">
                <ul style="border-bottom: 1px solid #e6ebf5">
                  <li>累计学习时长</li>
                  <li>上次新增时长</li>
                  <li>上次更新时间</li>
                  <li>学时达标标准</li>
                </ul>
                <ul>
                  <li>
                    {{
                      item.study_line.accumulated_time == null
                        ? "——"
                        : item.study_line.accumulated_time
                    }}
                  </li>
                  <li>
                    {{
                      item.study_line.latest_time == null
                        ? "——"
                        : item.study_line.latest_time
                    }}
                  </li>
                  <li>
                    {{
                      item.study_line.update_date == null
                        ? "——"
                        : item.study_line.update_date
                    }}
                  </li>
                  <li>
                    {{
                      item.study_line.min_study_time == null
                        ? "——"
                        : item.study_line.min_study_time
                    }}
                  </li>
                </ul>
              </div>
              <div class="right">
                <p
                  v-if="item.study_line.is_passed"
                  style="font-size: 15px; display: flex"
                >
                  <i class="el-icon-circle-check" />已达标
                </p>

                <p v-else style="font-size: 15px; display: flex">
                  <i class="el-icon-circle-close" />未达标
                </p>

                <el-button type="primary" @click="send">前往学习</el-button>
              </div>
            </div>
            <div class="detail-wrapper">
              <div class="left">实训</div>
              <div class="moddle">
                <ul style="border-bottom: 1px solid #e6ebf5">
                  <li>实训最高成绩</li>
                  <li>剩余实训次数</li>
                  <li>实训达标成绩</li>
                </ul>
                <ul>
                  <li>
                    {{
                      item.practice_line.practice_score == null
                        ? "——"
                        : item.practice_line.practice_score
                    }}
                  </li>
                  <li>
                    {{
                      item.practice_line.available_times == null
                        ? "——"
                        : item.practice_line.available_times
                    }}
                  </li>
                  <li>
                    {{
                      item.practice_line.min_practice_score == null
                        ? "——"
                        : item.practice_line.min_practice_score
                    }}
                  </li>
                </ul>
              </div>
              <div class="right">
                <p
                  v-if="item.practice_line.is_passed"
                  style="font-size: 15px; display: flex"
                >
                  <i class="el-icon-circle-check" />已达标
                </p>
                <p v-else style="font-size: 15px; display: flex">
                  <i class="el-icon-circle-close" />未达标
                </p>

                <el-button type="primary">参加实训</el-button>
              </div>
            </div>
            <div class="detail-wrapper">
              <div class="left">笔试</div>
              <div class="moddle">
                <ul style="border-bottom: 1px solid #e6ebf5">
                  <li>考试成绩</li>
                  <li>考试达标成绩</li>
                </ul>
                <ul>
                  <li>
                    {{
                      item.exam_line.exam_score == null
                        ? "——"
                        : item.exam_line.exam_score
                    }}
                  </li>
                  <li>
                    {{
                      item.exam_line.min_score == null
                        ? "——"
                        : item.exam_line.min_score
                    }}
                  </li>
                </ul>
              </div>
              <div class="right">
                <p
                  v-if="item.exam_line.is_passed"
                  style="font-size: 15px; display: flex"
                >
                  <i class="el-icon-circle-check" />已达标
                </p>
                <p v-else style="font-size: 15px; display: flex">
                  <i class="el-icon-circle-close" />未达标
                </p>
                <el-button type="primary" @click="send">参加考试</el-button>
              </div>
            </div>
            <div class="detail-wrappercert">
              <div class="left">证书</div>
              <div class="right">
                <p
                  v-if="item.class_info.cert_progress == 0"
                  style="font-size: 15px; display: flex"
                >
                  <i class="el-icon-circle-close" />未达标
                </p>
                <p
                  v-else-if="item.class_info.cert_progress == 1"
                  style="font-size: 15px; display: flex"
                >
                  <i class="el-icon-circle-check" />已达标
                </p>
                <p v-else style="font-size: 15px; display: flex">
                  <i class="el-icon-remove-outline" />已关闭
                </p>
              </div>
            </div>
            <div style="float: right; margin-right: 20px">
              <el-button @click="Cancelenrollment(item)">取消报名</el-button>
              <el-button
                type="primary"
                @click="classDetail(item)"
              >班级详情</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
        <p v-else style="font-size: 15px; margin: 60px">
          您还暂未报名,请前往班级列表报名
        </p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import {
  Clientindex,
  ClientMydetail,
  userRestudent,
  onclick,
  quxiaoClass
} from '@/api/Traincertification/Clinetindex';
export default {
  data() {
    return {
      activetran: ['1'],
      has_joined: null,
      joined_list: [],
      classstuts: [
        { value: 0, lable: '未开始' },
        { value: 1, lable: '进行中' },
        { value: 2, lable: '已结束' },
        { value: 3, lable: '已关闭' }
      ]
    };
  },
  created() {
    this.getStudentinfo();
  },
  methods: {
    send() {
      window.open(
        'https://apphtpxagtp7928.h5.xiaoeknow.com/p/decorate/homepage?',
        '_blank'
      );
    },
    classDetail(item) {
      const detail = this.$router.resolve({
        name: 'ClassStudetail', // 这里是跳转页面的name
        query: {
          // 要传的参数
          id: item.class_id
        }
      });
      window.open(detail.href, '_blank'); // 打开新的窗口
    },
    Cancelenrollment(item) {
      this.$confirm('此操作将永久取消报名该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          quxiaoClass(item.class_id, { type: '300' }).then((res) => {
            if (res.code == 1000) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              });
              this.getStudentinfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
    },
    getStudentinfo() {
      ClientMydetail().then((res) => {
        // console.log(res);
        this.has_joined = res.data.has_joined;
        if (this.has_joined) {
          res.data.joined_list.forEach((item, index) => {
            item.class_info.end_date = item.class_info.end_date.replace(
              /-/g,
              '/'
            );
            item.class_info.start_date = item.class_info.start_date.replace(
              /-/g,
              '/'
            );
          });
          this.joined_list = res.data.joined_list;
        }
      });
    }
  }
};
</script>
<style scoped>
.detail-wrappercert {
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100px;
}
.detail-wrappercert .left {
  width: 10%;
  text-align: center;
  font-size: 18px;
}
.detail-wrappercert .right {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.detail-wrappercert .right i {
  width: 30px;
}
.detail-wrapper {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #e6ebf5;
}
.detail-wrapper .left {
  width: 10%;
  text-align: center;
  font-size: 18px;
}
.detail-wrapper .moddle {
  width: 60%;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  height: 100px;
  justify-content: space-between;
}
.detail-wrapper .moddle ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  list-style: none;
  margin: 0;
}
.detail-wrapper .moddle ul li {
  width: 24%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.detail-wrapper .right {
  /* width: 20%; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.detail-wrapper .right i {
  width: 30px;
}
.detail-wrapper .right p {
  margin-right: 20px;
}
/deep/.el-collapse-item__header {
  font-size: 20px !important;
  padding-left: 20px;
}
.tranwrapper {
  width: 80%;
  /* height: 100%; */
  /* float: right; */
  margin: 0 auto;
  /* padding-top: 25px; */
}
.tran {
  width: 100%;
  height: 230px;
}
.tran_text {
  width: 100%;
  height: 70px;
  /* background-color: bisque; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid gainsboro;
}
i {
  font-size: 30px;
  width: 10%;
}
.tran_class {
  width: 10%;
}
.tran_start {
  width: 10%;
}
.exam {
  width: 100%;
  height: 140px;
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid gainsboro;
}
.exam_left {
  width: 30%;
  height: 60px;
  /* background-color: antiquewhite; */
  text-align: center;
  line-height: 50px;
}
.exam_text {
  width: 80%;
  height: 100px;
}
.exam_text_te {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid gainsboro;
}
.exam_text_te p {
  width: 15%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
}
.exam_text_t {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* border-bottom: 1px solid gainsboro; */
}
.exam_text_t p {
  width: 15%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
}
.exam_btn {
  width: 95%;
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}
.time {
  display: flex;
  width: 97%;
  justify-content: space-between;
}
.left {
  padding-left: 20px;
}
/* .cesh {
  width: 200px;
} */
</style>
