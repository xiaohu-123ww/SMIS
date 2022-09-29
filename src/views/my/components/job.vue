<template>
  <div>
    <div>
      <el-row>
        <el-col v-for="(item, index) in list" :key="item.value" :span="2"
          ><div
            class="grid-content bg-purple"
            :class="{ bt: changeColor === index }"
            @click="colorChange(index)"
          >
            {{ item.name }}
          </div></el-col
        >
      </el-row>
    </div>
    <Job />
  </div>
</template>
<script>
import Job from './job/index.vue'
export default {
  components: { Job },
  data () {
    return {
      changeColor: 0,
      list: [{
        value: 1,
        name: '新招呼'
      },
      {
        value: 2,
        name: '有意向'
      },
      {
        value: 3,
        name: '沟通中'
      },
      {
        value: 4,
        name: '已投递'
      },
      {
        value: 5,
        name: '邀面试'
      }, {
        value: 6,
        name: '不合适'
      }]

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    colorChange (index) {
      this.changeColor = index
    }

  }
}
</script>
<style scoped lang="scss">
.bt {
  border-bottom: 2px solid #256efd;
}
.grid-content {
  height: 40px;
  width: 60px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
  // background-color: pink;
}
</style>
