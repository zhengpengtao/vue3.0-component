<template>
  <div class="pt-header">
    <img id="logo" src="../assets/logo.png" alt="">
    <span>PT UI（基于Vue3.0 typescript 的组件库）</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style lang="scss">
.pt-header {
  position: absolute;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 18px;
  background: #336633;
  color: #fff;
  img{
    display: inline-block;
    width: 40px;
    height: 40px;
    float: left;
    margin-top: 5px;
  }
  span {
    font-weight: 600;
  }
}
</style>
