<script>
import MuCell from "./mu-cell.vue";
import mixins from "./mixins";
export default {
  mixins: [mixins],
  name: "mu-tbody",
  components: {
    MuCell,
  },
  props: {
    prefix: String,
    colWidth: Object,
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
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
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
  },
  methods: {
    checked(i) {
      return this.data[i] && this.data[i]._isChecked;
    },
  },
};
</script>

<template>
  <table border="0" cellspacing="0" cellpadding="0" :style="style">
    <colgroup>
      <col v-for="(o, i) in thead" :key="i" :width="setCellWidth(o, i)" />
    </colgroup>
    <tbody :class="`${prefix}-tbody`">
      <tr v-for="(row, i) in tbody" :key="i">
        <td
          v-for="(col, j) in thead"
          :key="j"
          :class="col.fixed ? `fixed-${col.fixed}` : ''"
          :style="setCellStyle(thead, col, j)"
        >
          <mu-cell
            :row="row"
            :col="col"
            :key="j"
            :index="i"
            :checked="checked(i)"
          ></mu-cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>
