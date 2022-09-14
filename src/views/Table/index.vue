<template>
  <div class="table-demo">
    <div class="native" v-if="0">
      <h1> Native - Table</h1>
      <table>
        <!-- <colgroup>
          <col width="100">
          <col width="200">
          <col width="auto">
        </colgroup> -->
        <thead>
          <tr>
            <th v-for="(o, i) in columns" :key="i">
              <div>{{o.title}}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, i) in data" :key="i">
            <td v-for="(o, i) in o" :key="i">{{o}}</td>
          </tr>
        </tbody>
        <!-- <tfoot>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tfoot> -->
      </table>
    </div>

    <br>
    <h1> IViewUI - Table</h1>
    <Table stripe border :columns="columns" :data="data" height="200"></Table>

    <br>
    <h1></h1>
    <mu-table :thead="columns" :tbody="data" height="200"></mu-table>

  </div>
</template>

<script>
import MuTable from '@/components/mu-table'
export default {
  name: "Tables",
  components: {
    MuTable,
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left",
        },
        {
          title: "Name",
          key: "name",
          width: 100,
          fixed: "left",
        },
        {
          title: "Age",
          key: "age",
          sortable: true,
        },
        {
          title: "Address",
          key: "address",
        },
        {
          title: "Date",
          key: "date",
          sortable: true,
        },
        {
          title: "Action",
          key: "action",
          fixed: "right",
          width: 120,
          render: (h, params) => {
            return h('div', [
              // h('Icon', {
              //   props: {
              //     type: 'person'
              //   }
              // }),
              h('strong', params.row.age),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params, h);
                  }
                }
              }, '编辑'),
            ]);
          }
        },
      ],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
    }
  }
};
</script>

<style lang="less">
.table-demo {
  margin: 50px;
}

.native {
  table {
    margin: auto;
    width: 100%;
    border: 1px solid gray;

    th,
    td {
      padding: 30px;
      border: 1px solid gray;
    }
  }
}
</style>
