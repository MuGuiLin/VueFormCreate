<template>
  <Layout>
    <section class="mu-form-create">
      <menu class="mu-form-ctrl">
        <div class="ctrl-group" v-for="(o, i) in dragModel" :key="i">
          <h4 class="ctrl-title">{{ o.name }}</h4>
          <draggable
            v-model="o.ctrl"
            v-bind="{
              sort: false,
              group: { name: 'drag-drap', pull: 'clone', put: false },
            }"
            animation="300"
            dragClass="drag-class"
            ghostClass="ghost-class"
            chosenClass="chosen-class"
          >
            <transition-group tag="ul">
              <li class="ctrl-item" v-for="(o, i) in o.ctrl" :key="i + i">
                <Icon class="icon" :type="o.icon" />
                <span class="name">{{ o.title }}</span>
              </li>
            </transition-group>
          </draggable>
        </div>
      </menu>

      <main class="mu-form-main">
        <div class="main-head">
          <Button
            shape="circle"
            ghost
            size="small"
            type="success"
            icon="md-eye"
            @click="viewForm()"
            >预览表单</Button
          >
          <Button
            shape="circle"
            ghost
            size="small"
            type="info"
            icon="logo-nodejs"
            @click="createJson()"
            >生成JSON</Button
          >
          <Button
            shape="circle"
            ghost
            size="small"
            type="error"
            icon="md-trash"
            @click="clearForm()"
            >清空表单</Button
          >
        </div>
        <div class="main-body">
          <section class="body-drap-box">
            <Form
              class="body-drap-form"
              :class="{ 'void-form': !drapModel.length }"
            >
              <draggable
                v-model="drapModel"
                group="drag-drap"
                animation="300"
                dragClass="drag-class"
                ghostClass="ghost-class"
                chosenClass="chosen-class"
                :move="drapMove"
                @start="onStart"
                @end="onEnd"
                @add="drapAdd"
              >
                <transition-group class="transition-group" tag="section">
                  <div
                    class="form-drap-item"
                    v-for="(o, i) in drapModel"
                    :key="o.key + i"
                    :class="{
                      'form-drap-active':
                        drapActive && drapActive.key === o.key,
                    }"
                    @mousedown.stop="activeCommand(i)"
                  >
                    <!-- {{ o.title }} -->
                    <!-- 输入框 -->

                    <FormItem
                      :label="o.title"
                      v-if="'input' === o.type"
                      :key="o.key"
                    >
                      <Input
                        :type="o.props.type || 'text'"
                        v-model="o.value"
                        :placeholder="o.props.placeholder"
                      />
                    </FormItem>
                    <div class="ivu-form-ctrl">
                      <Button
                        size="small"
                        type="success"
                        icon="md-copy"
                        @click="copyCommand(i)"
                      ></Button>
                      <Button
                        size="small"
                        type="warning"
                        icon="md-trash"
                        @click="removeCommand(i)"
                      ></Button>
                    </div>

                    <!-- 文本域 -->
                    <!-- <div
                      v-if="'input' === o.type && 'textarea' === o.props.type"
                      :key="o.key"
                      :class="{
                        'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
                      <FormItem :label="o.title">
                        <Input
                          type="textarea"
                          v-model="o.props.value"
                          :rows="4"
                          :placeholder="o.props.placeholder"
                        />
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div> -->

                    <!-- 单选框 -->
                    <div v-if="'radio' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <RadioGroup v-model="o.value">
                          <Radio
                            v-for="o in o.options"
                            :key="o.value"
                            :label="o.value"
                            :disabled="o.disabled || false"
                            >{{ o.label }}</Radio
                          >
                        </RadioGroup>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 复选框 -->
                    <div v-if="'checkbox' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <CheckboxGroup v-model="o.value">
                          <Checkbox
                            v-for="o in o.options"
                            :key="o.value"
                            :label="o.value"
                            :disabled="o.disabled || false"
                            >{{ o.label }}</Checkbox
                          >
                        </CheckboxGroup>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 下拉框 -->
                    <div v-if="'select' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <Select v-model="o.value">
                          <Option
                            v-for="o in o.options"
                            :value="o.value"
                            :key="o.value"
                            >{{ o.label }}</Option
                          >
                        </Select>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 开关 -->
                    <div v-if="'switch' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <Switch v-model="o.value" size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                        </Switch>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 滑块 -->
                    <div v-if="'slider' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <Slider v-model="o.value"></Slider>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 日期 -->
                    <div v-if="'datepicker' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <DatePicker
                          type="date"
                          v-model="o.value"
                          :placeholder="o.props.placeholder"
                        ></DatePicker>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 时间 -->
                    <div v-if="'timepicker' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <TimePicker
                          type="time"
                          v-model="o.value"
                          :placeholder="o.props.placeholder"
                        ></TimePicker>
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>

                    <!-- 评分 -->
                    <div v-if="'rate' === o.type" :key="o.key">
                      <FormItem :label="o.title">
                        <Rate v-model="o.value" />
                      </FormItem>
                      <div class="ivu-form-ctrl">
                        <Button
                          size="small"
                          type="success"
                          icon="md-copy"
                          @click="copyCommand(i)"
                        ></Button>
                        <Button
                          size="small"
                          type="warning"
                          icon="md-trash"
                          @click="removeCommand(i)"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </Form>
          </section>
        </div>
      </main>

      <aside class="mu-form-attr">
        <aside class="attr">
          <Tabs size="small">
            <TabPane label="属性配置" icon="md-options">
              <div class="attr-setup">
                <Form>
                  <Divider orientation="left">基本属性</Divider>
                  <FormItem label="ID">
                    <Input type="text" v-model="drapActive.key" disabled />
                  </FormItem>
                  <FormItem label="标题">
                    <Input type="text" v-model="drapActive.title" />
                  </FormItem>
                  <FormItem label="值">
                    <Input type="text" v-model="drapActive.value" />
                  </FormItem>
                  <FormItem label="占位符" v-if="drapActive.props">
                    <Input type="text" v-model="drapActive.props.placeholder" />
                  </FormItem>
                  <Divider orientation="left">专有属性</Divider>
                </Form>
              </div>
            </TabPane>
            <TabPane label="组件配置" icon="md-settings">组件配置</TabPane>
            <TabPane label="表单配置" icon="ios-construct">表单配置</TabPane>
          </Tabs>
        </aside>
      </aside>
    </section>

    <Modal
      v-model="showView"
      footer-hide
      width="680"
      :lock-scroll="true"
      title="表单生成预览"
    >
      <form-create
        v-model="viewModel.model"
        :rule="viewModel.rule"
        :option="viewModel.option"
      ></form-create>
    </Modal>

    <Modal
      v-model="showJson"
      fullscreen
      title="表单配置JSON数据"
      okText="下载JSON"
    >
      <div class="monaco-editor" id="monacoEditor" ref="monacoEditor">
        <!-- {{ drapModel }} -->
      </div>
    </Modal>
  </Layout>
