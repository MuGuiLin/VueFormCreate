<template>
  <div>
    <template v-if="'index' === col.type">
      {{index + 1}}
    </template>
    <template v-else-if="'selection' === col.type">
      <input type="checkbox" :checked="checked" @change="toggleChange" />
    </template>
    <template v-else>
      {{row[col.key]}}
    </template>
  </div>
</template>

<script>
export default {
  name: 'mu-cell',
  props: {
    row: Object,
    col: Object,
    index: Number,
    checked: Boolean,
  },
  data() {
    return {
      type: ''
    }

  },
  created(){

  },
  methods: {
    toggleChange() {

    }
  }
}
</script>

<style>

</style>
