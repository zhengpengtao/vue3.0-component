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
import { defineComponent, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  setup() {
    // const { ctx } = getCurrentInstance()
    // console.log(ctx.$router, 'ctx')

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
      name: '组件的使用',
      type: 'comuse'
    },
    {
      id: 3,
      name: 'alert',
      type: 'alert'
    },
    {
      id: 4,
      name: 'loading',
      type: 'loading'
    },
    {
      id: 5,
      name: 'message',
      type: 'message'
    }])
    
    const checkedFlag = ref(0);
    const paths: any = {
      'home': '/',
      'about': '/about',
      'comuse': '/comuse',
    }
    const chooseItem = (item: any) => {
      checkedFlag.value = item.id;
      // ctx.$router.push(paths[item.type] ? paths[item.type] : '/')
      
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
}
ul {
  li {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    position: relative;
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
</style>
