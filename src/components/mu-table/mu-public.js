import { setTimeout } from "core-js";

const CHARS_REGEXP = /([\:\-\_]+(.))/g;
const HACKS_REGEXP = /^moz([A-Z])/;

export const column = {
  methods: {
    alignCls(column, row = {}) {
      let cellClassName = '';
      if (row.cellClassName && column.key && row.cellClassName[column.key]) {
        cellClassName = row.cellClassName[column.key];
      }
      return [
        {
          [`${cellClassName}`]: cellClassName,    // cell className
          [`${column.className}`]: column.className,    // column className
          [`${this.prefixCls}-column-${column.align}`]: column.align,
          [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
        }
      ];
    },
    isPopperShow(column) {
      return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'));
    },
    setCellWidth(column, index) {

      let width = '';
      if (column.width) {
        width = column.width;
      }else if (this.columnsWidth && this.columnsWidth[column._index]) {
        width = this.columnsWidth[column._index].width;
      }
      // if (this.head.length === index + 1 && top && this.$parent.bodyHeight !== 0) {
      //   width += this.$parent.scrollBarWidth;
      // }
      // if (this.fixed === 'right') {
      //   const firstFixedIndex = this.columns.findIndex((col) => col.fixed === 'right');
      //   if (firstFixedIndex === index) width += this.$parent.scrollBarWidth;
      // }
      if (width === '0') width = '';
      return width;

    },
    setCellStyle(thead, column, index) {
      let style = {};
      if (column.width) {
        style.width = `${column.width}px`;
        if (column.fixed) {
          if (index) {
            if ('left' === column.fixed) {
              style.left = `${index > 1 ? thead[index - 1].width + (column.width / 2 + 10) : thead[index - 1].width}px`;
              style.zIndex = thead.length - index;
            }
          }
        }
      }
      return style;
    },
  }
};

export const assist = {
  methods: {
    typeOf(obj) {
      const toString = Object.prototype.toString;
      const map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
      };
      return map[toString.call(obj)];
    },
    deepCopy(data) {
      const t = this.typeOf(data);
      let o;
      if (t === "array") {
        o = [];
      } else if (t === "object") {
        o = {};
      } else {
        return data;
      }
      if (t === "array") {
        for (let i = 0; i < data.length; i++) {
          o.push(this.deepCopy(data[i]));
        }
      } else if (t === "object") {
        for (let i in data) {
          o[i] = this.deepCopy(data[i]);
        }
      }
      return o;
    },
    camelCase(name) {
      return name
        .replace(CHARS_REGEXP, function (_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        })
        .replace(HACKS_REGEXP, "Moz$1");
    },
    getStyle(element, styleName) {
      if (!element || !styleName) return null;
      styleName = this.camelCase(styleName);
      if (styleName === "float") {
        styleName = "cssFloat";
      }
      try {
        const computed = document.defaultView.getComputedStyle(element, "");
        return element.style[styleName] || computed
          ? computed[styleName]
          : null;
      } catch (e) {
        return element.style[styleName];
      }
    },
  }
};
