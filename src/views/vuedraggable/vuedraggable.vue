<template>
  <section>
    <Row>
      <Col span="12">
        <h3>Draggable 1</h3>
        <draggable
          class="dragArea list-group"
          :list="list1"
          :clone="clone"
          animation="300"
          :group="{ name: 'people', pull: pullFunction }"
          @start="start"
        >
          <div
            class="list-group-item"
            v-for="element in list1"
            :key="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </Col>
      <Col span="12">
        <h3>Draggable 2</h3>
        <draggable
          class="dragArea list-group"
          animation="300"
          :list="list2"
          group="people"
        >
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </Col>
    </Row>
  </section>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  name: "VueDraggable",
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: "Jesus", id: 1 },
        { name: "Paul", id: 2 },
        { name: "Peter", id: 3 },
      ],
      list2: [
        { name: "Luc", id: 5 },
        { name: "Thomas", id: 6 },
        { name: "John", id: 7 },
      ],
      controlOnStart: true,
    };
  },
  methods: {
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },
  },
};
</script>

<style lang="less">
.list-group-item {
  padding: 10px 0;
  border: 1px solid gray;
}
</style>
