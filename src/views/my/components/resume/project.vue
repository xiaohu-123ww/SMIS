<template>
  <div v-if="show">
    <el-form
      ref="rf"
      :model="list"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="项目名称" prop="project_name">
        <el-input v-model="list.project_name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="项目角色" prop="project_role">
        <el-input v-model="list.project_role" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="项目时间" prop="value1">
        <el-date-picker
          v-model="list.value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptionsStart"
        >
        </el-date-picker>
        <!-- <el-col :span="7">
          <el-form-item prop="start_date">
            <el-date-picker
              v-model="list.start_date"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">--</el-col>
        <el-col :span="14">
          <el-form-item prop="end_date">
            <el-date-picker
              v-model="list.end_date"
              type="date"
              placeholder="选择日期"
              style="width: 223px"
            ></el-date-picker>
          </el-form-item>
        </el-col> -->
      </el-form-item>
      <el-form-item
        label="工作描述"
        style="width: 90%; height: 300px"
        prop="project_desc"
      >
        <!-- 使用 v-model 进行双向的数据绑定 -->
        <quill-editor
          v-model="list.project_desc"
          :options="editorOption"
          @blur="onEditorBlur($event)"
        >
        </quill-editor>
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
import { getProjectExperiences, getProjectExperiencesAdd } from '@/api/my/resume'
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
    },
    num: {
      type: Object
    }
  },
  data () {
    return {
      pickerOptionsStart: {
        // 时间不能大于当前时间
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }

      },

      id: 0,
      rules: {
        project_name: [
          { required: true, message: '请输入项目称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        project_role: [
          { required: true, message: '请输入项目校色', trigger: 'blur' }
        ],
        start_date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        end_date: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        project_desc: [
          { required: true, message: '请填写工作描述', trigger: 'blur' },
          { min: 1, max: 3000, message: '长度在 1到 3000 个字符', trigger: 'blur' }
        ],
        value1: [
          { required: true, message: '请选择日期', trigger: 'change' }
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
              [{ align: [] }] // 显示居中
              // ['image', 'video']

            ]// 自定义工具栏选项
          }
        }
      },
      list: {
        project_name: '',
        project_role: '',
        project_desc: '',
        start_date: '',
        end_date: '',
        value1: []
      }
    }
  },
  watch: {

    num (newVal, oldVal) {
      console.log('修改', newVal)
      this.list.project_name = newVal.project_info.project_name
      this.list.project_role = newVal.project_info.project_role
      this.list.project_desc = newVal.project_info.project_desc
      this.list.value1[0] = newVal.start_date
      this.list.value1[1] = newVal.end_date
      this.id = newVal.id
    }
  },
  methods: {
    async submitForm () {
      this.$refs.rf.validate(async (valid) => {
        if (valid) {
          this.list.start_date = new Date(this.list.value1[0]).toLocaleDateString().slice().replace(/\//g, '-')
          this.list.end_date = new Date(this.list.value1[1]).toLocaleDateString().slice().replace(/\//g, '-')
          if (this.id === 0) {
            const res = await getProjectExperiences(this.list)
            console.log('12', res)
          } else {
            const res = await getProjectExperiencesAdd(this.id, this.list)
            console.log('修改成功', res)
            this.$message.success('添加成功')
          }

          this.$emit('reset', false)
          this.reset()
        }
      })
    },
    resetForm () {
      this.$confirm('确定取消此编辑吗', '提示', {

        confirmButtonText: '确定',

        cancelButtonText: '取消',

        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
        this.reset()
      })
    },
    onEditorBlur () {

    },
    reset () {
      this.list.project_name = ''
      this.list.project_role = ''
      this.list.project_desc = ''
      this.list.start_date = ''
      this.list.end_date = ''

      this.list.value1 = []
    }
  }

}
</script>
<style scoped lang="scss">
.el-input {
  // width: 600px;
}
.box {
  width: 250px;
}
::v-deep .ql-editor {
  height: 150px;
}
</style>
