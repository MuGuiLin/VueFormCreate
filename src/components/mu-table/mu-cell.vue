<script>
export default {
  name: "mu-cell",
  props: {
    row: Object,
    col: Object,
    index: Number,
    checked: Boolean,
  },
  data() {
    return {
      type: "",
    };
  },
  mounted() {
    this.compile();
  },
  methods: {
    change() {
      this.$parent.$parent.toggleSelect(this.index);
    },
    compile() {
      if (this.col.render) {
        const $parent = this.$parent.$parent;
        console.log(this.col.render(this.row, this.col, this.index));
        const template = this.col.render(this.row, this.col, this.index);

        const cell = document.createElement("div");
        cell.innerHTML = template;
        const _oldParentChildLen = $parent.$children.length;
        $parent.$compile(cell);
        const _newParentChildLen = $parent.$children.length;

        if (_oldParentChildLen !== _newParentChildLen) {
          // if render normal html node, do not tag
          this.uid = $parent.$children[$parent.$children.length - 1]._uid; // tag it, and delete when data or columns update
        }
        this.$el.innerHTML = "";

        this.$el.appendChild(cell);
      }
    },
  },
};
</script>

<template>
  <div>
    <template v-if="'index' === col.type">
      {{ index + 1 }}
    </template>
    <template v-else-if="'selection' === col.type">
      <input type="checkbox" :checked="checked" @change="change" />
    </template>
    <template v-else>
      {{ row[col.key] }}
    </template>
  </div>
</template>

