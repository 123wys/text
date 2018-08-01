<template>
  <div>
    hahahah
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../components/common/alertBox/alertBox";
// import { stateList } from "../../../../service/getData";

export default {
  name: "template",
  data() {
    return {};
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
    initPage() {}

    /*     async getStateList() {
      try {
        let data = await stateList();
        if (data.success) {
          
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.$refs.Alert.showError();
      }
    } */
  },

  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>