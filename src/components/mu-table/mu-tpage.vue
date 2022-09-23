<script>
export default {
  name: "mu-tpage",
  props: {
    prefix: String,
    total: {
      type: [Number, String],
      default: 1
    },
    size: {
      type: [Number, String],
      default: 10
    },
    page: {
      type: [Number, String],
      default: 1
    },
    align: {
      type: String,
      default: 'right'
    },
    change: Function,
  },
  data() {
    return {
      active: this.page
    }
  },
  computed: {
    firstPageClasses() {
      return [
        `${this.prefix}-item`,
        {
          [`${this.prefix}-active`]: this.active === 1
        }
      ];
    },
    lastPageClasses() {
      return [
        `${this.prefix}-item`,
        {
          [`${this.prefix}-active`]: this.active === this.total
        }
      ];
    },
    prevClasses() {
      return [
        `${this.prefix}-prev`,
        {
          [`${this.prefix}-disabled`]: this.active === 1
        }
      ];
    },
    nextClasses() {
      return [
        `${this.prefix}-next`,
        {
          [`${this.prefix}-disabled`]: this.active === this.total
        }
      ];
    },
  },
  methods: {
    prevPage() {
      const active = this.active;
      if (active <= 1) {
        return false;
      }
      this.changePage(active - 1);
    },
    changePage(page) {
      if (this.active != page) {
        this.active = page;
        this.change(page);
      }
    },
    nextPage() {
      const active = this.active;
      if (active >= this.total) {
        return false;
      }
      this.changePage(active + 1);
    },
    fastPrev() {
      const page = this.active - 5;
      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1);
      }
    },
    fastNext() {
      const page = this.active + 5;
      if (page > this.total) {
        this.changePage(this.total);
      } else {
        this.changePage(page);
      }
    },
    keyDown(e) {
      const key = e.keyCode;
      const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 8 || key == 37 || key == 39;
      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp(e) {
      const key = e.keyCode;
      const val = parseInt(e.target.value);
      if (key === 38) {
        this.prev();
      } else if (key === 40) {
        this.next();
      } else if (key == 13) {
        let page = 1;
        if (val > this.total) {
          page = this.total;
        } else if (val <= 0) {
          page = 1;
        } else {
          page = val;
        }
        e.target.value = page;
        this.changePage(page);
      }
    }
  },

};
</script>

<template>
  <ul :class="`${prefix}-box`">
    <li :class="prevClasses" title="上一页" @click="prevPage"></li>
    <li :class="firstPageClasses" @click="changePage(1)">1</li>
    <li :class="[prefix + '-prevs']" v-if="active - 3 > 1" title="上一组" @click="fastPrev">•••</li>
    <li :class="[prefix + '-item']" v-if="active - 2 > 1" @click="changePage(active - 2)">{{active - 2 }}</li>
    <li :class="[prefix + '-item']" v-if="active - 1 > 1" @click="changePage(active - 1)">{{active - 1 }}</li>
    <li :class="[prefix + '-item',prefix + '-active']" v-if="active != 1 && active != total">{{ active }}</li>
    <li :class="[prefix + '-item']" v-if="active + 1 < total" @click="changePage(active + 1)">{{ active + 1 }}</li>
    <li :class="[prefix + '-item']" v-if="active + 2 < total" @click="changePage(active + 2)">{{ active + 2 }}</li>
    <li :class="[prefix + '-nexts']" v-if="active + 3 < total" title="下一组" @click="fastNext">•••</li>
    <li :class="lastPageClasses" v-if="total > 1" @click="changePage(total)">{{ total}}</li>
    <li :class="nextClasses" title="下一页" @click="nextPage"></li>
    <li>前往<input type="number" :value="active" @keydown="keyDown" @keyup="keyUp" @change="keyUp" />页</li>
  </ul>
</template>
