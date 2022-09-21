export default {
  name: 'mu-render',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, o) => {
    const p = {
      row: o.props.row,
      index: o.props.index
    };
    if (o.props.column) p.column = o.props.column;
    return o.props.render(h, p);
  }
};
