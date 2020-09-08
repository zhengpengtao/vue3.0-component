<template>
  <div id="vue3-code">
    <div class="theme-default-content content__default">
   <h1 id="vue3-0源码结构分析"><a href="vue3-0源码结构分析" aria-hidden="true" class="header-anchor"></a> Vue3.0源码结构分析</h1> 
   <h2 id="vue2与vue3的对比"><a href="vue2与vue3的对比" aria-hidden="true" class="header-anchor"></a> Vue2与Vue3的对比</h2> 
   <ul>
    <li>对TypeScript支持不友好（所有属性都放在了this对象上，难以推倒组件的数据类型）</li> 
    <li>大量的API挂载在Vue对象的原型上，难以实现TreeShaking。</li> 
    <li>架构层面对跨平台dom渲染开发支持不友好</li> 
    <li>CompositionAPI。受ReactHook启发</li> 
    <li>对虚拟DOM进行了重写、对模板的编译进行了优化操作...</li>
   </ul> 
   <h2 id="一-monorepo介绍"><a href="#一-monorepo介绍" aria-hidden="true" class="header-anchor"></a> 一.monorepo介绍</h2> 
   <p>monorepo是一种将多个package放在一个repo中的代码管理模式</p> 
   <p>Vue3中 使用 <code>yarn workspace + lerna</code> 来管理项目</p> 
   <div class="language-json line-numbers-mode">
    <pre class="language-json"><code><span class="token property">&quot;workspaces&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;packages/*&quot;</span>
<span class="token punctuation">]</span>
</code></pre> 
<div class="line-numbers-wrapper">
     <span class="line-number">1</span>
     <br />
     <span class="line-number">2</span>
     <br />
     <span class="line-number">3</span>
     <br />
    </div>
   </div>
   <blockquote>
    <p>通过 <code>workspaces</code> 来指定需要管理的模块</p>
   </blockquote> 
   <h2 id="二-lerna介绍"><a href="#二-lerna介绍" aria-hidden="true" class="header-anchor"></a> 二.lerna介绍</h2> 
   <p>lerna是在js项目中用来管理多个package的工具</p> 
   <ul>
    <li>全局安装</li>
   </ul> 
   <div class="language-bash line-numbers-mode">
    <pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> lerna -g
lerna init
</code></pre>
<div class="line-numbers-wrapper">
     <span class="line-number">1</span>
     <br />
     <span class="line-number">2</span>
     <br />
    </div> 
   </div>
   <ul>
    <li>常用命令</li>
   </ul> 
   <div class="language-bash line-numbers-mode">
    <pre class="language-bash"><code>lerna bootstrap <span class="token comment">安装依赖生成软链</span>
lerna <span class="token function">ls</span> <span class="token comment">查看所有包</span>
lerna publish <span class="token comment">发布包</span>
</code></pre>
<div class="line-numbers-wrapper">
     <span class="line-number">1</span>
     <br />
     <span class="line-number">2</span>
     <br />
     <span class="line-number">3</span>
     <br />
    </div> 
   </div>
   <h2 id="三-项目结构"><a href="#三-项目结构" aria-hidden="true" class="header-anchor"></a> 三.项目结构</h2> 
   <ul>
    <li>reactivity:响应式系统</li> 
    <li>runtime-core:与平台无关的运行时核心 (可以创建针对特定平台的运行时 - 自定义渲染器)</li> 
    <li>runtime-dom: 针对浏览器的运行时。包括DOM API，属性，事件处理等</li> 
    <li>runtime-test:用于测试</li> 
    <li>server-renderer:用于服务器端渲染</li> 
    <li>compiler-core:与平台无关的编译器核心</li> 
    <li>compiler-dom: 针对浏览器的编译模块</li> 
    <li>compiler-ssr: 针对服务端渲染的编译模块</li> 
    <li>template-explorer：用于调试编译器输出的开发工具</li> 
    <li>shared：多个包之间共享的内容</li> 
    <li>vue:完整版本,包括运行时和编译器</li>
   </ul> 
   <div class="language-md line-numbers-mode">
    <pre class="language-md"><code>                                    +---------------------+
                                    |                     |
                                    |  @vue/compiler-sfc  |
                                    |                     |
                                    +-----+--------+------+
                                          |        |
                                          v        v
                      +---------------------+    +----------------------+
                      |                     |    |                      |
        +------------&gt;|  @vue/compiler-dom  +---&gt;|  @vue/compiler-core  |
        |             |                     |    |                      |
   +----+----+        +---------------------+    +----------------------+
   |         |
   |   vue   |
   |         |
   +----+----+        +---------------------+    +----------------------+    +-------------------+
        |             |                     |    |                      |    |                   |
        +------------&gt;|  @vue/runtime-dom   +---&gt;|  @vue/runtime-core   +---&gt;|  @vue/reactivity  |
                      |                     |    |                      |    |                   |
                      +---------------------+    +----------------------+    +-------------------+
</code></pre> 
    <div class="line-numbers-wrapper">
     <span class="line-number">1</span>
     <br />
     <span class="line-number">2</span>
     <br />
     <span class="line-number">3</span>
     <br />
     <span class="line-number">4</span>
     <br />
     <span class="line-number">5</span>
     <br />
     <span class="line-number">6</span>
     <br />
     <span class="line-number">7</span>
     <br />
     <span class="line-number">8</span>
     <br />
     <span class="line-number">9</span>
     <br />
     <span class="line-number">10</span>
     <br />
     <span class="line-number">11</span>
     <br />
     <span class="line-number">12</span>
     <br />
     <span class="line-number">13</span>
     <br />
     <span class="line-number">14</span>
     <br />
     <span class="line-number">15</span>
     <br />
     <span class="line-number">16</span>
     <br />
     <span class="line-number">17</span>
     <br />
     <span class="line-number">18</span>
     <br />
     <span class="line-number">19</span>
     <br />
     <span class="line-number">20</span>
    </div>
   </div>
  </div>
  </div>
</template>

<style lang="scss">
#vue3-code{
}
</style>