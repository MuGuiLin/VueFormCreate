<template>
  <table border="0" cellspacing="0" cellpadding="0" :style="style">
    <colgroup>
      <col v-for="(o, i) in thead" :key="i" :width="setCellWidth(o, i)" />
    </colgroup>
    <tbody :class="`${prefix}-tbody`">
      <tr v-for="(row, i) in tbody" :key="i">
        <td v-for="(col, j) in thead" :key="j">
          <mu-cell
            :row="row"
            :col="col"
            :key="j"
            :index="i"
            :checked="rowChecked"
          ></mu-cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import MuCell from "./mu-cell.vue";
import mixins from "./mixins";
export default {
  mixins:[mixins],
  name: "mu-tbody",
  components: {
    MuCell,
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
    prefix: String,
    style: {
      type: Object,
      default: function () {
        return {};
      },
    },
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false,
    },
  },
  methods: {
    rowChecked(o, i) {
      console.log(o, i);
    },
  },
};
</script>

<style>
</style>
