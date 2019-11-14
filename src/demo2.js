/*vue是什么？*/
  //Vue是一套用于构建用户界面的渐进式框架
  //与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。
  //Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
  //另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

  //1)声明式渲染 v-bind
  //2)条件与循环 v-if v-for
  //3)处理用户输入 v-on v-model
  //4)组件化应用构建
    <div id="app-7">
        <todo-item
          v-for="item in groceryList"
          v-bind:todo="item"
          v-bind:key="item.id"
        ></todo-item>
    </div>
    Vue.component('todo-item', {
      props: ['todo'],
      template: '<li>{{ todo.text }}</li>'
    })

    var app7 = new Vue({
      el: '#app-7',
      data: {
        groceryList: [
          { id: 0, text: '蔬菜' },
          { id: 1, text: '奶酪' },
          { id: 2, text: '随便其它什么人吃的东西' }
        ]
      }
    })
    
    
/*vue实例*/
    1）创建一个Vue实例
      var vm = new Vue({
        // 选项
      })
    2）数据与方法
      当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。
      当这些属性的值发生改变时，视图将会产生“响应”，进行重渲染。
      var data = { a: 1 }
      var vm = new Vue({
        el: '#example',
        data: data
      })
      vm.a == data.a // => true
      vm.$data === data // => true
      vm.$el === document.getElementById('example') // => true

      // $watch 是一个实例方法
      vm.$watch('a', function (newValue, oldValue) {
        // 这个回调将在 `vm.a` 改变后调用
      })
    3）实例生命周期钩子
      每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，
      比如 created、mounted、updated 和 destroyed。生命周期钩子的 this 上下文指向调用它的 Vue 实例。


/*模板语法*/     
    Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。  
    在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。  
    1)插值
      //文本 ，使用“Mustache”语法 (双大括号) 的文本插值 <span>Message: {{ msg }}</span>
      //原始HTML
        双大括号会将数据解释为普通文本,输出HTML代码，需要使用 v-html 指令 <span v-html="rawHtml"></span>
      //使用 JavaScript 表达式  <span>Message: {{ ok ? 'YES' : 'NO' }}</span>
    2)指令
      指令 (Directives) 是带有 v- 前缀的特殊特性。
      //参数<a v-bind:href="url">...</a>，这里 的href 是参数
      //动态参数<a v-bind:[attributeName]="url"> ... </a>，这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值
      //修饰符 
        修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
        <form v-on:submit.prevent="onSubmit">...</form> ,这里的.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
    3）缩写
      //v-bind 缩写 :
        <a v-bind:href="url">...</a>  ==> <a :href="url">...</a>
      //v-on 缩写 @
        <a v-on:click="doSomething">...</a> ==> <a @click="doSomething">...</a>
      
      
/*计算属性和侦听器*/
  1、计算属性
    1)计算属性缓存 vs 方法
      <div id="example">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
      </div>
      var vm = new Vue({
        el: '#example',
        data: {
          message: 'Hello'
        },
        computed: { //计算属性
          reversedMessage: function () {
            return this.message.split('').reverse().join('')
          }
        },
        methods: { //方法
          reversedMessage: function () {
            return this.message.split('').reverse().join('')
          }
        }
      })
      区别：
        计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值
          这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
        相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。
   
    2)计算属性 vs 侦听属性   
      <div id="demo">{{ fullName }}</div>
      var vm = new Vue({
        el: '#demo',
        data: {
          firstName: 'Foo',
          lastName: 'Bar',
          fullName: 'Foo Bar'
        },
        watch: { //侦听属性
          firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
          },
          lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
          }
        },
        computed: { //计算属性
          fullName: function () {
            return this.firstName + ' ' + this.lastName
          }
        }
      })
     
      
  2、侦听器    
    用来观察和响应 Vue 实例上的数据变动，一般用于有一些数据需要随着其它数据变动而变动时，或需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
      
/*Class 与 Style 绑定*/      
    1、绑定 HTML Class  
       1）对象语法
          方式一：<div v-bind:class="{ active: isActive,'text-danger': hasError}"></div>
            data: {
              isActive: true,
              hasError: false
            }
          方式二：<div v-bind:class="classObject"></div>
            data: {
              classObject: {
                active: true,
                'text-danger': false
              }
            }
       2）数组语法
           数组形式：<div v-bind:class="[activeClass, errorClass]"></div> 
            data: {
              activeClass: 'active',
              errorClass: 'text-danger'
            }
           三元表达式：<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
           数组中用对象：<div v-bind:class="[{ active: isActive }, errorClass]"></div>
       3）用在组件上
          Vue.component('my-component', {
            template: '<p class="foo bar">Hi</p>'
          })
          <my-component class="baz boo"></my-component>
          ==>HTML 将被渲染为:<p class="foo bar baz boo">Hi</p>
    
    2、绑定内联样式
      1）对象语法
        方式一：<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
        方式二：<div v-bind:style="styleObject"></div> //styleObject是一个对象

      2）数组语法
        <div v-bind:style="[baseStyles, overridingStyles]"></div>
      3)自动添加前缀
        当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
      4)多重值
        <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
    
    
/*条件渲染*/    
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else>Not A/B</div>
  <div v-show="ok">Hello!</div>
  
  //用 key 管理可复用的元素
    Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染(记住，是复用元素)。
    有时候这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可（记住，是在元素上添加key属性）
  
  //v-if vs v-show
      v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
      v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
      相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
      一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
  
  //v-if 与 v-for 一起使用
      当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。请查阅列表渲染指南 以获取详细信息。















    
      
