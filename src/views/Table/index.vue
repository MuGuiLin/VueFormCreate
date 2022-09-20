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
    <h1>IViewUI - Table</h1>
    <Table
      stripe
      border
      :columns="columns"
      :data="data"
      width="800"
      height="200"
    ></Table>

    <br />
    <h1>Mu - Table</h1>
    <mu-table
      :thead="columns"
      :tbody="data"
      height="200"
      :change="change"
      :select="select"
    ></mu-table>

    <br />
    <h1>Hz - Table</h1>
    <hz-table :data="data" height="200">
      <hz-table-item slot="head">
        <hz-table-column width="40" text-align="center" fixed
          >#</hz-table-column
        >
        <hz-table-column width="80" fixed border-right="1"
          >标准1</hz-table-column
        >
        <hz-table-column width="100">标准2</hz-table-column>
        <hz-table-column width="80">标准3</hz-table-column>

        <hz-table-column width="100" border-right="1">标准4</hz-table-column>
        <hz-table-column width="165" border-right="1">标准5</hz-table-column>
        <hz-table-column border-right="1">标准6</hz-table-column>
        <hz-table-column border-right="1" width="196">标准7</hz-table-column>
        <hz-table-column width="180">标准8</hz-table-column>
        <hz-table-column border-right="1">标准9</hz-table-column>
      </hz-table-item>

      <hz-table-item slot="body" v-for="(item, index) in data" :key="index">
        <hz-table-column
          class="serialNumber"
          width="40"
          text-align="center"
          fixed
          >{{ index + 1 }}</hz-table-column
        >
        <hz-table-column width="80" fixed border-right="1">{{
          item.name
        }}</hz-table-column>
        <hz-table-column width="100" fixed>{{ item.age }}</hz-table-column>
        <hz-table-column width="80" class="overflowHiddenEllipsis">
          {{ item.date }}
        </hz-table-column>

        <hz-table-column width="100" border-right="1">{{
          item.address
        }}</hz-table-column>
        <hz-table-column width="165" border-right="1">
          {{ item.date }}
        </hz-table-column>
        <hz-table-column border-right="1">
          {{ item.date }}
        </hz-table-column>
        <hz-table-column border-right="1" width="196">
          {{ item.date }}
        </hz-table-column>
        <hz-table-column width="180">
          <button @click="detailEvent(item)">详情</button>
          <button @click="editEvent(item)">修改</button>
          <button @click="deleteEvent(item)">删除</button>
        </hz-table-column>
        <hz-table-column border-right="1">
          {{ item.date }}
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
            console.log("render-->", h(), params);
            return h("div", [
              // h('Icon', {
              //   props: {
              //     type: 'person'
              //   }
              // }),
              // h("strong", params.row.age),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      console.log(params, h);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
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
    };
  },
  methods: {
    change(val) {
      console.log("单选：", val);
    },
    select(val) {
      console.log("全选：", val);
    },
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
