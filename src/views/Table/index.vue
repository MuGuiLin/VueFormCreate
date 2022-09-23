<template>
  <div class="table-demo">
    <div class="native" v-if="0">
      <h1>Native - Table</h1>
      <table>
        <!-- <colgroup>
          <col width="100">
          <col width="200">
          <col width="auto">
        </colgroup> -->
        <thead>
          <tr>
            <th v-for="(o, i) in columns" :key="i">
              <div>{{ o.title }}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, i) in data" :key="i">
            <td v-for="(o, i) in o" :key="i">{{ o }}</td>
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

    <br />
    <!-- <h1>IViewUI - Table</h1> -->
    <Table stripe border :columns="columns" :data="data" height="200"></Table>

    <br />
    <h1>Mu - Table</h1>
    <div>
      <mu-table :thead="columns" :tbody="data" :loading="loading" @change="change" @select="select" total="10"
        @changePage="changePage" height="200"></mu-table>
    </div>

    <br />
    <h1>Hz - Table</h1>
    <hz-table :data="data" height="200">
      <hz-table-item slot="head">
        <hz-table-column width="60" text-align="center" fixed>#</hz-table-column>
        <hz-table-column width="120" fixed border-right="1">姓名</hz-table-column>
        <hz-table-column width="100">年龄</hz-table-column>
        <hz-table-column width="280">地址</hz-table-column>
        <hz-table-column border-right="1">日期</hz-table-column>
        <hz-table-column width="120">操作</hz-table-column>
      </hz-table-item>

      <hz-table-item slot="body" v-for="(item, index) in data" :key="index">
        <hz-table-column class="serialNumber" width="60" text-align="center" fixed>{{ index + 1 }}</hz-table-column>
        <hz-table-column width="120" fixed border-right="1">{{
        item.name
        }}</hz-table-column>
        <hz-table-column width="100" fixed>{{ item.age }}</hz-table-column>

        <hz-table-column width="280" border-right="1">{{
        item.address
        }}</hz-table-column>

        <hz-table-column border-right="1">
          {{ item.date }}
        </hz-table-column>
        <hz-table-column width="120">
          <button @click="detailEvent(item)">详情</button>&nbsp;
          <button @click="editEvent(item)">修改</button>&nbsp;
          <button @click="deleteEvent(item)">删除</button>
        </hz-table-column>
      </hz-table-item>
    </hz-table>
  </div>
</template>

<script>
import MuTable from "@/components/mu-table";
import HzTable from "@/components/hz-table";
import HzTableItem from "@/components/hz-table/hz-table-item";
import HzTableColumn from "@/components/hz-table/hz-table-column";
export default {
  name: "Tables",
  components: {
    MuTable,
    HzTable,
    HzTableItem,
    HzTableColumn,
  },
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
          fixed: "left",
        },
        {
          type: "selection",
          width: 80,
          align: "center",
          fixed: "left",
        },
        {
          title: "姓名",
          width: 100,
          key: "name",
          fixed: "left",
        },
        {
          title: "年龄",
          key: "age",
          sorter: true,
          sortable: true,

        },
        {
          title: "地址",
          key: "address",
        },
        {
          title: "日期",
          key: "date",
          fixed: "right",
          sorter: true,
          sortable: true,
        },
        {
          title: "操作",
          fixed: "right",
          width: 120,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  fontSize: "10px",
                },
              },
              [
                h(
                  "button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                      color: "blue",
                    },
                    on: {
                      click: (e) => {
                        console.log(params, h, e);
                      },
                    },
                  },
                  "编辑"
                ),
                h(
                  "button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                    },
                    style: {
                      color: "green",
                    },
                    on: {
                      click: (e) => {
                        console.log(params, h, e);
                      },
                    },
                  },
                  "详情"
                ),
              ]
            );
          },
        },
      ],

      // h('Icon', {
      //   props: {
      //     type: 'person'
      //   }
      // }),
      // h("strong", params.row.age),

      data: [],
      loading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.data = [{
        name: "John Brown",
        age: 15,
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
      }];
      this.loading = false;
    }, 3000);
  },
  methods: {
    change(val, index) {
      console.log("单选：", val, index);
    },
    select(val) {
      console.log("全选：", val);
    },
    changePage(page) {
      console.log("分页：", page);
    }
  },
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
