<script>
import MuThead from "./mu-thead.vue";
import MuTbody from "./mu-tbody.vue";
import MufFoot from "./mu-tfoot.vue";
import { assist } from "./mu-public";

export default {
  name: "mu-table",
  mixins: [assist],
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
    change: Function,
    select: Function,
    content: {
      type: Object,
    },
  },
  data() {
    return {
      prefix: "mu-table",
      left: 0,
      data: this.setData(),
      tableWidth: 0,
      columnsWidth: {},
    };
  },
  computed() {
    if (!this.content) this.content = this.$parent;
  },
  mounted() {
    // this.winResize();
    // window.addEventListener("resize", this.winResize, false);
    if (!this.content) this.content = this.$parent;
  },
  computed: {
    styles() {
      const style = {};
      if (!!this.width) style.width = `${this.width}px`;
      return style;
    },
    classs() {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-border`]: this.border,
          [`${this.prefix}-stripe`]: this.stripe,
        },
      ];
    },
    tableStyle() {
      const style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      return style;
    },
    headStyle() {
      const style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      style.left = `${this.left}px`;
      return style;
    },
    bodyStyle() {
      const style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      if (this.height !== 0) style.height = `${this.height}px`;
      return style;
    },
  },
  watch: {},
  methods: {
    toggleSelect(index) {
      let data = {};
      for (let i in this.data) {
        if (parseInt(i) === index) data = this.data[i];
      }
      this.data[index]._isChecked = !data._isChecked;
      this.change(data, index);
    },
    selectAll(status) {
      const data = [];
      for (const i in this.data) {
        this.data[i]._isChecked = status;
        data.push(this.data[i]);
      }
      this.select(status ? this.tbody : []);
    },
    handleSort(index, type) {
      let data = {};
      for (let i in this.data) {
        if (parseInt(i) === index) this.data[i]._sortType = 1;
      }
      this.data[index]._isChecked = type;
    },
    bodyScroll(event) {
      // if (this.showHeader) this.$els.header.scrollLeft = event.target.scrollLeft;
      // if (this.isLeftFixed) this.$els.fixedBody.scrollTop = event.target.scrollTop;
      // if (this.isRightFixed) this.$els.fixedRightBody.scrollTop = event.target.scrollTop;
      this.left = -event.target.scrollLeft;
    },
    setData() {
      let data = {};
      this.tbody.forEach((row, index) => {
        const oRow = this.deepCopy(row);
        oRow._isChecked = false;
        oRow._sortType = 1;
        data[index] = oRow;
      });
      return data;
    },
    winResize() {
      this.$nextTick(() => {
        const allWidth = !this.thead.some((cell) => !cell.width);

        if (allWidth) {
          this.tableWidth = this.thead
            .map((cell) => cell.width)
            .reduce((a, b) => a + b);
        } else {
          this.tableWidth = parseInt(this.getStyle(this.$el, "width")) - 1;
        }
        console.log(111, this.tableWidth);

        this.columnsWidth = {};
        // this.$nextTick(() => {
        //   let columnsWidth = {};
        //   let autoWidthIndex = -1;
        //   if (allWidth)
        //     autoWidthIndex = this.cloneColumns.findIndex((cell) => !cell.width); //todo 这行可能有问题

        //   if (this.data.length) {
        //     const $td = this.$refs.tbody.$el
        //       .querySelectorAll("tbody tr")[0]
        //       .querySelectorAll("td");
        //     for (let i = 0; i < $td.length; i++) {
        //       // can not use forEach in Firefox
        //       const column = this.cloneColumns[i];

        //       let width = parseInt(this.getStyle($td[i], "width"));
        //       if (i === autoWidthIndex) {
        //         width = parseInt(this.getStyle($td[i], "width")) - 1;
        //       }
        //       if (column.width) width = column.width;

        //       this.cloneColumns[i]._width = width;

        //       columnsWidth[column._index] = {
        //         width: width,
        //       };
        //     }
        //     this.columnsWidth = columnsWidth;
        //   }
        // });
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.winResize, false);
  },
};
</script>

<template>
  <section :class="classs" :style="styles">
    <header :class="`${prefix}-head`">
      <mu-thead
        :prefix="prefix"
        :data="data"
        :thead="thead"
        :style="headStyle"
        class="mu-thead"
      ></mu-thead>
    </header>
    <main :class="`${prefix}-body`" :style="bodyStyle" @scroll="bodyScroll">
      <mu-tbody
        :ref="tbody"
        :prefix="prefix"
        :data="data"
        :thead="thead"
        :tbody="tbody"
        :style="tableStyle"
      ></mu-tbody>
    </main>
    <footer :class="`${prefix}-foot`">
      <MufFoot></MufFoot>
    </footer>
  </section>
</template>

<!-- <style lang="less" scoped> -->
<style lang="less">
@import url("./mu-style.less");
</style>
