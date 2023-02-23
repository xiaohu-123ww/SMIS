<template>
  <div ref="getheight" :class="status == false ? 'container' : 'containers'">
    <div class="header">
      <side-bar />
      <navBar
        style="z-index: 100000"
        class="logins"
        @amend="dialogFormVisible"
      />
    </div>
    <!-- <dalog :status="bol" /> -->
    <div class="main">
      <router-view />
    </div>
    <bottom-bar />
    <el-dialog title="修改密码" :visible.sync="bol">
      <el-form :model="form" style="width: 70%; margin: 20px auto">
        <el-form-item
          label="旧密码"
          :label-width="formLabelWidth"
          style="margin: 20px auto"
        >
          <el-input
            v-model="form.oldpassword"
            autocomplete="off"
            type="password"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          :label-width="formLabelWidth"
          style="margin: 20px auto"
        >
          <el-input
            v-model="form.newpassword"
            autocomplete="off"
            type="password"
          />
        </el-form-item>
        <el-form-item label="新密码确认" :label-width="formLabelWidth">
          <el-input
            v-model="form.newpasswords"
            autocomplete="off"
            type="password"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer footer">
        <button style="background-color: #66b1ff" @click="postPass">
          修改密码
        </button>
        <button style="color: black" @click="bol = false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import sideBar from './components/Sidebar/sideBar'
import bottomBar from './components/Bottombar/bottomBar'
import navBar from './components/Sidebar/navBar'
// import dalog from './components/dalog'
import { editPassword } from '@/api/user'
export default {
  name: 'UserLayout',
  components: {
    sideBar,
    bottomBar,
    navBar
    // dalog
  },
  data () {
    return {
      bol: false,
      status: false,
      form: {
        oldpassword: '',
        newpassword: '',
        newpasswords: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    window.addEventListener('scroll', this.windowScroll)
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      var h =
        document.documentElement.clientHeight || document.body.clientHeight
      // console.log(h)
      // console.log(this.$refs.getheight.offsetHeight);
      if (this.$refs.getheight.offsetHeight < h) {
        // console.log(1);
        this.status = true
      } else {
        // console.log(2);
        this.status = false
      }
    })
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      var h =
        document.documentElement.clientHeight || document.body.clientHeight
      // console.log(h)
      // console.log(this.$refs.getheight.offsetHeight);
      if (this.$refs.getheight.offsetHeight < h) {
        // console.log(1);
        this.status = true
      } else {
        // console.log(2);
        this.status = false
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.windowScroll)
  },
  methods: {
    windowScroll () {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // console.log(scrollTop == '');
      if (scrollTop !== '') {
        this.status = true
      } else {
        this.status = false
      }
    },
    dialogFormVisible (data) {
      console.log(123)
      this.bol = data
      this.form = {
        oldpassword: '',
        newpassword: '',
        newpasswords: ''
      }
      // console.log(this.bol);
    },
    async postPass () {
      await editPassword({
        old_psw: this.form.oldpassword,
        new_psw: this.form.newpassword,
        confirm_new_psw: this.form.newpasswords
      }).then((rs) => {
        // console.log(rs);
        if (rs !== undefined) {
          this.bol = false
          this.$store.dispatch('user/logout')
          this.$router.push('/login')
          location.reload()
        } else {
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.footer button {
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 0 10px;
  color: #ffffff;
  cursor: pointer;
}
.container {
  width: 100%;
  height: auto;
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    width: 100%;
    height: 113px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: relative;
    .logins {
      position: absolute;
      right: 10px;
      top: 25px;
    }
  }

  .main {
    width: 100%;
    height: auto;
    background-color: #fffeff;
    //align-self: flex-start;
  }
}

.containers {
  width: 100%;
  height: auto;
  // min-width: 1555px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    width: 100%;
    height: 113px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: relative;
    .logins {
      position: absolute;
      right: 5px;
      top: 30px;
    }
  }

  .main {
    width: 100%;
    height: auto;
    flex: 1;
    background-color: #f6f6f8;
    //align-self: flex-start;
    //background-color: #f6f6f8;
  }
}
</style>
