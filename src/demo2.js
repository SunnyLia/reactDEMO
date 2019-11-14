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



/*列表渲染*/
  //用 v-for 把一个数组对应为一组元素
    <li v-for="item in items">{{ item.message }}</li>
    <li v-for="(item, index) in items">{{ index }} - {{ item.message }}</li>
    <div v-for="item of items"></div>
  //在 v-for 里使用对象
    <li v-for="value in object">{{ value }}</li>
    <div v-for="(value, name) in object">{{ name }} : {{ value }}</div>
    <div v-for="(value, name, index) in object">{{ index }}. {{ name }}: {{ value }}</div>
  //维护状态
    当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。但是这种只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
    为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性
    <div v-for="item in items" v-bind:key="item.id"><!-- 内容 --></div>

  //数组更新检测
    1）变异方法（会改变原始数组）
      Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。
        push()
        pop()
        shift()
        unshift()
        splice()
        sort()
        reverse()
    2)非变异方法（不会改变原始数组，而是返回一个新数组）
        filter()、concat() 和 slice()
        你可能会认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。但事实并非如此。
        Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

    3）由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
        //当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
        //当你修改数组的长度时，例如：vm.items.length = newLength

  //对象变更检测注意事项
    1)由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
      var vm = new Vue({
        data: {
          userProfile: {
            name: 'Anika'
          }
        }
      })
      vm.userProfile.age = 27
      // `vm.userProfile.age` 不是响应式的
      解决办法：可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。
      Vue.set(vm.userProfile, 'age', 27)
      为已有对象赋值多个新属性
      vm.userProfile = Object.assign({}, vm.userProfile, {
        age: 27,
        favoriteColor: 'Vue Green'
      })
    
    
   // 显示过滤/排序后的结果
    <li v-for="n in evenNumbers">{{ n }}</li>
    data: {
      numbers: [ 1, 2, 3, 4, 5 ]
    },
    computed: {
      evenNumbers: function () {
        return this.numbers.filter(function (number) {
          return number % 2 === 0
        })
      }
    }

  //v-for 与 v-if 一同使用
    当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。


/*事件处理*/
    1、监听事件 v-on
        <button v-on:click="counter += 1">Add 1</button>
    2、事件处理方法
        <button v-on:click="greet">Greet</button>
         methods: {
          greet: function (event) {
            // 内容
          }
        }
    3、内联处理器中的方法
        <button v-on:click="say('hi',$event)">Say hi</button>
        methods: {
          say: function (message,event) {
            alert(message)
          }
        }
    4、事件修饰符
        修饰符是由点开头的指令后缀来表示
        <a v-on:click.stop="doThis"></a>
          .stop 
          .prevent  
          .capture
          .self
          .once
          .passive
    5、按键修饰符
        <input v-on:keyup.enter="submit">
        .enter
        .tab
        .delete (捕获“删除”和“退格”键)
        .esc
        .space
        .up
        .down
        .left
        .right
        可以通过全局 config.keyCodes 对象自定义按键修饰符别名：Vue.config.keyCodes.f1 = 112
 
/*表单输入绑定*/
     v-model是Vue的一个语法糖，负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理
     v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
     v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
        text 和 textarea 元素使用 value 属性和 input 事件；
        checkbox 和 radio 使用 checked 属性和 change 事件；
        select 字段将 value 作为 prop 并将 change 作为事件。
   1、基础用法  
      1）文本
        <input v-model="message" placeholder="edit me">
      2）多行文本
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      3）复选框
        单个复选框，绑定到布尔值：<input type="checkbox" id="checkbox" v-model="checked">
        多个复选框，绑定到同一个数组：<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      4）单选按钮
        <input type="radio" id="one" value="One" v-model="picked">
      5）选择框
        单选时（绑定单个选项值）：<select v-model="selected"></select>      selected: '' ==> B
        多选时 (绑定到一个数组)： <select v-model="selected"></select>      selected: [] ==> [ "B", "C" ]
    2、修饰符 
        1）.lazy  相当于使用change事件
        2）.number 将输入值转为数值类型
        3）.trim  自动过滤首尾空白字符

/*组件基础*/
      // 定义一个名为 button-counter 的新组件
      Vue.component('button-counter', {
        data: function () {
          return {
            count: 0
          }
        },
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
      })
    1、组件复用
      1）data 必须是一个函数
      data: function () {
        return {
          count: 0
        }
      }
    2、组件的组织
      1）组件的注册类型：全局注册和局部注册
        //全局注册：Vue.component('my-component-name', {
                     // ... options ...
                   })
              全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中
        //局部注册
      
    3、通过 Prop 向子组件传递数据  
        Vue.component('blog-post', {
          props: ['title'],
          template: '<h3>{{ title }}</h3>'
        })
        <blog-post title="My journey with Vue"></blog-post>
      
    4、监听子组件事件  
        父级组件通过 v-on 监听子组件实例事件，子组件可以通过调用内建的 $emit 方法传入事件名称来触发事件
        <blog-post
           v-on:enlarge-text="postFontSize += 0.1"
        ></blog-post>
        <button v-on:click="$emit('enlarge-text')">
           Enlarge text
        </button>
      1)使用事件抛出一个值
          //子组件使用 $emit 的第二个参数来提供一个值
            <button v-on:click="$emit('enlarge-text', 0.1)">
              Enlarge text
            </button>
          //父级组件通过 $event 访问到被抛出的这个值
            <blog-post
              v-on:enlarge-text="postFontSize += $event"
            ></blog-post>
          //如果这个事件处理函数是一个方法：
            <blog-post
              v-on:enlarge-text="onEnlargeText"
            ></blog-post>
          //那么这个值将会作为第一个参数传入这个方法：
            methods: {
              onEnlargeText: function (enlargeAmount) {
                this.postFontSize += enlargeAmount
              }
            }
      2)在组件上使用 v-model
          Vue.component('custom-input', {
            props: ['value'],
            template: `
              <input
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
              >
            `
          })
          <custom-input v-model="searchText"></custom-input>
     5、通过插槽分发内容 <slot>
          Vue.component('alert-box', {
            template: `
              <div class="demo-alert-box">
                <strong>Error!</strong>
                <slot></slot>
              </div>
            `
          })
          <alert-box>
            Something bad happened.
          </alert-box>      
     6、动态组件
        可以通过 Vue 的 <component> 元素加一个特殊的 is 特性来实现动态切换组件
        <component v-bind:is="currentTabComponent"></component>
        在上述示例中，currentTabComponent 可以包括
          1)已注册组件的名字，或
          2)一个组件的选项对象















