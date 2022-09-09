<template>
  <section>
    <nav class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create">Create</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/table">Table</router-link> |
      <router-link to="/qrcode">Qrcode</router-link> |
      <router-link to="/draggable">Draggable</router-link>
    </nav>

    <Layout class="layout">
      <Header class="header">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem name="1" to="/">
          <Icon type="ios-home" />
          Home
          </MenuItem>
          <MenuItem name="2" to="/form">
          <Icon type="ios-paper" />
          Form
          </MenuItem>
          <MenuItem name="3" to="/table">
          <Icon type="md-grid" />
          Table
          </MenuItem>
          <MenuItem name="4" to="/qrcode">
          <Icon type="md-qr-scanner" />
          Qrcode
          </MenuItem>
          <MenuItem name="5" to="/draggable">
          <Icon type="md-move" />
          Draggable
          </MenuItem>
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
      </Header>
      <router-view />
      <Footer class="footer">
        <a href="http://v4.iviewui.com" target="_blank" rel="noopener noreferrer">iView UI组件库</a>
      </Footer>
    </Layout>
  </section>
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
nav.nav {
  padding: 30px;
  text-align: center;

  a {
    padding: 20px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.layout {
  .header {
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover,
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active,
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
      color: #42b983;
    }
  }

  .content {
    margin: 20px;
    background: white;
    text-align: center;
  }

  .footer {
    border-top: 1px solid #afb1b6;
    text-align: center;
  }
}
</style>
