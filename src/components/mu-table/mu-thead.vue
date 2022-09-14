<template>
  <table border="0" cellspacing="0" cellpadding="0">
    <colgroup>
      <col width="100" />
      <col v-for="(o, i) in thead" :key="i" :width="100">
    </colgroup>
    <thead :class="`${prefix}-thead`">
      <tr>
        <th v-for="(o, i) in thead" :key="i">
          <div>{{o.title}}</div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import Mixin from './mixin';
export default {
  mixins: [Mixin],
  name: 'mu-thead',
  props: {
    thead: {
      type: Array,
      default: function () {
        return [];
      },
    },
    prefix: Object,
    style: Object,
    fixed: {
      type: [Boolean, String],
      default: false
    },
    columnsWidth: Object,
  },
  mounted() {
    // console.log(setCellWidth(o, i))
  },
  methods: {
    setCellWidth(column, index) {
      let width = '';
      if (column.width) {
        width = column.width;
      } else if (this.columnsWidth[column._index]) {
        width = this.columnsWidth[column._index].width
      }
      return width;
    }
  },
}
</script>

<style>

</style>
