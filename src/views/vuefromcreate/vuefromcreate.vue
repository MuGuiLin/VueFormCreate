<template>
  <Layout>
    <Header>Header</Header>

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
        <div class="main-head">工作区</div>
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
                    class="drap-itme"
                    v-for="(o, i) in drapModel"
                    :key="o.key + i"
                  >
                    <!-- {{ o.title }} -->
                    <!-- 输入框 -->
                    <div
                      v-if="'input' === o.type"
                      :key="o.key"
                      :class="{ 'form-drap-active':
                          drapActive && drapActive.key === o.key,
                      }"
                      @click.stop="activeCommand(i)"
                    >
                      <FormItem :label="o.title">
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
        <h3 class="title">属性配置</h3>
        <aside class="attr">
          <code>
            <!-- {{ drapActive }} -->
            {{ drapModel }}
          </code>
        </aside>
      </aside>
    </section>

    <Footer>Footer</Footer>
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

      //定义要被拖拽对象的数组
      dragModel: dragFlue,

      // 生成的drap
      drapModel: [],

      // 选中的drap
      drapActive: {},
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
  },
};
</script>

<style lang="less">
.mu-form-create {
  display: flex;
  box-sizing: border-box;
  background-color: white;
  .mu-form-ctrl {
    width: 250px;
    min-width: 250px;
    text-align: left;
    border-right: 1px solid #dcdee2;
    .ctrl-group {
      padding: 5px;
      padding-left: 6px;
      .ctrl-title {
        padding: 20px 10px 0px;
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
    // align-items: center;
    min-width: 350px;
    user-select: none;
    .main-head {
      height: 60px;
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

        .form-drap-active{
          position: relative;
        }
      }
    }
  }
  .mu-form-attr {
    width: 300px;
    min-width: 300px;
    background: white;
    border-left: 1px solid #dcdee2;
  }
}
.ghostClass {
  background-color: blue !important;
}
.chosenClass {
  background-color: #2d8cf0 !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.vue-fromc-reate {
  display: flex;
  height: 80vh;
  border: 1px solid #dcdee2;

  .menu {
    width: 300px;
    min-width: 300px;
    border-right: 1px solid #dcdee2;
    // background-color: #24292e;
    .form-ctrl-h3 {
      padding: 20px 10px 0px;
      text-align: left;
    }

    .drag-item {
      display: inline-block;
      margin: 10px;
      padding: 10px;
      width: 129px;
      font-size: 15px;
      text-align: left;
      cursor: move;
      border: 1px dashed #2d8cf0;
      background: white;
      color: #2d8cf0;
      .ivu-icon {
        font-size: 20px;
      }
    }
  }

  .main {
    flex: 1;
    height: 100%;
    background-color: #fafafa;
    /*空白时显示拖拽提示*/
    .ivu-form {
      position: relative;
      box-sizing: border-box;
      padding: 10px;
      min-height: calc(100% - 20px);
      background-color: white;
      border: 3px dashed #95a3b7;
      > div {
        min-height: calc(100%);
        overflow-y: auto;
        .ivu-form-item {
          display: block;
          margin: 10px 6px;
          padding: 5px;
          text-align: left;
          outline: 1px dashed #95a3b7;
        }
        .ivu-form-ctrl {
          display: none;
          position: absolute;
          right: 8px;
          bottom: 0;
        }

        .form-drap-active {
          position: relative;
          .ivu-form-item {
            outline: 2px solid #2d8cf0;
            // border: 1px solid #2d8cf0;
          }
          .ivu-form-ctrl {
            display: block;
            button.ivu-btn {
              opacity: 0.5;
              margin: 5px;
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
    .void-form::before {
      content: "请拖入表单控件！";
      position: absolute;
      left: 0;
      top: 40%;
      width: 100%;
      text-align: center;
      font-size: 24px;
      color: #dcdee2;
    }
  }

  .attr {
    width: 300px;
    min-width: 300px;
    max-height: 100%;
    overflow: auto;
    border-left: 1px solid #dcdee2;
  }
}
</style>
