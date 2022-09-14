<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
      </tfoot>
    </table>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>

// import Table from '@/components/smt-table/table/index.js';
// import TableColumn from '@/components/smt-table/table-column/index.js';

// const install = function (Vue) {
//   if (install.installed) return;
//   Vue.component(Table.name, Table);
//   Vue.component(TableColumn.name, TableColumn);
// };

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// };

export default {
  name: "Table",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
};
</script>

<style lang="less">
table {
  margin: auto;
  border: 2px solid gray;

  th,
  td {
    padding: 30px;
    border: 1px solid gray;
  }
}
</style>
