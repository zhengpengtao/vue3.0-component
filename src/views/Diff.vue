<template>
  <div>
    <div class="theme-default-content content__default">
   <h1 id="剖析vue3-0-diff算法"><a href="#剖析vue3-0-diff算法" aria-hidden="true" class="header-anchor">#</a> 剖析Vue3.0 diff算法</h1> 
   <p>diff算法的核心就是子节点之间的比对，主要分为两种情况（子节点有key和无key的情况）</p> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>patchFlag <span class="token operator">&amp;</span> PatchFlags<span class="token punctuation">.</span><span class="token constant">KEYED_FRAGMENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">patchKeyedChildren</span><span class="token punctuation">(</span>
        c1 <span class="token keyword">as</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        c2 <span class="token keyword">as</span> VNodeArrayChildren<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        anchor<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        optimized
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>patchFlag <span class="token operator">&amp;</span> PatchFlags<span class="token punctuation">.</span><span class="token constant">UNKEYED_FRAGMENT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">patchUnkeyedChildren</span><span class="token punctuation">(</span>
        c1 <span class="token keyword">as</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        c2 <span class="token keyword">as</span> VNodeArrayChildren<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        anchor<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        optimized
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span>
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
    </div>
   </div>
   <h2 id="一-无key的情况"><a href="#一-无key的情况" aria-hidden="true" class="header-anchor">#</a> 一.无Key的情况</h2> 
   <p>当元素无key时，我们希望尽可能复用老节点</p> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code>  <span class="token keyword">const</span> <span class="token function-variable function">patchUnkeyedChildren</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token parameter">c1<span class="token punctuation">:</span> VNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    c2<span class="token punctuation">:</span> VNodeArrayChildren<span class="token punctuation">,</span>
    container<span class="token punctuation">:</span> RendererElement<span class="token punctuation">,</span>
    anchor<span class="token punctuation">:</span> RendererNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">:</span> SuspenseBoundary <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSVG<span class="token punctuation">:</span> boolean<span class="token punctuation">,</span>
    optimized<span class="token punctuation">:</span> boolean</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    c1 <span class="token operator">=</span> c1 <span class="token operator">||</span> <span class="token constant">EMPTY_ARR</span>
    c2 <span class="token operator">=</span> c2 <span class="token operator">||</span> <span class="token constant">EMPTY_ARR</span>
    <span class="token keyword">const</span> oldLength <span class="token operator">=</span> c1<span class="token punctuation">.</span>length <span class="token comment">// 老节点长度</span>
    <span class="token keyword">const</span> newLength <span class="token operator">=</span> c2<span class="token punctuation">.</span>length <span class="token comment">// 新节点长度</span>
    <span class="token comment">// 计算能复用的节点</span>
    <span class="token keyword">const</span> commonLength <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>oldLength<span class="token punctuation">,</span> newLength<span class="token punctuation">)</span>
    <span class="token keyword">let</span> i
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> commonLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> nextChild <span class="token operator">=</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> optimized
        <span class="token operator">?</span> <span class="token function">cloneIfMounted</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
        <span class="token punctuation">:</span> <span class="token function">normalizeVNode</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>
        c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>
        nextChild<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        optimized
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 老元素多余新元素，将老元素卸载掉</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldLength <span class="token operator">&gt;</span> newLength<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token comment">// remove old</span>
      <span class="token function">unmountChildren</span><span class="token punctuation">(</span>c1<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> commonLength<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将多余的新元素挂载到老节点上</span>
      <span class="token function">mountChildren</span><span class="token punctuation">(</span>
        c2<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        anchor<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        optimized<span class="token punctuation">,</span>
        commonLength
      <span class="token punctuation">)</span>
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
     <span class="line-number">28</span>
     <br />
     <span class="line-number">29</span>
     <br />
     <span class="line-number">30</span>
     <br />
     <span class="line-number">31</span>
     <br />
     <span class="line-number">32</span>
     <br />
     <span class="line-number">33</span>
     <br />
     <span class="line-number">34</span>
     <br />
     <span class="line-number">35</span>
     <br />
     <span class="line-number">36</span>
     <br />
     <span class="line-number">37</span>
     <br />
     <span class="line-number">38</span>
     <br />
     <span class="line-number">39</span>
     <br />
     <span class="line-number">40</span>
     <br />
     <span class="line-number">41</span>
     <br />
     <span class="line-number">42</span>
     <br />
     <span class="line-number">43</span>
     <br />
     <span class="line-number">44</span>
     <br />
     <span class="line-number">45</span>
     <br />
     <span class="line-number">46</span>
     <br />
     <span class="line-number">47</span>
     <br />
     <span class="line-number">48</span>
     <br />
     <span class="line-number">49</span>
     <br />
     <span class="line-number">50</span>
     <br />
    </div>
   </div>
   <p><img src="/jg-vue/assets/img/diif-1.ab276421.png" alt="" /></p> 
   <p><img src="/jg-vue/assets/img/diif-2.7a09a836.png" alt="" /></p> 
   <h2 id="二-有key的情况"><a href="#二-有key的情况" aria-hidden="true" class="header-anchor">#</a> 二.有key的情况</h2> 
   <p>diff算法的核心还是有key的情况的比对</p> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 开始索引</span>
<span class="token keyword">const</span> l2 <span class="token operator">=</span> c2<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token keyword">let</span> e1 <span class="token operator">=</span> c1<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// 老节点最后的索引</span>
<span class="token keyword">let</span> e2 <span class="token operator">=</span> l2 <span class="token operator">-</span> <span class="token number">1</span>  <span class="token comment">// 新节点最后的索引</span>
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
    </div>
   </div>
   <h3 id="_1-从头开始比对"><a href="#_1-从头开始比对" aria-hidden="true" class="header-anchor">#</a> 1.从头开始比对</h3> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n1 <span class="token operator">=</span> c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> optimized
    <span class="token operator">?</span> <span class="token function">cloneIfMounted</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
    <span class="token punctuation">:</span> <span class="token function">normalizeVNode</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果是相同节点就做patch</span>
    <span class="token function">patch</span><span class="token punctuation">(</span>
        n1<span class="token punctuation">,</span>
        n2<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        optimized
    <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// 否则跳出循环</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    i<span class="token operator">++</span>
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
    </div>
   </div>
   <p><img src="/jg-vue/assets/img/diif-3.633a1a31.png" alt="" /></p> 
   <h3 id="_2-从尾部开始比对"><a href="#_2-从尾部开始比对" aria-hidden="true" class="header-anchor">#</a> 2.从尾部开始比对</h3> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1 <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n1 <span class="token operator">=</span> c1<span class="token punctuation">[</span>e1<span class="token punctuation">]</span>
    <span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>e2<span class="token punctuation">]</span> <span class="token operator">=</span> optimized
    <span class="token operator">?</span> <span class="token function">cloneIfMounted</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>e2<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
    <span class="token punctuation">:</span> <span class="token function">normalizeVNode</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>e2<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token function">patch</span><span class="token punctuation">(</span>
        n1<span class="token punctuation">,</span>
        n2<span class="token punctuation">,</span>
        container<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        parentSuspense<span class="token punctuation">,</span>
        isSVG<span class="token punctuation">,</span>
        optimized
    <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// 非相同节点跳出循环</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    e1<span class="token operator">--</span> <span class="token comment">// 移动指针</span>
    e2<span class="token operator">--</span>
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
   <p><img src="/jg-vue/assets/img/diif-4.d3e4a7df.png" alt="" /></p> 
   <h3 id="_3-同序列挂载"><a href="#_3-同序列挂载" aria-hidden="true" class="header-anchor">#</a> 3.同序列挂载</h3> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nextPos <span class="token operator">=</span> e2 <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">const</span> anchor <span class="token operator">=</span> nextPos <span class="token operator">&lt;</span> l2 <span class="token operator">?</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>nextPos<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span><span class="token punctuation">.</span>el <span class="token punctuation">:</span> parentAnchor
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 新节点多出来的插入到老节点中</span>
        <span class="token function">patch</span><span class="token punctuation">(</span>
            <span class="token keyword">null</span><span class="token punctuation">,</span>
            <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> optimized
                <span class="token operator">?</span> <span class="token function">cloneIfMounted</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
                <span class="token punctuation">:</span> <span class="token function">normalizeVNode</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG
        <span class="token punctuation">)</span>
        i<span class="token operator">++</span>
    <span class="token punctuation">}</span>
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
    </div>
   </div>
   <blockquote>
    <p>新的节点个数多余老节点，（头部插入、尾部插入）</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diif-5.747209db.png" alt="" /> <img src="/jg-vue/assets/img/diif-6.07076735.png" alt="" /></p> 
   <h3 id="_4-同序列卸载"><a href="#_4-同序列卸载" aria-hidden="true" class="header-anchor">#</a> 4.同序列卸载</h3> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;</span> e2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> e1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">unmount</span><span class="token punctuation">(</span>c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        i<span class="token operator">++</span>
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
    </div>
   </div>
   <blockquote>
    <p>老的节点个数多余新节点，（头部删除、尾部删除）</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diif-7.92c37bd1.png" alt="" /> <img src="/jg-vue/assets/img/diif-8.58f193d3.png" alt="" /></p> 
   <h3 id="_5-未知序列"><a href="#_5-未知序列" aria-hidden="true" class="header-anchor">#</a> 5.未知序列</h3> 
   <h4 id="_5-1-根据key创建映射表"><a href="#_5-1-根据key创建映射表" aria-hidden="true" class="header-anchor">#</a> 5.1 根据key创建映射表</h4> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">const</span> s1 <span class="token operator">=</span> i <span class="token comment">// 确定老节点开始位置</span>
