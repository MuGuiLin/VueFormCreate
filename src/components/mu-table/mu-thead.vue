<script>
import Mixins from "./mixins";
export default {
  mixins: [Mixins],
  name: "mu-thead",
  props: {
    prefix: String,
    thead: {
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
      if (this.columns[index]._sortType === type) {
        type = "normal";
      }
      this.$parent.handleSort(index, type);
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
                <i :class="{ on: o._sortType === 1 }" @click="sorter(i, 1)"
                  >▲</i
                >
                <i :class="{ on: o._sortType === 0 }" @click="sorter(i, 0)"
                  >▼</i
                >
              </span>
            </template>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
