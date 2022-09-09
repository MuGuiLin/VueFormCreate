<template>
  <Layout class="draggable">
    <Sider hide-trigger>
      <Menu theme="light" width="auto" :accordion="true">
        <MenuGroup title="Draggable">
          <MenuItem name="1" to="/draggable">
          <Icon type="md-document" />
          单列拖拽
          </MenuItem>
          <MenuItem name="2" to="/draggable/many">
          <Icon type="md-chatbubbles" />
          多列拖拽
          </MenuItem>
          <MenuItem name="3" to="/draggable/table">
          <Icon type="ios-cog" />
          表格拖拽
          </MenuItem>
        </MenuGroup>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-paper" />
            内容管理
          </template>
          <MenuItem name="3-1">文章管理</MenuItem>
          <MenuItem name="3-2">评论管理</MenuItem>
          <MenuItem name="3-3">举报管理</MenuItem>
        </Submenu>
        <MenuItem name="4" to="/draggable/table">
        <Icon type="ios-construct" />
        系统设置
        </MenuItem>
        <Submenu name="5">
          <template slot="title">
            <Icon type="ios-people" />
            用户管理
          </template>
          <MenuItem name="5-1">新增用户</MenuItem>
          <MenuItem name="5-2">活跃用户</MenuItem>
        </Submenu>
        <Submenu name="6">
          <template slot="title">
            <Icon type="ios-stats" />
            统计分析
          </template>
          <MenuGroup title="使用">
            <MenuItem name="6-1">新增和启动</MenuItem>
            <MenuItem name="6-2">活跃分析</MenuItem>
            <MenuItem name="6-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="6-4">用户留存</MenuItem>
            <MenuItem name="6-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>
      </Menu>
    </Sider>
    <Content>
      <router-view />
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "Draggable",
};
</script>

<style lang="less" scoped>
.draggable {
  .ivu-layout-content {
    margin: 20px;
    padding: 20px;
    min-height: 77vh;
    text-align: center;
    background: white;
  }
}
</style>
