<template>
  <div class="theme-default-content content__default">
    <div class="home-content">
      <h2>前提：</h2>
      <div class="div-line">
        1、需要懂TypeScript的基础（如：变量，类，修饰器等）
      </div>
      <div class="div-line">2、需了解vue3.0的相关知识</div>
      <div class="div-line">
        更多源码解析：<a href="https://vue3js.cn/start/"
          >https://vue3js.cn/start/</a
        >
        相关源码解析正在进行之中......
      </div>
      <div class="div-line">
        Typtscript官网：<a
          href="https://www.tslang.cn/docs/handbook/basic-types.html"
          >https://www.tslang.cn/docs/handbook/basic-types.html</a
        >
      </div>

      <h2>目的：</h2>
      搭建这个组件库的目的有两个：
      <div class="div-line">
        1、快速学习和上手Vue3.0
      </div>
      <div class="div-line">
        2、了解vue3.0的源码
      </div>
      <div class="div-line">
        3、怎样用Vue3.0快速搭建组件
      </div>
    </div>

    <h2>api集合</h2>
    
    <div class="menu-list div-line">
      <a v-for="item in apiMenu" :key="item.id" :href="item.url" _target="blank" class="sub nomargin" data-v-6ddc40e3="">
        <div class="cover" :style="{ 'background-color': item.bgColor }" data-v-6ddc40e3="">
            {{ item.name }}
        </div> 
        <div class="desc" data-v-6ddc40e3="">{{ item.sub }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';

export default {
  setup() {
    const apiMenu = ref([
      {
        id: 0,
        url: 'http://vue3js.cn/vue-composition-api/',
        name: 'Vue3.0官方文档',
        sub: '国内CDN加速版,暂没找到中文版',
        bgColor: '#9900ff'
      },
      {
        id: 1,
        url: 'https://cn.vuejs.org/',
        name: 'Vue2.0的官方文档',
        sub: '帮助了解相关vue基础',
        bgColor: '#d5a6bd'
      },
      {
        id: 2,
        url: 'https://cli.vuejs.org/zh/guide/',
        name: 'Vue-cli3.0官方文档',
        sub: '了解脚手架相关知识',
        bgColor: '#00ffff'
      },
      {
        id: 3,
        url: 'http://vue3js.cn/vue-composition-api/',
        name: 'Vue3.0 组合式 API',
        sub: '帮助了解组合式api的设计理念和文档',
        bgColor: '#8fdd6b'
      }
    ])
    return {
      apiMenu
    }
  }
}
</script>

<style lang="scss">
.home-content {
  text-align: left;
  a {
    display: inline-block;
    cursor: pointer;
    font-size: 18px;
    color: #42b983;
  }
}
.menu-list{
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  a:hover {
    text-decoration:none;
  }
  .nomargin {
    display: inline-block;
    text-decoration:none;
    flex: 0 0 30%;
    position: relative;
    cursor: pointer;
    margin-right: 2%;
    margin-bottom: 2%;

    .cover {
      position: relative;
      height: 120px;
      background: #fbfbfb;
      border-radius: 5px;
      font-size: 24px;
      text-align: center;
      line-height: 120px;
      color: #fff;
      transition: all .2s ease-in-out;
      font-weight: 600;
    }
    .desc{
      width: 100%;
      color: #333;
      line-height: 28px;
      padding: 5px 8px;
    }
  }
  .menu-list a {
    text-decoration: none;
  }
}
</style>