</template>

<script>
import draggable from "vuedraggable";

// import * as monaco from "monaco-editor";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

import { dragFlue } from "./drag.config.js";
export default {
  name: "VueFromCreate",
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      showView: false,
      showJson: false,

      //定义要被拖拽对象的数组
      dragModel: dragFlue,

      // 生成的drap
      drapModel: [],

      // 选中的drap
      drapActive: {
        props: {},
      },

      // 预览表单
      viewModel: {
        model: {},
        rule: [],
        option: {
          resetBtn: false,
          form: {
            inline: false,
            labelPosition: "left",
            labelWidth: 60,
            showMessage: true,
            autocomplete: "off",
            size: undefined,
          },
          onSubmit: (formData) => {
            alert("获取表单中的数据：" + JSON.stringify(formData));
            console.log("获取表单中的数据：", formData);
            // this.viewModel.model.btn.loading();
            // this.viewModel.model.resetBtn.disabled();
            // this.viewModel.model.btn.finish();
          },
        },
      },

      monacoEditor: "",
    };
  },
  mounted() {
    this.monacoEditor = monaco.editor.create(this.$refs["monacoEditor"], {
      value: "", //编辑器初始显示文字
      // language: "javascript", //语言支持自行查阅demo
      language: "json", //语言支持自行查阅demo
      theme: "vs-dark", //官方自带三种主题vs, hc-black, or vs-dark
      fontSize: 16, //字体大小
      automaticLayout: true, //自动布局
      readOnly: false, // 不能编辑
      lineHeight: 24,  // 行高
      // fontFamily: 'Microsoft YaHei', //字体
      selectOnLineNumbers: true, //显示行号
    });
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },

    // 添加控件
    drapAdd(e) {
      console.log("add---------", e);
      const newIndex = e.newIndex;
      const local = this.drapModel[newIndex];
      this.$set(this.drapModel, newIndex, {
        ...local,
        key: `${local.type}_${new Date().getTime()}`,
        field: `${local.field}_${new Date().getTime()}`,
      });
      // if ("clone" === e.pullMode) {
      //   this.$set(this.drapModel, newIndex, {
      //     ...this.outil.agn(this.drapModel[newIndex]),
      //   });
      // }
      this.activeCommand(e.newIndex);
    },

    drapMove(e) {
      console.log("表单元素移动中...", e);
      // 目标是容器不可拖入
      if (undefined != e.relatedContext.element) {
        if (e.relatedContext.element.type === "container") return false;

        // 布局容器不允许容器停靠
        if (e.draggedContext.element.type === "container") return false;
      }
      // 容器之间不能同级拖入
      // this.element = e.draggedContext.element;

      // if (
      //   e.draggedContext.element.type === "container" &&
      //   e.relatedContext.element
      // ) {
      //   return false;
      // }
      // // 其他组件不能与容器同级拖入
      // if (e.relatedContext.list) {
      //   return (
      //     !e.relatedContext.list.filter((item) => item.type === "container")
      //       .length > 0
      //   );
      // }
    },

    // 选中控件
    activeCommand(i) {
      this.active_index = i;
      this.setupForm = this.drapModel[i];
      this.drapActive = this.drapModel[i];
    },

    // 复制控件
    copyCommand(i) {
      this.drapModel.splice(i, 0, this.outil.agn(this.drapModel[i]));
    },

    // 删除控件
    removeCommand(i) {
      this.drapModel.splice(i, 1);
    },

    // 预览表单
    viewForm() {
      if (this.drapModel.length) {
        this.viewModel.rule = [];
        this.showView = true;
        setTimeout(() => {
          this.viewModel.rule = this.drapModel;
        }, 60);
      } else {
        this.$Message.warning("对不起：没有可预览的表单！");
      }
    },

    // 生成JSON
    createJson() {
      if (this.drapModel.length) {
        this.showJson = true;
        this.monacoEditor.setValue(
          `{ "fromData": ${JSON.stringify(this.drapModel)} }`
        );
        // 自动换行
        this.monacoEditor.updateOptions({
          wordWrap: "on",
          wordWrap: "bounded",
          wordWrapColumn: 80,
           wrappingStrategy: 'advanced', // 'simple';
          wrappingIndent: "deepIndent",
          scrollbar: {
            horizontalHasArrows: false,
            horizontal: "hidden",
          },
          mouseWheelZoom: true,
        });
        this.monacoEditor.getAction(['editor.action.formatDocument'])._run();
        // 取消自动换行
        // this.monacoEditor.updateOptions({ wordWrap: "off" });
      } else {
        this.$Message.warning("对不起：没有可生成的表单！");
        this.monacoEditor.dispose();
      }
    },

    // 清空表单
    clearForm() {
      this.$Modal.confirm({
        title: "操作提示：",
        content: "亲：表单清空后将无法恢复，您确定要清空吗？",
        okText: "我确定",
        cancelText: "再想想",
        onOk: () => {
          this.drapModel = [];
          this.drapActive = { props: {} };
        },
      });
    },
  },
};
</script>

