<template>
  <div>
    <!-- <div class="dashboard-box">
      <post-info v-for="(item, index) in list" :key="index" />
    </div> -->
    <div class="company-box">
      <!-- 企业基本信息 -->
      <company-info />
      <!-- 公司福利 -->
      <company-welfare />
      <!-- 企业联系方式 -->
      <company-contact />
      <!-- 企业形象 -->
      <company-logo />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import postInfo from './components/postInfo'
import companyInfo from './components/companyInfo'
import companyWelfare from './components/companyWelfare'
import companyContact from './components/companyContact'
import companyLogo from './components/companyLogo'

export default {
  // name: 'DashboardAdmin',
  components: {
    postInfo,
    companyInfo,
    companyWelfare,
    companyContact,
    companyLogo
  },
  data () {
    return {
      list: [{}]
    }
  },
  computed: {
    // ...mapGetters(['navbar'])
  },
  mounted () {
    /* axios.post('www.znzz.tech.com/login/',{
      Authorization:'Bearer fCLUxFpxP3QqVAezWSiqJ34BRz5YTp2qDGmH5L5jiv7IuTjnVwU1hMxIMAIJawrflqc5wVPaXrdXfeQ9Q5JYj+41bXu+df0UMV1CLmxuaarOocx6s8cS/5jaKY05hwMG'
    }).then(rs=>{
      console.log(rs);
    }) */
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dashboard-box {
  width: 86%;
  // min-width: 1280px;
  height: auto;
  //border-bottom: 1px solid #cecece;
  border-left: 1px solid #cecece;
  margin: 20px auto;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.company-box {
  width: 60%;
  min-width: 900px;
  margin: 20px auto;
  height: auto;
  border: 1px solid #cecece;
  margin: 20px auto;
  border-radius: 10px;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
