export default {
  methods: {
    alignCls(column) {
      return [
        {
          [`${this.prefixCls}-column-${column.align}`]: column.align,
          [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
        }
      ]
    },
    isPopperShow(column) {
      return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'));
    },
    setCellWidth(column, index) {
      let width = 'auto';
      if (column.width) {
        width = `${column.width}px`;
      }
      // else if (this.columnsWidth[column._index]) {
      //   width = this.columnsWidth[column._index].width
      // }
      return width;
    },
    setCellStyle(thead, column, index) {
      let style = {};
      if (column.width) {
        style.width = `${column.width}px`;
        if (index && column.fixed) {
          if ('left' === column.fixed) {
            style.left = `${index > 1 ? thead[index - 1].width + (column.width / 2 + 10) : thead[index - 1].width}px`;
            style.zIndex = thead.length - index;
          } else {
            style.zIndex = thead.length - index;
          }
        }
      }
      if (column.fixed || 'index' === column.type || 'selection' === column.type) {
        style.textAlign = `center`;
      }
      return style;
    },
  }
}
