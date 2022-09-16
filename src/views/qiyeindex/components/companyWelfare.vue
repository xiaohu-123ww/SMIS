<template>
  <div class="welfare-box">
    <div class="title">公司福利</div>
    <div class="company-form">
      <el-form label-position="top">
        <el-form-item>
          <el-tag
            v-for="(item, index) in welfareList"
            :key="index"
            :disable-transitions="false"
            closable
            @close="handleClose(item)"
          >
            {{ item.tag.name }}
          </el-tag>
          <el-button class="button-new-tag" size="small" @click="showlist"
            >+ 选择默认福利
          </el-button>
          <el-dialog
            title="选择福利"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="closeDialog"
          >
            <el-checkbox
              v-for="(item, index) in enterpriseTags"
              :key="index"
              @change="getTages(item)"
              >{{ item.name }}</el-checkbox
            >
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="postTages()">确 定</el-button>
            </span>
          </el-dialog>
          <el-tag
            v-for="items in diyList"
            :key="items.tag.id"
            closable
            :disable-transitions="false"
            id="diytag"
            @close="handlecloseDiy(items)"
          >
            {{ items.tag.name }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @blur="handleInputConfirm"
            @keyup.enter.native="handleInputConfirm"
          />

          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 自定义福利
          </el-button>
        </el-form-item>
        <!-- 
        <el-form-item class="form-submit">
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
  data () {
    return {
      value: '',
      form: {
        welfare: []
      },
      welfareList: [],
      inputVisible: false,
      inputValue: '',
      enterpriseTags: [],
      dialogVisible: false,
      changeitem: "",
      changelist: [],
      diyList: []
    };
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      enterpriseInfo().then(
        rs => {
          //  (rs.data.enterprise_tags);
          // console.log(rs.data);
          this.welfareList = rs.data.tags_default_chosen;
          this.diyList = rs.data.tags_self_setting_chosen

          this.enterpriseTags = rs.data.enterprise_tags;
        }
      );
    },
    getTages (e) {
      // console.log(e)
      this.changeitem = e.id
      updateInfo({
        type: "303",
        id: String(this.changeitem)
      }).then(rs => {
        // console.log(rs)
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.getlist();
        } else {

        }
      })
    },
    postTages () {
      this.dialogVisible = false
      // console.log(1)

    },
    showlist () {
      this.dialogVisible = true;
    },
    onSubmit () {
    },
    closeDialog (done) {
      this.dialogVisible = false;
    },
    handlecloseDiy (tag) {
      updateInfo({
        type: '302',
        id: String(tag.tag.id)
      }).then(rs => {
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.getlist();
        } else {

        }
      })
    },
    handleClose (tag) {
      // console.log(tag)
      // this.welfareList.splice(this.welfareList.indexOf(tag), 1);
      updateInfo({
        type: "301",
        id: String(tag.tag.id)
      }).then(rs => {
        // console.log(rs)
        if (rs !== undefined) {
          this.$message({
            message: rs.msg,
            type: 'success'
          });
          this.getlist();
        } else {

        }
      })
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm () {
      const inputValue = this.inputValue;
      if (inputValue) {
        updateInfo({
          type: '3',
          bonus: inputValue
        }).then(rs => {
          // console.log(rs);
          this.getlist()
        });
        // this.welfareList.push(inputValue)
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.welfare-box {
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

    .el-tag {
      margin-left: 10px;
      border: 1px solid #1996fc;
      background-color: #d8f3ff;
      border-radius: 0;
      color: #191919;
    }
    #diytag {
      margin-left: 10px;
      border: 1px solid orange;
      background-color: #fcddc8;
      border-radius: 0;
      color: #191919;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
      border-radius: 0;
      color: #191919;
    }

    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
      border-radius: 0;
      color: #191919;
    }

    .el-checkbox-button {
      border: #d9d9d9 1px solid;
      margin-right: 5px;

      span {
        border-radius: 0;
      }
    }

    .is-checked span {
      border: 1px solid #1996fc;
      background-color: #d8f3ff;
      box-sizing: border-box;
    }

    .el-checkbox-button__inner {
      border: none;
    }

    .form-submit {
      width: 86%;
      min-height: 75px;
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
    }
  }
}
</style>
