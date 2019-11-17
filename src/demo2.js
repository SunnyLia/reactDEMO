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


/*组件注册*/
    1)组件名写法
        <my-component-name>
        <MyComponentName>
    2）全局注册
        Vue.component('my-component-name', {})
    3）局部注册
        new Vue({
          el: '#app',
          components: {
            'component-a': ComponentA,
            'component-b': ComponentB
          }
        })
    4）模块系统
        a)在模块系统中局部注册
          创建一个 components 目录，并将每个组件放置在其各自的文件中,然后在局部注册之前导入要使用的组件。
          import ComponentA from './ComponentA'
          import ComponentC from './ComponentC'

          export default {
            components: {
              ComponentA,
              ComponentC
            },
            // ...
          }
        全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
    
    
/*Prop*/    
    1、Prop 类型
      props: {
        title: String,
        likes: Number,
        isPublished: Boolean,
        commentIds: Array,
        author: Object,
        callback: Function,
        contactsPromise: Promise // or any other constructor
      }
    2、传递静态或动态 Prop
        静态：<blog-post title="My journey with Vue"></blog-post>
        动态：<blog-post v-bind:title="post.title"></blog-post>
    3、单向数据流
        1）所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
        这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
        2）额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告
        3）这里有两种常见的试图改变一个 prop 的情形：
          a)这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：
            props: ['initialCounter'],
            data: function () {
              return {
                counter: this.initialCounter
              }
            }
          b)这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
            props: ['size'],
            computed: {
              normalizedSize: function () {
                return this.size.trim().toLowerCase()
              }
            }    
    4）Prop 验证
        Vue.component('my-component', {
          props: {
            // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
            propA: Number,
            // 多个可能的类型
            propB: [String, Number],
            // 必填的字符串
            propC: {
              type: String,
              required: true
            },
            // 带有默认值的数字
            propD: {
              type: Number,
              default: 100
            },
            // 带有默认值的对象
            propE: {
              type: Object,
              // 对象或数组默认值必须从一个工厂函数获取
              default: function () {
                return { message: 'hello' }
              }
            },
            // 自定义验证函数
            propF: {
              validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].indexOf(value) !== -1
              }
            }
          }
        })
       
        type 可以是下列原生构造函数中的一个：
          String
          Number
          Boolean
          Array
          Object
          Date
          Function
          Symbol
    
     5）非 Prop 的特性
      a)替换/合并已有的特性
        从外部提供给组件的值会替换掉组件内部设置好的值。
        所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style 特性会稍微智能一些，即两边的值会被合并起来，从而得到最终的值
      b)禁用特性继承
        在组件的选项中设置 inheritAttrs: false,实例配合$attrs 属性使用


/*自定义事件*/
  1、自定义组件的 v-model
    Vue.component('base-checkbox', {
      model: {
        prop: 'checked',
        event: 'change'
      },
      props: {
        checked: Boolean
      },
      template: `
        <input
          type="checkbox"
          v-bind:checked="checked"
          v-on:change="$emit('change', $event.target.checked)"
        >
      `
    })
    <base-checkbox v-model="lovingVue"></base-checkbox>
    这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新。
  2、将原生事件绑定到组件
    $listeners提供了包含了作用在这个组件上的所有监听器。有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。
  3、.sync 修饰符
    在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：
    this.$emit('update:title', newTitle)
    然后父组件可以监听那个事件并根据需要更新一个本地的数据属性。例如：
    <text-document
      v-bind:title="doc.title"
      v-on:update:title="doc.title = $event"
    ></text-document>
    为了方便起见，我们为这种模式提供一个缩写，即 .sync 修饰符：
    <text-document v-bind:title.sync="doc.title"></text-document>

    当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
    <text-document v-bind.sync="doc"></text-document>
    这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。


/*插槽*/
  1、插槽内容<slot>
    <navigation-link url="/profile">
      Your Profile
    </navigation-link>
    当组件渲染的时候，<slot></slot> 将会被替换为“Your Profile”。
    <a
      v-bind:href="url"
      class="nav-link"
    >
      <slot></slot>
    </a>
    插槽内可以包含任何模板代码，包括 HTML和组件：

  2、编译作用域
    父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
    <navigation-link url="/profile">{{ url }}</navigation-link>
    <!--这里的 `url` 会是 undefined，因为 "/profile" 是_传递给_ <navigation-link> 的而不是在 <navigation-link> 组件*内部*定义的。-->
  3、后备内容
    放在 <slot> 标签内，在父组件没有提供内容的时候被渲染
    <button type="submit">
      <slot>Submit</slot>
    </button>
  4、具名插槽
      带有name属性的 <slot>可以用来定义额外的插槽
        <div class="container">
          <header>
            <slot name="header"></slot>
          </header>
          <main>
            <slot></slot>
          </main>
        </div>
      在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称
        <base-layout>
          <template v-slot:header>
            <h1>Here might be a page title</h1>
          </template>
          <p>A paragraph for the main content.</p> ==>这种会被默认插槽渲染
        </base-layout>
      现在 <template> 元素中的所有内容都将会被传入相应的插槽。

      具名插槽的缩写 #
      <template #header></template>
  5、作用域插槽
      原理：作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里function (slotProps) {// 插槽内容}
      为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 <slot> 元素的一个特性绑定上去：
      <span>
        <slot v-bind:user="user">
          {{ user.lastName }}
        </slot>
      </span>
      现在在父级作用域中，我们可以给 v-slot 带一个值来定义我们提供的插槽 prop 的名字：
      <current-user>
        <template v-slot:default="slotProps">
          {{ slotProps.user.firstName }}
        </template>
      </current-user>
    a)独占默认插槽的缩写语法
      不带参数的 v-slot 被假定对应默认插槽：
      <current-user v-slot="slotProps">
        {{ slotProps.user.firstName }}
      </current-user>
    b)解构插槽 Prop
      <current-user v-slot="{ user }"></current-user>
      <current-user v-slot="{ user = { firstName: 'Guest' } }"></current-user>
  6、动态插槽名
  <base-layout>
    <template v-slot:[dynamicSlotName]>
      ...
    </template>
  </base-layout>


