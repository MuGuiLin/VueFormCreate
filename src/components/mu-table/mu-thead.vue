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
    style: Object,
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
  },
};
</script>

<template>
  <table border="0" cellspacing="0" cellpadding="0" :style="style">
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
            </template>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
