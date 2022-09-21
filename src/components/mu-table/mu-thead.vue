<script>
import { column } from "./mu-public";
export default {
  name: "mu-thead",
  mixins: [column],
  props: {
    prefix: String,
    thead: {
      type: Array,
      default: function () {
        return [];
      },
    },
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    fixed: {
      type: [Boolean, String],
      default: false,
    },
    columnsWidth: Object,
  },
  methods: {
    change(e) {
      this.$parent.selectAll(e.target.checked);
    },
    sorter(i, t) {
      if (this.data[i]._sortType === t) {
        t = "";
      }
      this.$parent.handleSort(i, t);
    },
    sort(i) {
      console.log(11111111111, this.data[i]);
      let on = "";
      if (1 === this.data[i]._sortType) {
        on = "on-1";
      } else if (2 === this.data[i]._sortType) {
        on = "on-2";
      }
      return on;
    },
  },
};
</script>

<template>
  <table border="0" cellspacing="0" cellpadding="0">
    <colgroup>
      <col v-for="(o, i) in thead" :key="i" :width="setCellWidth(o, i)" />
    </colgroup>
    <thead :class="`${prefix}-thead`">
      <tr>
        <th
          v-for="(o, i) in thead"
          :key="i"
          :class="o.fixed ? `fixed-${o.fixed}` : ''"
          :style="setCellStyle(thead, o, i)"
        >
          <div>
            <template v-if="'index' === o.type">{{
              o.title || "序号"
            }}</template>
            <template v-else-if="'selection' === o.type">
              <input type="checkbox" :checked="checked" @change="change" />
            </template>
            <template v-else>
              {{ o.title }}
              <span :class="`${prefix}-sort`" v-if="o.sorter">
                <i :class="sort(i)" @click="sorter(i, 1)"></i>
                <i :class="sort(i)" @click="sorter(i, 2)"></i>
              </span>
            </template>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
