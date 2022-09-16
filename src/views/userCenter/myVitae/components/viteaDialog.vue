<template>
  <div class="dialog-box">
    <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      :title="viteaname"
      :visible.sync="open"
      append-to-body
      width="700px"
    >
      <el-form ref="list" :model="list" label-position="top" label-width="20px">
        <el-form-item v-if="list.industry" label="行业" prop="cvname">
          <!--          industry_list.dictionaries-->

          <el-select
            v-model="list.industry.id"
            filterable
            placeholder="意向行业或当前行业"
          >
            <el-option
              v-for="item in dictionaries.industry_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="list.major" placeholder="您的专业名称" />
        </el-form-item>
        <el-form-item label="课程" prop="courses">
          <el-input
            v-model="list.courses"
            placeholder="您所学的课程，课程应该与您的求职意向有关"
          />
        </el-form-item>
        <el-form-item label="求职意向" prop="post">
          <el-cascader
            v-model="list.intention"
            :disabled="statu"
            style="width: 300px"
            :props="{ children: 'children', value: 'id', label: 'name' }"
            :options="postlist"
            @change="handleChange"
          />
          <p v-if="statu == true" style="color: red">求职意向不可更改</p>
        </el-form-item>
        <el-form-item label="英语水平" prop="englistSkill">
          <div class="radio-group">
            <el-radio-group
              v-model="list.english_skill"
              fill="#d8f3ff"
              style="width: 100%"
              text-color="#191919"
              @change="changeRadio"
            >
              <el-radio-button
                v-for="(item, index) in mixLists"
                :key="index"
                :label="item.idx"
                class="viteaBtn"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="计算机水平" prop="computerSkill">
          <div class="radio-group">
            <el-radio-group
              v-model="list.computer_skill"
              fill="#d8f3ff"
              style="width: 100%"
              text-color="#191919"
              @change="changeRadio"
            >
              <el-radio-button
                v-for="(item, index) in mixLists"
                :key="index"
                :label="item.idx"
                class="viteaBtn"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="期望薪资" prop="expected_salary">
          <el-input v-model="list.expected_salary" />
        </el-form-item>
        <el-form-item label="所掌握的专业技能" prop="professional_skill">
          <el-input
            v-model="list.professional_skill"
            placeholder="填写多个与求职意向相关的技能，用“；”隔开"
          />
        </el-form-item>
        <el-form-item label="奖项/证书" prop="award">
          <el-input v-model="list.award" />
        </el-form-item>
        <el-form-item label="特长/爱好" prop="talent">
          <el-input v-model="list.talent" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          style="background: #3c69be; color: #fff"
          @click="submit"
        >{{ buttonname }}
        </el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addCv, modCv, getVitaelist } from '@/api/user';

export default {
  props: ['open', 'viteaname', 'list', 'buttonname', 'dictionaries', 'status'],

  data() {
    return {
      addViteaForm: {},
      mixList: ['一般', '了解', '中等', '熟悉', '精通'],

      mixLists: ['一般', '了解', '中等', '熟悉', '精通'],
      postlist: [],
      statu: false
    };
  },
  watch: {
    status(status) {
      this.statu = status;
    }
  },
  created() {
    // console.log(this.list);
    getVitaelist().then(rs => {
      // console.log(rs.data);
      this.mixLists = rs.data.skill_levels;
      this.postlist = this.trees(rs.data.position_class, 'id', 'parent_id');
      // console.log(this.postlist);
    });
  },
  methods: {
    submit() {
      // this.$emit('dialogClose', false)
      if (this.buttonname == '保存') {
        modCv({
          type: '401',
          id: String(this.list.id),
          industry: String(this.list.industry.id),
          major: this.list.major,
          course: this.list.courses,
          english: String(this.list.english_skill),
          computer: String(this.list.computer_skill),
          salary: String(this.list.expected_salary),
          pro: this.list.professional_skill,
          award: this.list.award,
          talent: this.list.talent
        }).then(rs => {
          if (rs !== undefined) {
            this.$emit('dialogClose', false);
            this.$message({
              message: rs.msg,
              type: 'success'
            });
          } else {
            // this.$emit('dialogClose', true)
          }
        });
      } else {
        addCv({
          type: '402',
          intention: this.list.intention[1] || '',
          industry: String(this.list.industry.id) || '',
          major: this.list.major,
          course: this.list.courses,
          english: this.list.english_skill || '',
          computer: this.list.computer_skill || '',
          salary: this.list.expected_salary,
          pro: this.list.professional_skill,
          award: this.list.award,
          talent: this.list.talent
        }).then(rs => {
          // console.log(rs);
          if (rs !== undefined) {
            this.$emit('dialogClose', false);
            this.$message({
              message: rs.msg,
              type: 'success'
            });
          } else {
            // this.$emit('dialogClose', true)
          }
        });
      }
    },
    cancel() {
      this.$emit('dialogClose', false);
    },
    changeRadio() {
    },
    change(e) {
      this.$forceUpdate();
    },
    handleChange(value) {
      // console.log(value);
    }
  }
};
</script>
<style lang="scss" scoped>
.radio-group {
  .el-radio-button__inner {
    border: #d9d9d9 1px solid;
    width: 100px;
    margin-right: 15px;
  }
}
</style>
