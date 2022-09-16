<template>
  <div class="square-box">
    <div class="search">
      <el-input
        v-model="search"
        placeholder="请输入要搜索的关键词"
        type="text"
      />
      <el-button
        round
        style="
          margin-left: 40px;
          margin-bottom: 30px;
          background-color: #3c69be;
        "
        type="primary"
        @click.native.prevent="handleSearch"
      >搜索
      </el-button>
    </div>
    <!--    <div class="requirement">-->
    <!--      <div class="req-mian">意向城市</div>-->
    <!--      <div class="req-mian">意向岗位</div>-->
    <!--      <div class="req-mian">期望薪资</div>-->
    <!--    </div>-->
    <!-- 搜索结果 -->
    <search-list v-show="!isSearch" ref="searchlist" @getsearch="getsearch" />
    <!-- 广场列表 -->
    <square-list v-show="isSearch" @getlistmore="getlistmore" />
    <!--    <square-list v-if="isSearch" />-->
  </div>
</template>

<script>
import squareList from '../components/squareList';
import searchList from '../components/searchList';
import { searchFoundtalent } from '@/api/enterprise';

export default {
  name: 'Index',
  components: { squareList, searchList },
  data() {
    return {
      search: '',
      activeNames: ['1'],
      // 底部列表是否显示
      isSearch: true
    };
  },
  methods: {
    getsearch(status) {
      if (status == true) {
        this.isSearch = true;
      }
    },
    getlistmore(data) {
      //  (data)
      this.isSearch = false;
      // if (this.search !== null || this.search !== '') {
      //   this.isSearch = false
      // } else {
      //   this.isSearch = !this.isSearch
      // }
      this.$nextTick(() => {
        this.$refs.searchlist.getItem(data.data);
      });
    },
    handleSearch() {
      if (this.search !== null || this.search !== '') {
        this.isSearch = false;
      } else {
        this.isSearch = !this.isSearch;
      }
      var a = {
        q: this.search
      };
      searchFoundtalent(a).then(res => {
        this.$refs.searchlist.getItem(res.data);
      });
    },
    handleChange() {
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.square-box {
  width: 86%;
  // min-width: 1400px;
  height: auto;
  margin: 20px auto;

  .search {
    width: 60%;
    display: flex;
    margin: 0 auto;

    .el-input {
      width: 80%;

      .el-input__inner {
        width: 100%;
        border-radius: 40px;
        background: #f4f4f4;
        color: #808080;
      }
    }
  }

  .requirement {
    width: 60%;
    margin: 0 auto;

    .req-mian {
      color: #808080;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
}
</style>