/*动态组件 & 异步组件*/
    1、在动态组件上使用 keep-alive
      <keep-alive> 元素能将那些标签的组件实例能够被在它们第一次被创建的时候缓存下来
      <keep-alive>
        <component v-bind:is="currentTabComponent"></component>
      </keep-alive>

    2、异步组件
        Vue.component(
          'async-webpack-example',
          // 这个 `import` 函数会返回一个 `Promise` 对象。
          () => import('./my-async-component')
        )

        new Vue({
          // ...
          components: {
            'my-component': () => import('./my-async-component')
          }
        })


/*处理边界情况*/
1、访问元素 & 组件
  a)访问根实例
    在每个 new Vue 实例的子组件中，其根实例可以通过 $root 属性进行访问。
    // Vue 根实例
    new Vue({
      data: {
        foo: 1
      },
      computed: {
        bar: function () { /* ... */ }
      },
      methods: {
        baz: function () { /* ... */ }
      }
    })
    // 获取根组件的数据
    this.$root.foo
    // 写入根组件的数据
    this.$root.foo = 2
    // 访问根组件的计算属性
    this.$root.bar
    // 调用根组件的方法
    this.$root.baz()
  b)访问父级组件实例
    $parent 属性可以用来从一个子组件访问父组件的实例
    this.$parent.foo
  d)访问子组件实例或子元素
    通过 ref 特性为这个子组件赋予一个 ID 引用
      <base-input ref="usernameInput"></base-input>
    在定义了这个 ref 的组件里，你可以使用：this.$refs.usernameInput

    ref 可以提供对内部指定元素的访问
    <input ref="input">
    methods: {
      // 用来从父级组件聚焦输入框
      focus: function () {
        this.$refs.input.focus()
      }
    }
    this.$refs.usernameInput.focus() //父级组件通过下面的代码聚焦输入框
    注意：$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。
  e)依赖注入
    provide 选项允许我们指定我们想要提供给后代组件的数据/方法
      provide: function () {
        return {
          getMap: this.getMap
        }
      }
    inject 选项来接收指定的我们想要添加在这个实例上的属性
      inject: ['getMap']
    优点：
      相比 $parent 来说，这个用法可以让我们在任意后代组件中访问 getMap，而不需要暴露整个 <google-map> 实例。
      这允许我们更好的持续研发该组件，而不需要担心我们可能会改变/移除一些子组件依赖的东西。
      同时这些组件之间的接口是始终明确定义的，就和 props 一样。
    缺点：
      它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难
      同时所提供的属性是非响应式的
  2、程序化的事件侦听器
    通过 $on(eventName, eventHandler) 侦听一个事件
    通过 $once(eventName, eventHandler) 一次性侦听一个事件
    通过 $off(eventName, eventHandler) 停止侦听一个事件

   

/*进入/离开 & 列表过渡*/
    Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果
      在 CSS 过渡和动画中自动应用 class
      可以配合使用第三方 CSS 动画库，如 Animate.css
      在过渡钩子函数中使用 JavaScript 直接操作 DOM
      可以配合使用第三方 JavaScript 动画库，如 Velocity.js
    1、单元素/组件的过渡
      Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡
        条件渲染 (使用 v-if)
        条件展示 (使用 v-show)
        动态组件
        组件根节点
      <div id="demo">
        <button v-on:click="show = !show">
          Toggle
        </button>
        <transition name="fade">
          <p v-if="show">hello</p>
        </transition>
      </div>
      new Vue({
        el: '#demo',
        data: {
          show: true
        }
      })
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
    a)自定义过渡的类名
      enter-class
      enter-active-class
      enter-to-class (2.1.8+)
      leave-class
      leave-active-class
      leave-to-class (2.1.8+)


/*混入*/
      混入 (mixin) 来分发 Vue 组件中的可复用功能。
      一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
      // 定义一个混入对象
      var myMixin = {
        created: function () {
          this.hello()
        },
        methods: {
          hello: function () {
            console.log('hello from mixin!')
          }
        }
      }

      // 定义一个使用混入对象的组件
      var Component = Vue.extend({
        mixins: [myMixin]
      })

      var component = new Component() // => "hello from mixin!"

  1、选项合并
    当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
    同名钩子函数将合并为一个数组，因此都将被调用。
    值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
  2、全局混入
      请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。
  
      
  /*自定义指令*/
    //全局注册
       Vue.directive('focus', {
          // 当被绑定的元素插入到 DOM 中时……
          inserted: function (el) {
            // 聚焦元素
            el.focus()
          }
        })
    //局部注册
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          }
        }
      }
    1、钩子函数
      一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
        bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
        update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新       
        componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        unbind：只调用一次，指令与元素解绑时调用。


      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      


