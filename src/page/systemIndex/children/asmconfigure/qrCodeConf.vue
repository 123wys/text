<template>
  <div class="wrapper">
    <div class="codeBox">
      <h1 class="tit">{{ tit }}</h1>
      <img :src="codeSrc" alt="">
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import { qrCreate } from "../../../..//service/getData";
export default {
  name: "qrCodeConf",
  data() {
    return {
      codeSrc: "",
      tit: ""
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]) //获取全局appSource os
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      Object.assign(this.$data, this.$options.data()); //初始化data
      this.initPage();
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.initPage();
    });
  },

  methods: {
    initPage() {
      this.getQrCreate();
    },
    async getQrCreate() {
      try {
        this.tit = "二维码加载中...";
        let data = await qrCreate({
          channelName: this.appSource
        });
        if (data.success) {
          this.tit = "扫描二维码";
          let url =
            "/asm/xflow_qr_code/qr_create.json?domain=" +
            window.location.origin;
          url += "&channelName=" + this.appSource;
          this.codeSrc = url;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取二维码失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.$refs.Alert.showError();
      }
    },
  },

  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  min-height: 900px;
  background: #fff;
}

.codeBox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20vh;
}

.tit {
  height: 48px;
  width: 100%;
  line-height: 48px;
  text-align: center;
  color: #666666;
  font-size: 14px;
}
</style>