<script>
import MuThead from "./mu-thead.vue";
import MuTbody from "./mu-tbody.vue";
import MufFoot from "./mu-tfoot.vue";
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
    change: Function,
    select: Function,
  },
  data() {
    return {
      prefix: "mu-table",
      left: 0,
      data: this.setData(),
      tableWidth: 1200,
      bodyHeight: 0,
      columnsWidth: {},
    };
  },
  created() {},
  mounted() {
    if (!this.content) this.content = this.$parent;
    console.log(222, this.content.$compile);
  },
  computed: {
    styles() {
      let style = {};
      // if (!!this.height) style.height = `${this.height}px`;
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
      let style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      style.tableLayout = "fixed";
      return style;
    },
    headStyle() {
      let style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      style.left = `${this.left}px`;
      return style;
    },
    bodyStyle() {
      let style = {};
      // if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      if (this.height !== 0) style.height = `${this.height}px`;
      return style;
    },
  },
  watch: {},

  methods: {
    typeOf(obj) {
      const toString = Object.prototype.toString;
      const map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
      };
      return map[toString.call(obj)];
    },
    deepCopy(data) {
      const t = this.typeOf(data);
      let o;
      if (t === "array") {
        o = [];
      } else if (t === "object") {
        o = {};
      } else {
        return data;
      }
      if (t === "array") {
        for (let i = 0; i < data.length; i++) {
          o.push(this.deepCopy(data[i]));
        }
      } else if (t === "object") {
        for (let i in data) {
          o[i] = this.deepCopy(data[i]);
        }
      }
      return o;
    },
    getStyle(element, styleName) {
      if (!element || !styleName) return null;
      styleName = camelCase(styleName);
      if (styleName === "float") {
        styleName = "cssFloat";
      }
      try {
        const computed = document.defaultView.getComputedStyle(element, "");
        return element.style[styleName] || computed
          ? computed[styleName]
          : null;
      } catch (e) {
        return element.style[styleName];
      }
    },
    toggleSelect(index) {
      let data = {};
      for (let i in this.data) {
        if (parseInt(i) === index) data = this.data[i];
      }
      this.data[index]._isChecked = !data._isChecked;
      this.change(this.data[index]);
    },
    selectAll(status) {
      const data = [];
      for (const i in this.data) {
        this.data[i]._isChecked = status;
        data.push(this.data[i]);
      }
      this.select(this.tbody);
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
        data[index] = oRow;
      });
      return data;
    },
  },
  destroyed() {},
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
