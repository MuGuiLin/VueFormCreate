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
    tbody: {
      type: Array,
      default: function () {
        return [];
      },
    },
    checked: Boolean,
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
      if (t === this.thead[i]._sortType) {
        t = 0;
      }
      this.$parent.handleSort(i, t);
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
              <input
                type="checkbox"
                class="checkbox"
                :checked="checked"
                @change="change"
              />
            </template>
            <template v-else>
              {{ o.title }}
              <span :class="`${prefix}-sort`" v-if="o.sorter">
                <i
                  :class="`${1 === o._sortType && 'on'}`"
                  @click="sorter(i, 1)"
                ></i>
                <i
                  :class="`${2 === o._sortType && 'on'}`"
                  @click="sorter(i, 2)"
                ></i>
              </span>
            </template>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
