<template>
  <div class="clientHeader">
    <div class="client_header">
      <div class="header_logo">
        <img src="../../../assets/images/logo.png" alt="">
      </div>
      <el-menu
        text-color="#222222"
      >
        <el-menu-item
          v-for="(item, index) in list"
          :key="index"
          @click="edit(item)"
        >
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>

      <div class="client_right">
        <!-- <p @click="login">登录</p>
        <p>注册</p> -->
        <p
          style="
            width: 35%;
            font-size: 15px;
            display: flex;
            align-items: center;
            color: #222;
            cursor: pointer;
          "
          @click="manager"
        >
          进入后台<i class="el-icon-monitor" style="margin-left: 5px" />
        </p>
        <p
          style="
            width: 50%;
            font-size: 15px;
            display: flex;
            align-items: center;
            color: #222;
            cursor: pointer;
          "
          @click="logout"
        >
          返回主站 <i class="el-icon-s-home" style="margin-left: 5px" />
        </p>
      </div>
    </div>
    <!-- 是否为学员对话框 -->
    <register ref="children" />
  </div>
</template>
<script>
import {
  Clientindex,
  ClientMydetail,
  userRestudent,
  onclick
} from '@/api/Traincertification/Clinetindex';
import register from '../componets/register.vue';
import { ismanager } from '@/api/Traincertification/index.js';
export default {
  components: { register },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        phone: '',
        wechat: '',
        id_number: '',
        type: ''
      },
      formLabelWidth: '80px',
      list: [
        {
          path: '/clientMy',
          name: '我的'
        },
        {
          path: '/clientindex',
          name: '首页'
        }
      ]
    };
  },
  methods: {
    manager() {
      ismanager().then((res) => {
        if (res.data.is_login == true && res.data.is_staff == true) {
          this.$router.push('/Bmanagementlayout');
        } else {
          this.$message({
            type: 'info',
            message: '您还不是管理员'
          });
        }
      });
    },
    login() {
      this.$router.push('/clientLogin');
    },
    edit(item) {
      if (item.name == '我的') {
        ClientMydetail().then((res) => {
          // console.log(res);
          // this.has_signed = res.data.has_signed;
          // this.has_certificated = res.data.has_certificated;
          if (res.data.has_signed == false) {
            this.$refs.children.dialogRegVisible = true;
          } else {
            if (res.data.has_certificated == false) {
              this.$refs.children.dialogErweiVisible = true;
            } else {
              this.$refs.children.dialogErweiVisible = false;
              this.$router.push(item.path);
            }
            this.$refs.children.dialogRegVisible = false;
            // this.$router.push(item.path);
          }
        });
      } else {
        this.$router.push(item.path);
      }
    },
    logout() {
      this.$router.push('/userdash');
    }
  }
};
</script>
<style scoped>
.clientHeader{
  /* width: 100%; */
  /* height: 60px; */
  min-width: 1555px;
}
.client_right i {
  width: 4%;
  color: #222;
  font-size: 25px;
  line-height: 50px;
}
.el-menu {
  border: 0;
}
.client_header {
  width: 100%;
  height: 113px;
  background-color: #fff;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  overflow: hidden;
}
.header_logo {
  margin-left: 70px;
}
.client_header ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68%;
  height: 60px;
  overflow: hidden;
}
.client_header ul li {
  width: 10%;
  text-align: center;
  font-size: 19px;
}
.client_header ul li:hover {
  /* color: rgba(0, 0, 255, 0.616); */
  background-color: #fff;
  color: blue;
  /* border-bottom: 4px solid #256EFD; */
  /* text-decoration: rgb(138, 136, 136) underline; */
}
.client_header ul li a:hover {
  background-color: #fff;
  color: blue;
  /* border-bottom: 4px solid #256EFD; */
  /* text-decoration: gray underline solid; */
}
.btn {
  width: 10%;
  height: 60px;
}
.client_right {
  width: 25%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn {
  width: 10%;
  height: 60px;
  line-height: 60px;
}
</style>
