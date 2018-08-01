<template>
  <div>
    <sys-header></sys-header>
  </div>
</template>
<script type="text/ecmascript-6">
import sysHeader from "../../components/sysHeader/sysHeader";

export default {
  name: "systemIndex",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {},
  components: {
    sysHeader
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../style/mixin";
</style>