<span class="token keyword">const</span> s2 <span class="token operator">=</span> i <span class="token comment">// 确定新节点开始位置</span>

<span class="token keyword">const</span> keyToNewIndexMap<span class="token punctuation">:</span> Map<span class="token operator">&lt;</span>string <span class="token operator">|</span> number<span class="token punctuation">,</span> number<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> s2<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> e2<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nextChild <span class="token operator">=</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> optimized
        <span class="token operator">?</span> <span class="token function">cloneIfMounted</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
        <span class="token punctuation">:</span> <span class="token function">normalizeVNode</span><span class="token punctuation">(</span>c2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextChild<span class="token punctuation">.</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 创建key的映射表</span>
        keyToNewIndexMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>nextChild<span class="token punctuation">.</span>key<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
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
    </div>
   </div>
   <blockquote>
    <p>在这里我们需要将未patch的新节点根据key和索引制作成映射表，为后续复用逻辑做准备</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diif-9.566dc6f6.png" alt="" /></p> 
   <h4 id="_5-2-循环老节点依次进行patch"><a href="#_5-2-循环老节点依次进行patch" aria-hidden="true" class="header-anchor">#</a> 5.2 循环老节点依次进行patch</h4> 
   <div class="language-JS line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">let</span> j
<span class="token keyword">let</span> patched <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 标记已经patched个数</span>
<span class="token keyword">const</span> toBePatched <span class="token operator">=</span> e2 <span class="token operator">-</span> s2 <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 标记还需要patched的个数</span>
<span class="token keyword">let</span> moved <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 是否需要移动 </span>
<span class="token keyword">let</span> maxNewIndexSoFar <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 临时标记</span>
<span class="token keyword">const</span> newIndexToOldIndexMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>toBePatched<span class="token punctuation">)</span> <span class="token comment">// 根据需要patched的个数创建数组</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> toBePatched<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> newIndexToOldIndexMap<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> s1<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> e1<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> prevChild <span class="token operator">=</span> c1<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>patched <span class="token operator">&gt;=</span> toBePatched<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// all new children have been patched so this can only be a removal</span>
        <span class="token function">unmount</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
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
    </div>
   </div>
   <blockquote>
    <p>如果新节点没有需要patched，则循环老节点，将老节点依次进行卸载</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diif-11.7a5f3848.png" alt="" /></p> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">let</span> newIndex
