<template>
  <table border="0" cellspacing="0" cellpadding="0">
    <colgroup>
      <col v-for="(o, i) in thead" :key="i" :width="setCellWidth(o, i)" />
    </colgroup>
    <thead :class="`${prefix}-thead`">
      <tr>
        <th v-for="(o, i) in thead" :key="i">
          <div>
            <template v-if="'index' === o.type">{{ o.title || "#" }}</template>
            <template v-else-if="'selection' === o.type">
              <input type="checkbox" :checked="checked" @change="allChange" />
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

<script>
import Mixins from "./mixins";
export default {
  mixins: [Mixins],
  name: "mu-thead",
  props: {
    thead: {
      type: Array,
      default: function () {
        return [];
      },
    },
    prefix: String,
    style: {
      type: Object,
      default: function () {
        return {};
      },
    },
    fixed: {
      type: [Boolean, String],
      default: false,
    },
    columnsWidth: Object,
  },
  mounted() {},
  methods: {
    allChange(e) {
      this.$parent.selectAll(e.target.checked);
    },
  },
};
</script>

<style>
</style>
