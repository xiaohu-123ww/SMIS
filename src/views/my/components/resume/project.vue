<template>
  <div v-if="show">
    <el-form
      ref="rf"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="ruleForm.name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="项目角色" prop="region">
        <el-input v-model="ruleForm.region" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="项目时间" required>
        <el-col :span="7">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">--</el-col>
        <el-col :span="14">
          <el-form-item prop="date2">
            <el-date-picker
              v-model="ruleForm.date2"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
        label="文章内容"
        style="width: 300px; height: 300px"
        prop="content"
      >
        <!-- 使用 v-model 进行双向的数据绑定 -->
        <quill-editor
          v-model="ruleForm.content"
          :options="editorOption"
          style="width: 700px; height: 150px"
          @blur="onEditorBlur($event)"
        ></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import '../../../../styles/font.scss'
import * as Quill from 'quill'
var fonts = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif'
]
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)
// 自定义字号的大小
var sizes = [false, '16px', '18px', '20px', '22px', '26px', '28px', '30px']
var Size = Quill.import('formats/size')
Size.whitelist = sizes

export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        date2: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写工作描述', trigger: 'blur' },
          { min: 1, max: 3000, message: '长度在 1到 3000 个字符', trigger: 'blur' }
        ]
      },
      editorOption: {
        theme: 'snow', // 主题
        placeholder: '',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'],
              [{ size: sizes }], // 配置字号
              [{ color: [] }, { background: [] }], // 显示背景字体颜色
              [{ font: fonts }], // 显示字体选择
              [{ align: [] }], // 显示居中
              ['image', 'video']

            ]// 自定义工具栏选项
          }
        }
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.rf.validate()
    },
    resetForm () {
      this.$emit('reset', false)
    },
    onEditorBlur () {

    }
  }
}
</script>
<style scoped lang="scss">
.el-input {
  width: 600px;
}
.box {
  width: 250px;
}
</style>
