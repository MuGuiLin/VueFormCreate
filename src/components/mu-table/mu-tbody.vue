<template>
  <table border="0" cellspacing="0" cellpadding="0" :style="style">
    <tbody :class="`${prefix}-tbody`">
      <tr v-for="(o, i) in tbody" :key="i">
        <td>
          <div><input type="checkbox"></div>
        </td>
        <td v-for="(o, i) in o" :key="i">
          <div>
            {{o}}
          </div>
        </td>
        <td>
          <div><button>编辑</button></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'mu-tbody',
  props: {
    tbody: {
      type: Array,
      default: function () {
        return [];
      },
      columnsWidth: Object,
    },
    prefix: Object,
    style: Object,
    fixed: {
      type: [Boolean, String],
      default: false
    }
  },
}
</script>

<style>

</style>
