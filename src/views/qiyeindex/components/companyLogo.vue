<template>
  <div>
    <div class="title">企业形象</div>
    <div class="company-form">
      <el-form label-position="top">
        <el-form-item label="企业logo">
          <label
            slot="label"
            style="color: #808080; font-weight: 500"
          >企业logo</label>
          <el-upload
            class="avatar-uploader"
            action="https://znzz.tech/enterprise/enterprise-info/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div
              v-if="imageUrl"
              style="
                height: 100px;
                width: 100%;
                display: flex;
                align-items: center;
                border: 1px dashed darkgray;
              "
            >
              <img :src="imageUrl" class="avatar" height="100%">
              <p>{{ imageUrl }}</p>
            </div>

            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
            <el-button
              class="upload-btn"
              round
              type="primary"
              style="float: left; margin-top: 10px"
            >选择文件
            </el-button>
          </el-upload>
          <!--          <el-upload-->
          <!--            :file-list="fileList"-->
          <!--            :on-preview="handlePreview"-->
          <!--            :on-remove="handleRemove"-->
          <!--            action="https://znzz.tech/enterprise/enterprise-info/"-->
          <!--            class="upload-demo"-->
          <!--            list-type="picture"-->
          <!--          >-->
          <!--            <div slot="tip" class="el-upload__tip">-->
          <!--              只能上传jpg/png文件，且不超过500kb-->
          <!--            </div>-->
          <!--            <el-button-->
          <!--              class="upload-btn"-->
          <!--              round-->
          <!--              type="primary"-->
          <!--            >选择文件-->
          <!--            </el-button>-->
          <!--          </el-upload>-->
        </el-form-item>
        <!-- <el-form-item class="form-submit">
          <el-button
            round
            style="
              width: 100px;
              margin-left: 40px;
              margin-bottom: 30px;
              background-color: #cecece;
              color: #fff;
            "
            >取消
          </el-button>
          <el-button
            round
            style="
              width: 100px;
              margin-left: 40px;
              margin-bottom: 30px;
              background-color: #3c69be;
              color: #fff;
            "
            @click="onSubmit"
            >保存
          </el-button>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { enterpriseInfo, updateInfo } from '@/api/enterprise';

export default {
  data() {
    return {

      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // },
        // {
        //   name: 'food2.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ],
      imageUrl: ''
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      enterpriseInfo().then(rs => {
        // console.log(rs.data.info)
        // this.fileList.push({ url: this.disposeImg(rs.data.info.logo),name:rs.data.info.logo });
        // console.log(this.fileList);
        this.imageUrl = this.disposeImg(rs.data.info.logo);
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if (isLt2M == true) {
        // console.log(file);
        // 将文件转化为formdata数据上传
        const fd = new FormData();
        fd.append('enterprise_logo', file);
        // console.log(fd);
        this.onSubmit(fd);
      }

      return isLt2M;
    },
    handleRemove(file, fileList) {
      //  (file, fileList)
      // console.log(file, fileList)
    },
    handlePreview(file) {
      //  (file)
      // console.log(file)
      const fd = new FormData();
      fd.append('enterprise_logo', file);
    },
    onSubmit(fd) {
      // console.log(this.filedata)
      const that = this;
      updateInfo(fd).then(rs => {
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          that.getlist();
        } else {

        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.title {
  width: 100%;
  height: 100px;
  padding-top: 30px;
  padding-left: 30px;
  font-size: 20px;
  color: #2f2f2f;
}

.company-form {
  width: 100%;
  height: auto;
  padding-left: 30px;
  border-bottom: 1px solid #cecece;

  .upload-demo {
    width: 86%;

    .upload-btn {
      width: 100px;
      height: 35px;
      margin-bottom: 30px;
      background-color: #3c69be;
      color: #fff;
    }
  }

  .form-submit {
    width: 86%;
    min-height: 75px;
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
