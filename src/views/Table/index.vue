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
          title: "状态",
          key: "status",
          render: (h, params) => {
            const color = ["#01BB90", "#F35353", "#FF8130", "#0099FF"];
            return h(
              "span",
              { style: { color: color[parseInt(Math.random() * 4)] } },
              params.row.status
            );
          },
        },
        {
          title: "日期",
          key: "date",
          sorter: true,
          sortable: true,
        },
        {
          title: "操作",
          fixed: "right",
          width: 180,
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
                    on: {
                      click: () => {
                        console.log(params);
                      },
                    },
                  },
                  "编辑"
                ),
                h(
                  "button",
                  {
                    class: ["error"],
                    on: {
                      click: () => {
                        console.log(params);
                      },
                    },
                  },
                  "删除"
                ),
                // h(
                //   "button",
                //   {
                //     class: ["success", "large"],
                //     on: {
                //       click: () => {
                //         console.log(params);
                //       },
                //     },
                //   },
                //   "查看"
                // ),
                // h(
                //   "button",
                //   {
                //     class: ["warning", "small"],
                //     style: {
                //       fontSize: "10px",
                //     },
                //     on: {
                //       click: () => {
                //         console.log(params);
                //       },
                //     },
                //   },
                //   "详情"
                // ),
              ]
            );
          },
        },
      ],

      data: [],
      loading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.data = [{
          name: "名字1",
          age: 18,
          address: "居住地址居住地址1",
          status: "成功",
          date: "2022-10-01",
        },
        {
          name: "名字2",
          age: 31,
          address: "居住地址居住地址2",
          status: "异常",
          date: "2022-10-01",
        },
        {
          name: "名字3",
          age: 26,
          address: "居住地址居住地址3",
          status: "失败",
          date: "2022-09-13",
        },
        {
          name: "名字4",
          age: 56,
          address: "居住地址居住地址4",
          status: "警告",
          date: "2022-08-20",
        },
        {
          name: "名字5",
          age: 9,
          address: "居住地址居住地址5",
          status: "警告",
          date: "2022-08-20",
        },
        {
          name: "名字6",
          age: 43,
          address: "居住地址居住地址6",
          status: "警告",
          date: "2022-09-16",
        },];
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
