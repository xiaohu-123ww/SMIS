<template>
  <div>
    <p class="m-content overflow-line" id="J_description">
      {{ introduce }}
    </p>
    <button
      type="button"
      class="btn-more"
      v-if="isShowMore"
      id="J_btnmore"
      @click="showmoreDesc($event)"
    >
      查看更多
    </button>
  </div>
</template>
<script>
export default {
  name: "Spread",
  data() {
    return {
      isShowMore: false,
      isDescStatus: true,
      introduce: "",
    };
  },
  props: {
    mes2: {
      type: String,
      default: "",
    },
  },
  created() {
    // console.log(this.mes2);
    this.introduce = this.mes2;
    if (this.introduce.length > 80) {
      this.isShowMore = true;
    }
  },
  methods: {
    showmoreDesc(e) {
      let el = e.currentTarget;
      el.previousElementSibling.classList[
        !this.isDescStatus ? "add" : "remove"
      ]("overflow-line");
      el.classList[this.isDescStatus ? "add" : "remove"]("more-collapse");
      el.innerHTML = !this.isDescStatus ? "查看更多" : "收起";
      this.isDescStatus = !this.isDescStatus;
      this.isShowMore = true;
    },
  },
  watch: {
    mes2(val) {},
  },
};
</script>

<style scoped>
.overflow-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.btn-more {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 400;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #1890ff;
  border-color: #1890ff;
  float: right;
}
</style>