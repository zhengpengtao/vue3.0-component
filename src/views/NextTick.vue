<template>
  <div>
    <div class="theme-default-content content__default">
   <h1 id="vue3-0异步更新原理"><a href="#vue3-0异步更新原理" aria-hidden="true" class="header-anchor">#</a> Vue3.0异步更新原理</h1> 
   <h2 id="effect特点"><a href="#effect特点" aria-hidden="true" class="header-anchor">#</a> effect特点</h2> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> effect<span class="token punctuation">,</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./reactivity'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">'zf'</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">11</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
state<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'zf'</span><span class="token punctuation">;</span>
state<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'jw'</span><span class="token punctuation">;</span>
state<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'jg'</span><span class="token punctuation">;</span>
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
    </div>
   </div>
   <blockquote>
    <p>每次更新状态，都会重新运行effect。如果要是effect中包含渲染逻辑，可能会导致多次更新视图。</p>
   </blockquote> 
   <h2 id="watcheffect"><a href="#watcheffect" aria-hidden="true" class="header-anchor">#</a> watchEffect</h2> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> effect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./reactivity&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token parameter">effect<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">doWatch</span><span class="token punctuation">(</span>effect<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> postFlushCbs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">postFlushCbs</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将effect放到数组中进行刷新</span>
    <span class="token function">queueFlush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">doWatch</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 做watch</span>
    <span class="token keyword">let</span> getter<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFunction</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">source</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> <span class="token function-variable function">scheduler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">job</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> runner <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token comment">// 创建一个effect</span>
        lazy<span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> 
        computed<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        scheduler <span class="token comment">// 自定义scheduler</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">runner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
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
     <br />
     <span class="line-number">21</span>
     <br />
     <span class="line-number">22</span>
     <br />
    </div>
   </div>
   <blockquote>
    <p>watchEffect也是effect，只是自定义了<code>scheduler</code>函数</p>
   </blockquote> 
   <h2 id="queueflush实现"><a href="#queueflush实现" aria-hidden="true" class="header-anchor">#</a> queueFlush实现</h2> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">let</span> isFlushPending <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 是否正在等待刷新</span>
<span class="token keyword">let</span> isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 是否正在刷新</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> fn <span class="token operator">?</span> p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span> <span class="token punctuation">:</span> p
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">flushPostFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>postFlushCbs<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 队列有值进行队列刷新</span>
        <span class="token keyword">const</span> cbs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>new <span class="token class-name">Set</span><span class="token punctuation">(</span>postFlushCbs<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        postFlushCbs<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cbs<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cbs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">flushJobs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isFlushPending <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 开始执行任务</span>
    isFlushing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 正在刷新</span>
    <span class="token function">flushPostFlushCbs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 刷新队列</span>
    isFlushing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 刷新完毕</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">queueFlush</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isFlushPending <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isFlushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        isFlushPending <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token function">nextTick</span><span class="token punctuation">(</span>flushJobs<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 稍后刷新任务队列</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
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
     <br />
     <span class="line-number">21</span>
     <br />
     <span class="line-number">22</span>
     <br />
     <span class="line-number">23</span>
     <br />
     <span class="line-number">24</span>
     <br />
     <span class="line-number">25</span>
     <br />
     <span class="line-number">26</span>
     <br />
     <span class="line-number">27</span>
     <br />
    </div>
   </div>
   <blockquote>
    <p>nextTick本质原理就是个promise(微任务),这里会将effect暂存起来并进行去重之后执行。</p>
   </blockquote>
  </div>
  </div>
</template>