<style lang="less">
.mu-form-create {
  display: flex;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid #ebeef5;
  text-align: left;
  min-height: 90vh;
  .mu-form-ctrl {
    width: 250px;
    min-width: 250px;
    border-right: 1px solid #dcdee2;
    .ctrl-group {
      padding: 5px;
      padding-left: 6px;
      user-select: none;
      .ctrl-title {
        padding: 15px 10px 5px;
      }
      .ctrl-item {
        display: inline-block;
        box-sizing: border-box;
        margin: 5px;
        padding: 2px 10px;
        width: 108px;
        font-size: 13px;
        text-align: center;
        cursor: move;
        border: 1px dashed #666;
        color: #666;
        .icon {
          font-size: 18px;
        }
        .name {
          display: block;
        }
      }
      .ctrl-item:hover {
        border: 1px dashed white;
        background: #2d8cf0;
        color: white;
      }
    }
  }
  .mu-form-main {
    flex: auto;
    display: flex;
    flex-direction: column;
    min-width: 350px;
    user-select: none;
    .main-head {
      padding: 12px;
      height: 50px;
      button {
        margin-right: 12px;
        span {
          margin: 0;
        }
      }
    }

    .main-body {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      .body-drap-box {
        position: absolute;
        top: 15px;
        right: 15px;
        bottom: 15px;
        left: 15px;
        padding: 15px;
        background: white;
        outline: 2px dashed #95a3b7;
        overflow: auto;
        .body-drap-form {
          box-sizing: border-box;
          display: block;
          height: 100%;
          > div,
          .transition-group {
            height: 90%;
          }
        }
        .void-form::before {
          content: "请从左侧拖入表单控件！";
          position: absolute;
          left: 0;
          top: 40%;
          width: 100%;
          text-align: center;
          font-size: 24px;
          color: #dcdee2;
        }
        .form-drap-item {
          position: relative;
          display: block;

          .ivu-form-item {
            display: block;
            margin: 6px 0;
            padding: 6px;
            border: 2px dashed transparent;
            outline: 1px dashed transparent;
          }
          .ivu-form-ctrl {
            display: none;
            position: absolute;
            top: 2px;
            right: 4px;
          }
        }
        .form-drap-item:active {
          cursor: move;
        }
        .form-drap-active {
          .ivu-form-item {
            border-color: #2d8cf0;
            outline-color: #2d8cf0;
          }
          .ivu-form-ctrl {
            display: block;
            button.ivu-btn {
              opacity: 0.5;
              margin: 4px;
              line-height: 0;
              text-align: center;
              font-size: 16px;
            }
            button.ivu-btn:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .mu-form-attr {
    width: 300px;
    min-width: 300px;
    background: white;
    border-left: 1px solid #dcdee2;
    .ivu-tabs {
      .ivu-tabs-bar {
        .ivu-tabs-nav {
          .ivu-tabs-tab {
            padding: 16px;
            .ivu-icon {
              font-size: 16px;
              margin-right: 0;
            }
          }
        }
      }
      .ivu-tabs-content {
        .attr-setup {
          padding: 12px;
          .ivu-form-item {
            margin-bottom: 6px;
          }
        }
      }
    }
  }
}

.ghost-class,
.chosen-class {
  position: relative;
  min-height: 6px;
  font-size: 0;
  color: white;
  opacity: 1 !important;
  background-color: #2d8cf0 !important;
  .ivu-form-item-label {
    color: white;
  }
}

// .ghost-class::before {
//   content: "";
//   position: absolute;
//   top: -6px;
//   left: -2px;
//   width: 0;
//   height: 0;
//   border-top: 8px solid transparent;
//   border-left: 18px solid #2d8cf0;
//   border-bottom: 8px solid transparent;
// }
// .ghost-class::after {
//   content: "";
//   position: absolute;
//   top: -6px;
//   right: -2px;
//   width: 0;
//   height: 0;
//   border-top: 8px solid transparent;
//   border-right: 18px solid #2d8cf0;
//   border-bottom: 8px solid transparent;
// }

.drag-class {
  background-color: blueviolet !important;
  // background-color: #2d8cf0 !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.monaco-editor {
  padding: 10px;
  height: 100%;
  font-size: 15px;
  color: white;
}
</style>
