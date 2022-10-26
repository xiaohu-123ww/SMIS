<template>
  <div class="dashboard-content">
    <div class="boxxx">
      <el-input
        v-model="searchInput"
        class="input-with-select"
        placeholder="搜索岗位/公司"
      >
        <el-button
          slot="prepend"
          size="mini"
          style="width: 20px; height: 20px; line-height: 60px"
          ><img
            src="../../../assets/icon/search.png"
            size="mini"
            style="width: 16px"
        /></el-button>
        <el-button
          slot="append"
          style="
            width: 137px;
            height: 54px;
            border-radius: 4px;
            background-color: #256efd;
            color: #fff;
            font-weight: 500;
            margin-right: 44px;
            font-size: 16px;
          "
          icon="el-icon-search"
          @click="search()"
          >搜索
        </el-button>
      </el-input>

      <!-- <el-cascader-panel
        v-show="showPanel"
        v-model="selectOptions"
        style="height: 100%"
        :options="options"
        :props="{
          value: 'name',
          label: 'name',
          children: 'children',
          expandTrigger: 'hover',
        }"
        @change="optionChange"
      /> -->
      <!-- <button @click="empty" v-show="radioList.length==0?false:true">删除全部历史记录</button> -->
    </div>

    <div class="tip-box">
      <el-radio-group
        v-model="tip"
        style="width: 80%; height: 100%"
        text-color="#191919"
        size="mini"
        @change="goSearchDetail(tip)"
      >
        <el-radio-button
          v-for="(item, index) in radioList"
          :key="index"
          :label="item"
          border
        />
      </el-radio-group>
    </div>
    <el-button
      v-show="radioList.length == 0 ? false : true"
      size="mini"
      border
      class="history"
      @click="empty"
      >删除全部历史记录
    </el-button>
    <!-- 招聘新时代 -->
    <div class="recruitment—box" @mouseleave="occlude()">
      <div class="recruitment—left" style="background-color: #f9f9f9">
        <div :class="{ roll: number === 1 }" style="height: 400px">
          <div v-for="(item, index) in jobList" :key="index" class="left">
            <el-row>
              <el-col :span="22">{{ index }}</el-col>
              <el-col :span="2"
                ><i
                  class="el-icon-arrow-right boult"
                  @mouseenter="ascertain(item)"
              /></el-col>
            </el-row>
          </div>
        </div>

        <!-- <div
          v-for="(item, index) in jobList"
          :key="index"
          class="recruitment-left-cont"
          @click="changejob(item, index)"
        >
          <div class="recruitment—title">{{ index }}</div>

          <span
            v-for="(items, index) in item"
            v-show="index < 3"
            :key="index"
            class="recruitment—cents"
            style="width: 20px; background-color: pink"
            >{{ index }}</span
          > -->
        <!-- <i class="el-icon-arrow-right boult" @mouseenter="ascertain(item)" /> -->
        <!-- <i class="el-icon-arrow-right boult" @click="occlude(itemss)" /> -->
        <!-- </div> -->
        <p class="more" @click="more">查看更多</p>
      </div>
      <!-- 弹出层 -->
      <div v-if="disps" class="popping">
        <div
          v-for="(item, index) in secondLevelList"
          :key="index"
          class="popping_cent"
        >
          <div style="font-size: 16px; line-height: 30px; padding-left: 15px">
            {{ index }}
          </div>
          <div style="display: flex; flex-flow: row wrap; font-size: 15px">
            <div
              v-for="(items, index) in item"
              :key="index"
              style="
                color:#999
                line-height: 30px;
                padding: 10px 15px;
              "
            >
              {{ items }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="recruitment—right">
        <div class="block">
          <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
          <el-carousel height="400px">
            <el-carousel-item v-for="item in carousels" :key="item">
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img class="block_img" :src="item" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 精选岗位 -->
    <div class="recommend-box">
      <div class="title">精选职位</div>
      <div class="adorn" />
      <div class="list">
        <Selectposition
          :position-job="pickJob"
          :show="show"
          @changePick="changePick"
        />
      </div>
    </div>
    <!-- 热门职位 -->
    <div class="recommend-box">
      <div class="title">热门职位</div>
      <div class="adorn" />
      <div class="list">
        <Selectposition :position-job="positionJob" @changeHot="changeHot" />
      </div>
    </div>
    <div class="recommend-box">
      <div class="title">热门证书</div>
      <div class="adorn" />
      <div class="list">
        <Carousel :certificate="certificate" />
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="recommend-box">
      <div class="title">合作伙伴</div>
      <div class="adorn" />
      <!-- <div class="subhead">COOPERATIVE&nbsp;PARTNER</div> -->
      <div class="listx">
        <div
          v-for="(items, index) in partnerLogos"
          :key="index"
          class="titlesx"
        >
          <div class="advert">
            <img :src="items.imgs" />
            <p>{{ items.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import recommendList from './recommendList.vue'
import { mapState } from 'vuex'
import Selectposition from './selectPosition.vue'
import { serchs } from '@/api/search'
import Carousel from './carousel.vue'
import { getPosition, getPositionJob, getHandpickJob, getHandpickJobChange, getCertificate, getSerchlist, getSlideshow } from '@/api/position'
import disposeImg from '@/utils/disposeImg'
export default {
  components: { Selectposition, Carousel },
  props: ['item'],
  data () {
    return {
      show: true,
      carousels: JSON.parse(localStorage.getItem('carousels')) || [],
      disps: false,
      // 二级菜单列表
      secondLevelList: {},
      // 选中时的值
      selected: '互联网IT',
      // 岗位分类
      tabPosition: 'left',
      // 搜索框内容s
      searchInput: '',
      // 搜索筛选
      selectOptions: [],
      showPanel: false,
      iconPanel: 'el-icon-caret-bottom',
      flag: 1,
      tip: '',
      list: [],
      radioList: [],
      // "Python", "全栈工程师", "Java", "web前端"
      options: JSON.parse(localStorage.getItem('options')),
      partnerLogos: [
        { imgs: require('../../../assets/hzhb/wps_doc_0.png'), name: 'IBM' },
        { imgs: require('../../../assets/hzhb/wps_doc_1.png'), name: '京东' },
        { imgs: require('../../../assets/hzhb/wps_doc_2.jpg'), name: '字节跳动' },
        { imgs: require('../../../assets/hzhb/wps_doc_3.jpg'), name: '微博集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_4.png'), name: '小米集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_5.png'), name: '百度集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_6.png'), name: '微软集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_7.jpg'), name: '阿里巴巴集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_8.png'), name: '中国银行' },
        { imgs: require('../../../assets/hzhb/wps_doc_9.png'), name: '国家开发银行' },
        { imgs: require('../../../assets/hzhb/wps_doc_10.jpg'), name: '中国工商银行' },
        { imgs: require('../../../assets/hzhb/wps_doc_11.png'), name: '中信证劵' },
        { imgs: require('../../../assets/hzhb/wps_doc_12.jpg'), name: 'DeutscheBank' },
        { imgs: require('../../../assets/hzhb/wps_doc_13.png'), name: '友邦保险' },
        { imgs: require('../../../assets/hzhb/wps_doc_14.png'), name: 'AIIB' },
        { imgs: require('../../../assets/hzhb/wps_doc_15.jpg'), name: '京东金融' },
        { imgs: require('../../../assets/hzhb/wps_doc_16.png'), name: 'Bayer' },
        { imgs: require('../../../assets/hzhb/wps_doc_17.jpg'), name: 'Pfzer' },
        { imgs: require('../../../assets/hzhb/wps_doc_18.jpg'), name: 'NOVARTIS' },
        { imgs: require('../../../assets/hzhb/wps_doc_19.jpg'), name: 'GSK' },
        { imgs: require('../../../assets/hzhb/wps_doc_20.png'), name: '北京同仁堂' },
        { imgs: require('../../../assets/hzhb/wps_doc_21.jpg'), name: '强生' },

        { imgs: require('../../../assets/hzhb/wps_doc_22.jpg'), name: 'Roche' },
        { imgs: require('../../../assets/hzhb/wps_doc_23.jpg'), name: 'Takeda' },
        { imgs: require('../../../assets/hzhb/wps_doc_24.jpg'), name: 'Shell' },
        { imgs: require('../../../assets/hzhb/wps_doc_25.jpg'), name: 'Total' },
        { imgs: require('../../../assets/hzhb/wps_doc_26.jpg'), name: 'ConocoPhillips' },
        { imgs: require('../../../assets/hzhb/wps_doc_27.png'), name: '通用电气公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_28.jpg'), name: '国家电网' },
        { imgs: require('../../../assets/hzhb/wps_doc_29.jpg'), name: '中国石油' },
        { imgs: require('../../../assets/hzhb/wps_doc_30.png'), name: '汉能移动能源控股集团有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_31.jpg'), name: '金风科技' },
        { imgs: require('../../../assets/hzhb/wps_doc_32.png'), name: '梅赛德斯-奔驰' },
        { imgs: require('../../../assets/hzhb/wps_doc_33.png'), name: '宝马' },
        { imgs: require('../../../assets/hzhb/wps_doc_34.jpg'), name: '特斯拉' },
        { imgs: require('../../../assets/hzhb/wps_doc_35.jpg'), name: '奥迪' },
        { imgs: require('../../../assets/hzhb/wps_doc_36.png'), name: '大众汽车' },
        { imgs: require('../../../assets/hzhb/wps_doc_37.png'), name: '吉利汽车集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_38.jpg'), name: '北汽集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_39.jpg'), name: '日本丰田汽车公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_40.png'), name: 'TOSHIBA' },
        { imgs: require('../../../assets/hzhb/wps_doc_41.png'), name: 'ABB集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_42.png'), name: '西门子股份公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_43.jpg'), name: '施耐德电气' },
        { imgs: require('../../../assets/hzhb/wps_doc_44.jpg'), name: '首钢集团有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_45.png'), name: '中国铁路工程集团有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_46.png'), name: '美的集团' },
        { imgs: require('../../../assets/hzhb/wps_doc_47.jpg'), name: '京东方科技集团股份有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_48.jpg'), name: '屈臣氏商标有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_49.jpg'), name: 'MARS' },
        { imgs: require('../../../assets/hzhb/wps_doc_50.jpg'), name: '雀巢公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_51.jpg'), name: '惠氏公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_52.jpg'), name: '华润万家' },
        { imgs: require('../../../assets/hzhb/wps_doc_53.jpg'), name: '中粮集团有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_54.jpg'), name: '国美控股集团有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_55.png'), name: '李宁体育用品有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_56.jpg'), name: 'JLL' },
        { imgs: require('../../../assets/hzhb/wps_doc_57.jpg'), name: 'KPMG' },
        { imgs: require('../../../assets/hzhb/wps_doc_58.jpg'), name: '奥美（集团）有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_59.jpg'), name: '百胜中国控股有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_60.jpg'), name: 'Airbnb' },
        { imgs: require('../../../assets/hzhb/wps_doc_61.jpg'), name: '中国移动通信集团有限公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_62.png'), name: '好未来' },
        { imgs: require('../../../assets/hzhb/wps_doc_63.jpg'), name: '中国电子进出口总公司' },
        { imgs: require('../../../assets/hzhb/wps_doc_64.webp'), name: '中国联合网络通信集团有限公司' }
      ],
      // partnerLogo: []
      // "@/assets/imgs/2.jpeg","@/assets/imgs/3.jpg","@/assets/imgs/4.webp","@/assets/imgs/5.jpg","@/assets/imgs/6.jpg","@/assets/imgs/7.png","@/assets/imgs/8.jpg","@/assets/imgs/9.png","@/assets/imgs/10.webp"
      limit: 6,
      positionJob: JSON.parse(localStorage.getItem('positionjob')) || [],
      offset: 6,
      pickJob: JSON.parse(localStorage.getItem('pickJob')) || [],
      certificate: JSON.parse(localStorage.getItem(' certificate')) || [],
      jobList: JSON.parse(localStorage.getItem('jobObject')) || {},
      jobObject: JSON.parse(localStorage.getItem('jobList')) || {},
      station: {},
      jobStation: [],
      number: 0
    }
  },

  watch: {
    item (item) {
      this.list = item
      item.partner_logo.children.forEach((rs) => {
        console.log('item.partner_logo.root_name', item.partner_logo.root_name)
        console.log('122', rs)

        // this.partnerLogo.push(
        //   this.disposeImg(item.partner_logo.root_name) + rs
        // );
      })
    }
  },
  created () {
    // this.serchlist()
    // this.Carousel();
    this.getJob()
    this.gethandpick()
    this.getcertificateList()
    this.setList()
    this.getSlideshow()
  },
  mounted () {
    // 如果本地存储的数据radioList有值，直接赋值给data中的radioList
    if (JSON.parse(localStorage.getItem('radioList'))) {
      this.radioList = JSON.parse(localStorage.getItem('radioList'))
    }
  },
  methods: {
    // profession (item) {
    //   this.searchInput = item
    // },
    // changeState (item, i) {
    //   console.log('item', item)
    //   this.jobStation = item
    //   this.number = i
    // },
    // changejob (index, i) {
    //   console.log('index', index, i)
    //   var newData = {}
    //   var newDatas = {}
    //   const newKeys = Object.keys(index)
    //   newKeys.map((item, idx) => {
    //     if (idx < 3) {
    //       newData[item] = index[item]
    //     }
    //   })
    //   for (const key in newData) {
    //     const newKey = key.substring(0, 3)
    //     newDatas[newKey] = newData[key]
    //   }
    //   console.log('new', newDatas)
    //   this.station = newDatas
    //   // this.number = i
    // },
    //     amount: 10
    // })
    // 跳转到更多
    more () {
      this.jobList = JSON.parse(localStorage.getItem('jobList'))
      this.number = 1
    },
    // 跳转页面
    skip (e) {
      const datas = {
        inputValue: e.name
      }
      console.log(e)
      this.$router.push({
        path: '/userpost',
        query: datas
      })
    },
    // 关闭二级菜单
    occlude () {
      this.disps = false
    },
    // 打开二级菜单
    ascertain (g) {
      console.log('1', g)
      this.secondLevelList = g
      this.disps = true
    },
    // 搜索
    search () {
      if (this.searchInput == '') {
        // this.$toast("请输入搜索内容");
        // this.$notify({ type: "primary", message: "请输入搜索内容" });
        return false
      } else {
        // 没有搜索记录，把搜索值push进数组首位，存入本地
        if (!this.radioList.includes(this.searchInput)) {
          this.radioList.unshift(this.searchInput)
          localStorage.setItem('radioList', JSON.stringify(this.radioList))
        } else {
          // 有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
          const i = this.radioList.indexOf(this.searchInput)
          this.radioList.splice(i, 1)
          this.radioList.unshift(this.searchInput)
          localStorage.setItem('radioList', JSON.stringify(this.radioList))
        }
        // 跳转到搜索结果页
        this.$router.push({
          path: '/userpost', // home是列表页
          query: {
            inputValue: this.searchInput
          }
        })
      }
    },
    goSearchDetail (title) {
      //  (title);
      this.$router.push({
        path: '/userpost',
        query: {
          inputValue: title
          //   search_val: title,
        }
      })
      this.$router.go(0)
    },

    // 清空历史搜索记录
    empty () {
      var mymessage = confirm('确定全部删除吗')
      if (mymessage == true) {
        localStorage.removeItem('radioList')
        this.radioList = []
      } else {
        return
      }
    },
    // content_click (e) {
    //   this.showPanel = false
    //   console.log('城市', e)
    //   // this.searchInput = e;
    //   this.searchInput = e
    //   // this.searchInput = `${this.selected}/${this.searchInput}`;
    // },
    // Carousel() {
    //   getCarousel().then((res) => {
    //     //  (res.data);
    //
    //   });
    // },
    // 级联面板是否显示
    // serchlist () {
    //   serchs().then((res) => {
    //     console.log('城市', res)
    //     console.log('124', this.trees(res.data.all_pst_classes, 'id', 'parent_id'))
    //     //  (res.data.all_pst_classes);
    //     this.options = this.trees(res.data.all_pst_classes, 'id', 'parent_id')[0].children.slice(0, 9)
    //     localStorage.setItem('options', JSON.stringify(this.options))
    //     console.log('options', this.options)
    //     //  (this.options);
    //   })
    // },

    // 搜索图标
    currentPanel () {
      // const classify = document.getElementsByClassName('classify')[0];
      // console.log(100)
      if (this.flag == 1) {
        this.showPanel = true
        // this.classify.style.display = 'block';
        this.flag = 0
        this.iconPanel = 'el-icon-caret-top'
      } else if (this.flag == 0) {
        this.showPanel = false
        this.flag = 1
        // this.classify.style.display = 'none';
        this.iconPanel = 'el-icon-caret-bottom'
      }
    },
    optionChange (e) {
      this.searchInput = e.join('/')
      if (e.length == 2 && this.flag == 0) {
        this.showPanel = false
        this.flag = 1
        this.iconPanel = 'el-icon-caret-bottom'
      }
    },
    // 热门职位
    async getJob () {
      const { data } = await getPosition(this.limit)
      console.log('121231', data)
      this.positionJob = data.results
      console.log('12123122', this.positionJob)
      localStorage.setItem('positionjob', JSON.stringify(data.results))
    },
    // 热门职位 换一批
    async changeHot (i) {
      const { data } = await getPositionJob(this.limit, this.offset * i)
      console.log('刷新下一页', data.results)
      this.positionJob = data.results
    },
    // 精选职位
    async gethandpick () {
      const { data } = await getHandpickJob(this.limit)
      console.log('精选职位', data.results)
      this.pickJob = data.results
      localStorage.setItem('pickJob', JSON.stringify(data.results))
    },
    // 刷新精选职位
    async changePick (i) {
      const { data } = await getHandpickJobChange(this.limit, this.offset * i)
      console.log('精选职位刷新下一页', data.results)
      this.pickJob = data.results
    },
    // 证书
    async getcertificateList () {
      const { data } = await getCertificate()
      console.log('证书', data)
      const image = data.map(item => this.disposeImg(item.sample))
      console.log('image', image)
      this.certificate = image
      localStorage.setItem('certificate', JSON.stringify(image))
    },
    // 岗位
    async setList () {
      const { data } = await getSerchlist()
      console.log('岗位', data)
      this.jobObject = data
      var newData = {}
      var newDatas = {}
      const newKeys = Object.keys(data)
      newKeys.map((item, idx) => {
        if (idx < 9) {
          newData[item] = data[item]
        }
      })
      for (const key in newData) {
        const newKey = key.substring(0, 8)
        newDatas[newKey] = newData[key]
      }
      console.log('newDatas', newDatas)
      this.jobList = newDatas
      localStorage.setItem('jobList', JSON.stringify(data))
      localStorage.setItem('jobObject', JSON.stringify(newDatas))
    },
    // 轮播图
    async getSlideshow () {
      const { data } = await getSlideshow()
      console.log('轮播图', data)
      const image = data.map(item => this.disposeImg(item))
      this.carousels = image
      console.log('轮播图', this.carousels)
      localStorage.getItem('carousels', JSON.stringify(image))
    },
    add (index) {
      console.log('index', index)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999999;
  // padding-left: 40px;
}
.boxxx {
  // width: 80%;
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  overflow: hidden;
  font-size: 18px;
}
::v-deep .el-input-group__prepend {
  background-color: #fff !important;
  border: none !important;
  color: #222222;
}
::v-deep .el-input-group__append {
  background-color: #fff !important;
  border: none !important;
}
::v-deep .el-input__inner {
  border: none !important;
  -webkit-appearance: none;
  background-color: #ffffff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 100px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
::v-deep .el-input__inner .el-input {
  height: 100px;
}
.el-input-group {
  height: 100px;
  background-color: #fff;
}
.el-cascader-panel .el-cascader-node {
  // display: flex;
  // width: 400px !important;
  // height: auto;
  // flex-wrap: wrap ;

  background-color: #2f2f2f;
}
.el-cascader-panel.is-bordered {
  background-color: #fff;
}
.dashboard-content {
  width: 80%;
  min-width: 800px;
  max-width: 2000px;
  margin: 30px auto;
  background-color: #fffeff;

  .search-box {
    width: 100%;
    margin-bottom: 30px;
    .el-cascader-menu__wrap {
      height: 500px !important;
    }
    .input-with-select .el-input-group__prepend {
      width: 120px;
      height: 100px;
      color: #808080;
    }
    ::v-deep .el-input-group--append .el-input__inner {
      height: 100%;
    }
    .el-input__inner {
      height: 100px;
    }
  }

  .tip-box {
    width: 100%;
    height: auto;
    padding: 20px 0;
    // background-color: #fff;

    .el-radio-button {
      border: #707070 1px solid;
      color: #2f2f2f;
      margin-right: 5px;
    }

    .el-radio-button__inner {
      border: none;
    }

    .elBtn span {
      border-radius: 0;
    }

    .is-active span {
      background-color: #d8f3ff;
      box-sizing: border-box;
    }
  }

  .recommend-box {
    width: 100%;
    height: auto;
    padding: 50px 0;
    min-width: 1200px;
    .title {
      width: 100%;
      text-align: center;
      height: 32px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #141518;
      line-height: 32px;
    }
    .adorn {
      // margin-top: 15px;
      width: 50px;
      height: 4px;
      background: #256efd;
      margin: 15px auto 65px auto;
      // text-align: center;
    }

    .subhead {
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 25px;
      color: #808080;
    }

    .list {
      width: 100%;
      height: 100%;
    }
    .listx {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .titlesx {
        width: 19%;
        height: 130px;
        // overflow: hidden;
        margin-top: 25px;
        .advert {
          margin-top: 33px;
          width: 100%;
          height: 100px;
          // width: 100%;
          // height: auto;
          // border: 1px solid #808080;
          // display: flex;
          // padding: 20px;
          // box-sizing: border-box;
          // justify-content: space-around;
          // flex-wrap: wrap;
          // align-items: stretch;
          // background: #ffffff;

          img {
            // width: 100px;
            // width: 200px;
            height: 80px;
            margin: 0 auto;
            max-width: 200px;
            display: table-cell;
            // text-align: center;
            // text-align: center;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            border-radius: 15px;
            // margin: 0 auto;
            // height: 80px;
            // margin: 30px 0;
          }
          p {
            margin-top: 13px;
            text-align: center;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            // font-weight: 400;
            color: #1e1f20;
          }
        }
      }
    }
  }
  .post {
    background-color: red;
    width: 100%;
    height: 200px;
  }
  .post_left {
    width: 40px;
    height: 100%;
  }

  .el-scrollbar__bar .is-vertical {
    display: none;
  }
}
.classify {
  width: 100%;
  height: 470px;
  background-color: #fff;
  display: flex;
  .classify-job {
    height: 480px;
    width: 16%;
    // background-color: #256efd;
    overflow: auto;
    .job {
      width: 100%;
      height: 40px;
      // background-color: pink;
      text-align: center;

      font-size: 15px;
      line-height: 40px;
    }
  }
  .classify-jobWork {
    height: 480px;
    // width: 160px;
    width: 68%;
    // background-color: #729cf0;
    display: flex;
    // flex-direction: column;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 20px;
    .jobwork {
      // width: 100px;
      // height: 30px;
      padding: 10px;
      // background-color: green;
      font-size: 15px;
      color: #999;
      margin: 10px;
    }
    .work {
      border-right: 1px solid black;
    }
  }
}
.el-tab-pane {
  display: flex;
  flex-wrap: wrap;
}
.classify_content {
  width: 33.33%;
  font-size: 15px;
  margin-top: 11px;
}
.classify_content:hover {
  color: #448ef7;
  cursor: pointer;
}
::v-deep .el-input__inner:hover {
  // border: 1px solid #448EF7;
  border-color: #448ef7 !important;
}
.recruitment—box {
  display: flex;
  // background-color: #239327;
  .recruitment—left {
    width: 350px;
    height: 400px;
    // background-color: #932323;
    // margin-right: 30px;

    .left {
      width: 300px;
      height: 44px;
      // background-color: #233093;
      // text-align: center;
      padding-left: 20px;
      line-height: 44px;
      font-size: 16px;
    }
  }
  .popping {
    width: 900px;
    height: 400px;
    background-color: #f9f9f9;
    overflow: auto;
    // padding: 10px;
    span:hover {
      color: #256efd;
    }
    .popping_cont {
      width: 100px;
      height: 50px;
      background-color: p;
      line-height: 10px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      // margin-bottom: 10px;
    }
  }
  .more {
    margin-left: 22px;
    margin-top: 25px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #256efd;
  }
  .recruitment—right {
    // width: 1000px;
    // width: calc(100% - 570px);
    width: 100%;
    height: 400px;
    margin-left: 35px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .block_img {
    width: 100%;
    height: 100%;
  }
}
::v-deep .el-button--mini {
  margin-bottom: 40px;
}
.popping {
  // background-color: red;
  width: 700px;
  height: 500px;

  .popping_cent {
    // width: 870px;
    // height: 90px;
    // background-color: pink;
    margin-bottom: 10px;
  }
}
.jobbackground {
  background-color: #256efd;
  color: #fff;
}
::v-deep .element.style {
  display: 0;
}
.recruitment {
  display: flex;
}
.roll {
  overflow: auto;
}
</style>