<span class="token keyword">if</span> <span class="token punctuation">(</span>prevChild<span class="token punctuation">.</span>key <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 通过老节点的key去新节点中找到对应索引</span>
    newIndex <span class="token operator">=</span> keyToNewIndexMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">.</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>newIndex <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果索引不存在则直接删除老节点</span>
    <span class="token function">unmount</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
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
    </div>
   </div>
   <p><img src="/jg-vue/assets/img/diif-12.03470ece.png" alt="" /></p> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>j <span class="token operator">=</span> s2<span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> e2<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
        newIndexToOldIndexMap<span class="token punctuation">[</span>j <span class="token operator">-</span> s2<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
        <span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>prevChild<span class="token punctuation">,</span> c2<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        newIndex <span class="token operator">=</span> j
        <span class="token keyword">break</span>
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
    </div>
   </div>
   <blockquote>
    <p>如果老节点无key，则会找到对应新节点看类型是否相同，如果类型相同则进行patch</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diif-13.74cef58e.png" alt="" /></p> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code>newIndexToOldIndexMap<span class="token punctuation">[</span>newIndex <span class="token operator">-</span> s2<span class="token punctuation">]</span> <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>newIndex <span class="token operator">&gt;=</span> maxNewIndexSoFar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    maxNewIndexSoFar <span class="token operator">=</span> newIndex
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    moved <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
<span class="token function">patch</span><span class="token punctuation">(</span>
    prevChild<span class="token punctuation">,</span>
    c2<span class="token punctuation">[</span>newIndex<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    optimized
<span class="token punctuation">)</span>
patched<span class="token operator">++</span>
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
    </div>
   </div>
   <blockquote>
    <p>标记已经patched过的元素，用于标记最长稳定序列,并且标记元素是否需要移动,最终值为0的则意味着元素没有被patch过</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diif-10.c30e8387.png" alt="" /></p> 
   <h4 id="_5-3-移动和挂载"><a href="#_5-3-移动和挂载" aria-hidden="true" class="header-anchor">#</a> 5.3 移动和挂载</h4> 
   <div class="language-js line-numbers-mode">
    <pre class="language-js"><code><span class="token keyword">const</span> increasingNewIndexSequence <span class="token operator">=</span> moved
<span class="token operator">?</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>newIndexToOldIndexMap<span class="token punctuation">)</span> <span class="token comment">// 获取最长稳定序列</span>
<span class="token punctuation">:</span> <span class="token constant">EMPTY_ARR</span>
j <span class="token operator">=</span> increasingNewIndexSequence<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> toBePatched <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token keyword">const</span> nextIndex <span class="token operator">=</span> s2 <span class="token operator">+</span> i
<span class="token keyword">const</span> nextChild <span class="token operator">=</span> c2<span class="token punctuation">[</span>nextIndex<span class="token punctuation">]</span> <span class="token keyword">as</span> VNode
<span class="token keyword">const</span> anchor <span class="token operator">=</span>
    nextIndex <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> l2 <span class="token operator">?</span> <span class="token punctuation">(</span>c2<span class="token punctuation">[</span>nextIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">as</span> VNode<span class="token punctuation">)</span><span class="token punctuation">.</span>el <span class="token punctuation">:</span> parentAnchor
<span class="token keyword">if</span> <span class="token punctuation">(</span>newIndexToOldIndexMap<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果为0 说明是新增元素</span>
    <span class="token function">patch</span><span class="token punctuation">(</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    nextChild<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    isSVG
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>moved<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">!==</span> increasingNewIndexSequence<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 需要移动</span>
        <span class="token function">move</span><span class="token punctuation">(</span>nextChild<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> MoveType<span class="token punctuation">.</span><span class="token constant">REORDER</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        j<span class="token operator">--</span> <span class="token comment">// 元素不需要移动</span>
    <span class="token punctuation">}</span>
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
     <span class="line-number">28</span>
     <br />
    </div>
   </div>
   <blockquote>
    <p>根据之前计算出来的数组，来确定最长增长稳定序列（不需要做移动的节点），循环新节点如果值为0则说明需要新增元素，否则查看节点是否需要移动</p>
   </blockquote> 
   <p><img src="/jg-vue/assets/img/diff-14.7e364371.png" alt="" /></p>
  </div>
  </div>
</template>