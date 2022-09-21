<script>
import MuRender from "./mu-render";
export default {
  name: "mu-cells",
  components: { MuRender },
  props: {
    row: Object,
    col: Object,
    index: Number,
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      type: "",
      content: this.$parent.$parent.content,
    };
  },
  mounted() {
    // this.compile();
  },
  methods: {
    change() {
      this.$parent.$parent.toggleSelect(this.index);
    },
    compile() {
      if (this.col.render) {
        const $parent = this.content;
        const template = this.col.render(this.row, this.col, this.index);
        const cell = document.createElement("div");
        cell.innerHTML = template;
        const _oldParentChildLen = $parent.$children.length;
        $parent.$compile(cell);
        const _newParentChildLen = $parent.$children.length;
        if (_oldParentChildLen !== _newParentChildLen) {
          this.uid = $parent.$children[$parent.$children.length - 1]._uid;
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
    <mu-render
      v-else-if="col.render"
      :row="row"
      :column="col"
      :index="index"
      :render="col.render"
    ></mu-render>
    <template v-else>
      {{ row[col.key] }}
    </template>
  </div>
</template>

