<template>
  <div id="app">
    <div id="header-wrap">
      <Header />
    </div>
    <div id="nav-menu">
      <NavMenu />
    </div>
    <div id="pt-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
import NavMenu from "@/components/NavMenu.vue";

export default {
  components: {
    Header,
    NavMenu
  }
}
</script>
<style lang="scss">
@import url('./style/base.scss');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  // padding: 30px;
  // a {
  //   font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
}

#header-wrap {
}

#pt-content {
  position: absolute;
  position: absolute;
  top: 50px;
  left: 267px;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 0px;
  overflow-y: auto;
}
.div-line {
  margin: 10px 0;
}

</style>
