<template>
  <div class="nav-menu">
    <ul>
      <li
        :class="{ checkedActive: item.id === checkedFlag }"
        v-for="item in menuData"
        :key="item.id"
        @click="chooseItem(item)"
      >
        {{ item.name }}
      <span id="left-border" v-if="item.id === checkedFlag"></span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    // 如果对 对象进行解构的话，需要 将对象转换为  any 类型，否则会出错
    const { ctx } = (getCurrentInstance() as any)
    console.log(ctx, 'ctx')
  
    const menuData = ref([{
      id: 0,
      name: '前提',
      type: 'home'
    },
    {
      id: 1,
      name: 'vue3.0的基础使用',
      type: 'about'
    },
    {
      id: 2,
      name: 'vue3.0源码结构解析',
      type: 'comuse'
    },
    {
      id: 3,
      name: 'vue3.0异步更新原理',
      type: 'alert'
    },
    {
      id: 4,
      name: 'vue3.0自定义渲染器',
      type: 'loading'
    },
    {
      id: 5,
      name: '剖析Vue3.0 diff算法',
      type: 'diff'
    }])

    const checkedFlag = ref(0);
    const paths: any = {
      'home': '/',
      'about': '/about',
      'comuse': '/comuse',
      'diff': '/diff',
    }
    const chooseItem = (item: any) => {
      checkedFlag.value = item.id;
      ctx.$router.push(paths[item.type] ? paths[item.type] : '/')
    }

    return {
      menuData,
      checkedFlag,
      chooseItem
    }
  }
})

</script>

<style lang="scss">
.nav-menu {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  width: 267px;
  overflow-y: scroll;
  border-right: 1px solid #dddddd;
  ul {
    margin: 0;
    padding: 0;
    li {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      position: relative;
      text-align: center;
      font-weight: 600;
      list-style: none;
      #left-border{
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 5px;
        height: 50px;
        background-color: #42b983;
      }
    }
    li:hover {
      color: #42b983;
      cursor: pointer;
    }
    .checkedActive {
      color: #42b983;
      background: #f5f5f5;
    }
  }
}

</style>
