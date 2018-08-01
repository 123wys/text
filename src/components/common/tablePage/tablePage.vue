<template>
  <div>
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column v-for="item in titles" :prop="item.tdKey" :label="item.name" min-width="180" show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <div class="botBar clearfix">
      <div class="fl">
        <select class="selectPageSize" v-model="limit" v-on:change="changePageSize">
          <option v-for="item in limitList" v-bind:value="item">{{ item }}</option>
        </select>
        <input autocomplete="off" placeholder="请选择" size="" readonly="readonly" type="text" rows="2" class="el-input__inner">
        <span class="totalPage">{{ pages }}</span>
      </div>
      <div class="fr">
        <ul class="mo-paging">
          <!-- prev -->
          <li v-bind:class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]" v-on:click="prev">&lt;</li>

          <li v-bind:class="['paging-item', {'paging-item--current' : index === pager},{'paging-item--more' : !+pager }]" v-for="pager in pagers" v-on:click="go(pager)">{{ pager }}</li>

          <!-- next -->
          <li v-bind:class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" v-on:click="next">&gt;</li>
        </ul>
      </div>
    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import fetch from "../../../config/fetch";
import alertBox from "../../../components/common/alertBox/alertBox";

export default {
  name: "tablePage",
  props: {
    titles: {
      //每一列标题
      type: Array,
      default() {
        return [];
      }
    },

    tdKey: {
      //数据所用字段
      type: Array,
      default() {
        return [];
      }
    },

    tableData: {
      //表格所需数据
      type: Array,
      default() {
        return [];
      }
    },

    params: {
      //请求接口参数
      type: Object,
      default() {
        return {};
      }
    },

    //激活页码 左右两侧页码个数
    pagesDistance: {
      type: Number,
      default: 2
    },

    //每页显示条数列表
    pagesLimitList: {
      type: Array,
      default() {
        return [10, 20, 50];
      }
    }
  },
  data() {
    return {
      index: 1, //当前页码
      limit: 10, //每页显示条数
      limitList: this.pagesLimitList, //每页显示条数列表
      total: 1 //总记录数
    };
  },
  computed: {
    //计算总页码
    pages() {
      return Math.ceil(this.total / this.limit);
    },

    //计算页码
    pagers() {
      const array = [];
      const pagesDistance = this.pagesDistance;
      const pageCount = this.pages;
      const current = this.index;

      const offset = {
        start: current - pagesDistance,
        end: current + pagesDistance
      };

      //-1, 3
      if (offset.start < 1) {
        offset.start = 1;
        offset.end = 1 + pagesDistance * 2;
      }
      if (offset.end > pageCount) {
        offset.end = pageCount;
        offset.start = pageCount - pagesDistance * 2;
      }
      if (offset.start < 1) offset.start = 1;

      for (let i = offset.start; i <= offset.end; i++) {
        if (i == offset.end && offset.end < pageCount) {
          array.push("...");
          array.push(pageCount);
        } else if (i == offset.start && offset.start > 1) {
          array.push(1);
          array.push("...");
        } else {
          array.push(i);
        }
      }

      return array;
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.getData();
    });
  },
  methods: {
    async getData() {
      try {
        let data = await this.fetchFunc(this.params);
        if (!data.success) {
          this.tableData = data.rows;
          this.total = data.total;
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
    },
    changePageSize() {},
    prev() {
      if (this.index > 1) {
        this.go(this.index - 1);
      }
    },
    next() {
      if (this.index < this.pages) {
        this.go(this.index + 1);
      }
    },
    go(page) {
      if (page == "...") return;
      if (this.index !== page) {
        this.index = page;
        //父组件通过change方法来接受当前的页码
        this.$emit("change", this.index);
      }
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.botBar {
  padding: 12px 0;
  line-height: 28px;
  background: #ffffff;
  text-align: center;

  .selectPageSize {
    height: 28px;
    border: 1px solid #d3dce6;
    border-radius: 2px;
  }
  .totalPage {
    height: 28px;
  }
  .mo-paging {
    display: block;
    padding: 0;
    font-size: 0;
    list-style: none;
    user-select: none;
    > .paging-item {
      display: block;
      float: left;
      width: 28px;
      height: 28px;
      text-decoration: none;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-left: -1px;
      cursor: pointer;
      font-family: HelveticaNeue;
      font-size: 13px;
      color: #475669;
      letter-spacing: 0;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        background-color: #f0f0f0;
      }
      &.paging-item--disabled,
      &.paging-item--more {
        background-color: #fff;
        color: #505050;
      }
      //禁用
      &.paging-item--disabled {
        cursor: not-allowed;
        opacity: 0.75;
      }
      &.paging-item--more,
      &.paging-item--current {
        cursor: default;
      }
      //选中
      &.paging-item--current {
        background-color: #5693fb;
        color: #fff;
        position: relative;
        z-index: 1;
        border-color: #5693fb;
      }
    }
  }
}
</style>
