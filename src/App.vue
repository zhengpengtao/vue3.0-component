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
body,
// h1,
// h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
pre {
  margin: 16px 0;
  padding: 16px;
  background-color: #f7f7f7;
  overflow: auto;
}
small {
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  padding: 10px 15px;
  overflow-y: auto;
}
.div-line {
  margin: 10px 0;
}
</style>
