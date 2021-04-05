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
            dragClass="dragClass"
            ghostClass="ghostClass"
            chosenClass="chosenClass"
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
          <Button shape="circle" ghost size="small" type="success" icon="md-eye"
            >表单预览</Button
          >
          <Button
            shape="circle"
            ghost
            size="small"
            type="info"
            icon="logo-nodejs"
            @click="showJson = true"
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
            <Form :class="{ 'void-form': !drapModel.length }">
              <draggable
                v-model="drapModel"
                group="drag-drap"
                animation="300"
                dragClass="dragClass"
                ghostClass="ghostClass"
                chosenClass="chosenClass"
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

                    <!-- 日期 -->
                    <div
                      v-if="'DatePicker' === o.type"
                      :key="o.key"
                      :class="{
                        'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
                      <FormItem :label="o.title">
                        <DatePicker
                          type="date"
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

                    <!-- 单选框 -->
                    <div
                      v-if="'radio' === o.type"
                      :key="o.key"
                      :class="{
                        'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
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
                    <div
                      v-if="'checkbox' === o.type"
                      :key="o.key"
                      :class="{
                        'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
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

                    <!-- 开关 -->
                    <div
                      v-if="'switch' === o.type"
                      :key="o.key"
                      :class="{
                        'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
                      <FormItem :label="o.title">
                        <Switch v-model="o.value" size="large" />
                        <Switch size="large" style="width: 200px">
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

                    <!-- 下拉框 -->
                    <div
                      v-if="'select' === o.type"
                      :key="o.key"
                      :class="{
                        'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
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
                  <FormItem label="控件key">
                    <Input type="text" v-model="drapActive.key" disabled />
                  </FormItem>
                  <FormItem label="控件标题">
                    <Input type="text" v-model="drapActive.title" />
                  </FormItem>
                  <FormItem label="控件内容">
                    <Input type="text" v-model="drapActive.value" />
                  </FormItem>
                  <FormItem label="控件提示">
                    <Input type="text" v-model="drapActive.props.placeholder" />
                  </FormItem>
                </Form>
              </div>
            </TabPane>
            <TabPane label="组件配置" icon="md-settings">组件配置</TabPane>
            <TabPane label="表单配置" icon="ios-construct">表单配置</TabPane>
          </Tabs>
        </aside>
      </aside>
    </section>

    <Modal v-model="showJson" fullscreen title="表单配置JSON数据">
      <code>
        {{ drapModel }}
      </code>
    </Modal>
  </Layout>
</template>

<script>
import draggable from "vuedraggable";
import { dragFlue } from "./drag.config.js";
export default {
  name: "VueFromCreate",
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      showJson: false,

      //定义要被拖拽对象的数组
      dragModel: dragFlue,

      // 生成的drap
      drapModel: [],

      // 选中的drap
      drapActive: {
        props:{}
      },
    };
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
      });
      // if ("clone" === e.pullMode) {
      //   this.$set(this.drapModel, newIndex, {
      //     ...this.outil.agn(this.drapModel[newIndex]),
      //   });
      // }
      // this.drapActive = this.drapModel[newIndex];
      //  this.setupForm = this.drapModel[newIndex];

      this.activeCommand(e.newIndex);
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

    clearForm() {
      this.$Modal.confirm({
        title: "操作提示：",
        content: "亲：表单清空后将无法恢复，您确定要清空吗？",
        okText: "我确定",
        cancelText: "再想想",
        onOk: () => {
          this.drapModel = [];
          this.drapActive = { props:{} };
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
            // outline: 1px dashed #95a3b7;
          }
          .ivu-form-ctrl {
            display: none;
            position: absolute;
            top: 2px;
            right: 4px;
          }
        }
        .form-drap-active {
          .ivu-form-item {
            border: 2px dashed #2d8cf0;
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

.ghostClass,
.chosenClass {
  background-color: #2d8cf0 !important;
  opacity: 1 !important;
  font-size: 0;
  color: white;
  border: 1px solid #2d8cf0;
  min-height: 5px;
  .ivu-form-item-label {
    color: white;
  }
}

.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
</style>
