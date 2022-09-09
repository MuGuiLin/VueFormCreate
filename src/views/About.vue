<template>
  <Layout class="about">
    <Sider hide-trigger>
      <Menu theme="light" width="auto" :accordion="true">
        <MenuItem name="0" to="/create">
        <Icon type="logo-windows" />
        Create 表单设计器
        </MenuItem>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />
            内容管理
          </template>
          <MenuItem name="1-1">文章管理</MenuItem>
          <MenuItem name="1-2">评论管理</MenuItem>
          <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <MenuGroup title="内容管理">
          <MenuItem name="1" to="/qrcode">
          <Icon type="md-qr-scanner" />
          Qrcode
          </MenuItem>
          <MenuItem name="2">
          <Icon type="md-chatbubbles" />
          评论管理
          </MenuItem>
        </MenuGroup>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-people" />
            用户管理
          </template>
          <MenuItem name="2-1">新增用户</MenuItem>
          <MenuItem name="2-2">活跃用户</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            统计分析
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>
      </Menu>
    </Sider>
    <Content class="content">
      <a href="http://v4.iviewui.com" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/imgs/iview.png" width="58%" />
      </a>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      buttonSize: "small",
    };
  },
};
</script>

<style lang="less">
.about {
  .header {
    color: white;
    text-align: center;
  }

  .content {
    text-align: center;
  }

  .footer {
    border-top: 1px solid #515a6e;
    text-align: center;
  }
}
</style>
