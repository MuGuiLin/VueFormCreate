<template>
  <section :class="classs" :style="styles">
    <header :class="`${prefix}-head`">
      <mu-thead :thead="thead" :style="tableStyle" :prefix="prefix"></mu-thead>
    </header>
    <main
      :class="`${prefix}-body`"
      :style="bodyStyle"
      @scroll="handleBodyScroll"
    >
      <mu-tbody
        :thead="thead"
        :tbody="tbody"
        :style="tableStyle"
        :prefix="prefix"
      ></mu-tbody>
    </main>
    <!-- <aside :class="`${prefix}-left`">
      <mu-thead fixed="left" :thead="thead" :style="tableStyle" :prefix="prefix"></mu-thead>
      <div :style="fixedBodyStyle">
        <mu-tbody fixed="left" :tbody="tbody" :style="tableStyle" :prefix="prefix"></mu-tbody>
      </div>
    </aside>
    <aside :class="`${prefix}-right`">
      <mu-thead fixed="right" :thead="thead" :style="tableStyle" :prefix="prefix"></mu-thead>
      <mu-tbody fixed="right" :tbody="tbody" :style="tableStyle" :prefix="prefix"></mu-tbody>
    </aside> -->
    <footer :class="`${prefix}-foot`">
      <MufFoot></MufFoot>
    </footer>
  </section>
</template>

<script>
import MuThead from "./mu-thead.vue";
import MuTbody from "./mu-tbody.vue";
import MufFoot from "./mu-tfoot.vue";
const prefix = "mu-table";
export default {
  name: "mu-table",
  components: {
    MuThead,
    MuTbody,
    MufFoot,
  },
  props: {
    thead: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tbody: {
      type: Array,
      default: function () {
        return [];
      },
    },
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefix,
      tableWidth: 0,
      bodyHeight: 0,
      columnsWidth: {},
    };
  },
  created() {},
  mounted() {},
  computed: {
    styles() {
      let style = {};
      // if (!!this.height) style.height = `${this.height}px`;
      if (!!this.width) style.width = `${this.width}px`;
      return style;
    },
    classs() {
      return [
        `${prefix}`,
        {
          [`${prefix}-border`]: this.border,
          [`${prefix}-stripe`]: this.stripe,
        },
      ];
    },
    tableStyle() {
      let style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      return style;
    },
    bodyStyle() {
      let style = {};
      // if (this.bodyHeight !== 0) style.height = `${this.bodyHeight}px`;
      if (this.height !== 0) style.height = `${this.height}px`;
      return style;
    },
    fixedBodyStyle() {
      let style = {};
      if (this.bodyHeight !== 0) style.height = `${this.bodyHeight - 1}px`;
      return style;
    },
  },
  watch: {},

  methods: {
    handleBodyScroll(event) {
      console.log(event);
      // if (this.showHeader) this.$els.header.scrollLeft = event.target.scrollLeft;
      // if (this.isLeftFixed) this.$els.fixedBody.scrollTop = event.target.scrollTop;
      // if (this.isRightFixed) this.$els.fixedRightBody.scrollTop = event.target.scrollTop;
      // this.hideColumnFilter();
    },
    toggleSelect(_index) {
      let data = {};
      let index = -1;

      for (let i in this.objData) {
        if (parseInt(i) === _index) {
          data = this.objData[i];
          index = i;
        }
      }
      const status = !data._isChecked;

      this.objData[_index]._isChecked = status;

      const selection = this.getSelection();
      if (status) {
        this.$emit(
          "on-select",
          selection,
          JSON.parse(JSON.stringify(this.data[_index]))
        );
      }
      this.$emit("on-selection-change", selection);
    },
    selectAll(status) {
      this.rebuildData.forEach((data) => {
        this.objData[data._index]._isChecked = status;
      });

      const selection = this.getSelection();
      if (status) {
        this.$emit("on-select-all", selection);
      }
      this.$emit("on-selection-change", selection);
    },
  },
  destroyed() {},
};
</script>

<style lang="less">
@import url("./mu-table.less");
</style>
