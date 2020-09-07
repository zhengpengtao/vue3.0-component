<template>
  <div class="about">
    <div class="about-content">
      <h2>vue3.0的基础用法：</h2>
      <div class="div-line">
        主要是简单介绍下vue3.0 TypeScript的基础用法，不过多介绍vue3.0的源码
        需要看解析源码的请移步：<a href="https://vue3js.cn/start/"
          >https://vue3js.cn/start/</a
        >
      </div>

      <pre>
        <code v-pre class="language-js">

        </code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, readonly, ref, watch, watchEffect, onMounted, onUpdated, onUnmounted, getCurrentInstance  } from 'vue';

export default defineComponent({
  setup() {

    const count = ref(0)
    const obj = reactive({
      count: 0
    })
    const plusOne = computed({
      get: () => count.value + 1,
      set: (val) => {
        count.value = val - 1
      },
    })
    // readonly 只读
    const original = reactive({
      c: 0
    })
    const copy = readonly(original)

    onMounted(() => {
      console.log('mounted')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })

    watchEffect(() => { // 响应式追踪其依赖，并且依赖变更时重新运行该函数
      // 依赖追踪
      console.log(copy.c)
    })

    // watch  可以监听懒执行的副作用 访问侦听状态变化前后的值
    watch(() => original.c, (c, prevC) => {
      console.log(c, prevC, '.....11')
    })
    // 侦听一个 ref
    watch(() => count, (count, prevCount) => {
      console.log(count, prevCount, '.....22')
    })
    // 监听多个数据
    const a = ref(0)
    const b = ref(2)

    watch([a, b], ([a, b], [aPrev, bPrev]) => {
      console.log(a, b, aPrev, bPrev, 'ppp')
    })

    a.value++
    b.value++
    
    original.c++ 
    count.value++
    // copy.c++  // 只读属性，会被警告

    // 获取当前的组件的实例
    const ctx = getCurrentInstance()
    console.log(ctx, 'ctx') 
    
    return {
      count,
      obj
    }
  }
});
</script>

<style lang="scss">
  .about-content{
    text-align: left;
  }
</style>