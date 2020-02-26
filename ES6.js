/*let&const
1、变量声明 let和const
  es5通过var来声明变量，es6通过let和const声明（let表示变量，const表示常量，且都是块级作用域）
    es5 var声明会将函数变量提升到函数的最顶部
    es6 let不存在变量提升，也不允许重复声明，let只在声明所在的块级作用域内有效
      es5for循环
        var a = [];
        for (var i = 0; i < 10; i++) {
          a[i] = function () {
            console.log(i);
          };
        }
        a[6](); // 10

      es6for循环
        var a = [];
        for (let i = 0; i < 10; i++) {
          a[i] = function () {
            console.log(i);
          };
        }
        a[6](); // 6
    es6 const不存在变量提升，也不允许重复声明；一旦声明，不能重新赋值，否则报错；只声明不赋值，也会报错；const只在声明所在的块级作用域内有效

  ES6声明变量的6种方法
    var 、let、const、function、import、class
*/

/*变量的解构赋值
  1、对象的解构赋值
    1)对象内的变量必须与属性同名，才能取到正确的值
      let { foo, bar } = { foo: "aaa", bar: "bbb" };
      foo // "aaa"
      bar // "bbb"
    2)先要找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者
      let { foo: baz } = { foo: "aaa", bar: "bbb" };
      baz // "aaa"
      foo // error: foo is not defined
  
  2、数组的解构赋值
    let [a, b, c] = [1, 2, 3];
    a // 1
    b // 2
    c // 3 
*/

/*字符串模板
  JS字符串模版
    $('#result').append(
      'There are <b>' + basket.count + '</b> ' +
      'items in your basket, ' +
      '<em>' + basket.onSale +
      '</em> are on sale!'
    );
  ES6字符串模版
    $('#result').append(`
      There are <b>${basket.count}</b> items
       in your basket, <em>${basket.onSale}</em>
      are on sale!
    `);
  
  1、注意事项
    1）模版字符串是增强版的字符串，用反引号（`）标识，嵌入变量时需写在${}中
    2）${}大括号内部可以放入任意的js表达式，也可以进行运算，调用函数，以及引用对象属性
  
  2、字符串嵌套
    const tmpl = addrs => `
      <table>
      ${addrs.map(addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
      `).join('')}
      </table>
    `;
    const data = [
      { first: 'Jane', last: 'Bond' },
      { first: 'Lars', last: 'Croft' },
    ];
  
    // <table>
    //   <tr><td>Jane</td></tr>
    //   <tr><td>Bond</td></tr>
    //   <tr><td>Lars</td></tr>
    //   <tr><td>Croft</td></tr>
    // </table>
  
    let str = 'return ' + '`Hello ${name}!`';
    let func = new Function('name', str);
    func('Jack') // "Hello Jack!"
  
  3、模版编译
    模版编译函数compile
*/

/*es6扩展
1、字符串扩展
  1）字符串遍历
    for (let codePoint of 'foo') {
      console.log(codePoint)
    }
    // "f"
    // "o"
    // "o"
  2）at() 返回字符串给定位置的字符
    'abc'.at(0) // "a"
    '𠮷'.at(0) // "𠮷"
  3）includes() 是否包含该参数字符串
    let s = 'Hello world!';
    s.includes('o') // true
    s.includes('Hello', 6) // false
  4）startsWith() 是否在原字符串的头部
    let s = 'Hello world!';
    s.startsWith('Hello') // true
    s.startsWith('world', 6) // true
  5）endsWith() 是否在原字符串的尾部
    let s = 'Hello world!';
    s.includes('o') // true
    s.endsWith('Hello', 5) // true
  6）repeat() 将原字符串重复n次,并返回
    'hello'.repeat(2) // "hellohello"
    'na'.repeat(-1) // RangeError
    'na'.repeat(2.9) // "nana"
  7）padStart() 头部补全指定长度字符串
    'x'.padStart(4, 'ab') // 'abax'
    'xxx'.padStart(2, 'ab') // 'xxx'
    用于提示字符串格式
    '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
  8）padEnd() 尾部补全指定长度字符串
    'x'.padEnd(4, 'ab') // 'xaba'
    'xxx'.padEnd(2, 'ab') // 'xxx'
  9）matchAll() 返回一个正则表达式在当前字符串的所有匹配
  10) String.raw() 处理模版字符串的基本方法，会将所欲变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用
    String.raw`Hi\n${2+3}!`;
    // 返回 "Hi\\n5!"
    String.raw`Hi\u000A!`;
    // 返回 "Hi\\u000A!"
    String.raw({ raw: 'test' }, 0, 1, 2);
    // 返回 't0e1s2t'

2、数组的扩展
  Number.isFinite() 检查一个数值是否为有限的
    Number.isFinite(15); // true
    Number.isFinite('15'); // false
  Number.isNaN() 检查一个值是否为NaN
    Number.isNaN(NaN) // true
    Number.isNaN(15) // false
  Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
  Number.parseInt()
    Number.parseInt('12.34') // 12
  Number.parseFloat()
    Number.parseFloat('123.45#') // 123.45
  Number.isInteger() 用来判断一个数值是否为整数

  Math.trunc() 去除一个数的小数部分，返回整数部分
    Math.trunc(4.9) // 4
    Math.trunc('123.456') // 123
  Math.sign() 判断一个数到底是正数、负数、还是零
    参数为正数，返回+1；
    参数为负数，返回-1；
    参数为 0，返回0；
    参数为-0，返回-0;
    其他值，返回NaN。
  
3、函数的扩展
  ES6为函数的参数设置默认值
    function log(x, y = 'World') {
      console.log(x, y);
    }

    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello
*/

/*set&map
1、set
  用来生成set数据结构，类似于数组，值唯一，会去除重复数值
  const s = new Set();
  [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
  for (let i of s) {
    console.log(i);
  }
  // 2 3 5 4
  const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
  items.size 
  // 5
  const set = new Set([1, 2, 3, 4, 4]);
  [...set]      //去除数组的重复成员
  // [1, 2, 3, 4]

  1）注意：两个对象总是不相等的
    let set = new Set();
    set.add({});
    set.size // 1
    set.add({});
    set.size // 2

  2）set属性和方法
    add(value) 添加某个值
    delete(value) 删除
    has(value) 是否为set的成员
    clear() 清空所有成员
    array.from() 将set结构转换为数组
      const items = new Set([1, 2, 3, 4, 5， 5]);
      const array = Array.from(items);
      //[1,2,3,4,5]

  3) set 遍历
    keys() 返回键名的遍历器
    values() 返回键值的遍历器
    entries() 返回键值对的遍历器
      let set = new Set(['red', 'green', 'blue']);
      for (let item of set.keys()) {
        console.log(item);
      }
      // red
      // green
      // blue

      for (let item of set.values()) {
        console.log(item);
      }
      // red                      
      // green
      // blue

      for (let item of set.entries()) {
        console.log(item);
      }
      // ["red", "red"]
      // ["green", "green"]
      // ["blue", "blue"]

    for...of循环遍历set可以替换value()方法
      for (let x of set) {
        console.log(x);
      }
      // red
      // green
      // blue

    forEach() 遍历
      set = new Set([1, 4, 9]);
      set.forEach((value, key) => console.log(key + ' : ' + value))
      // 1 : 1
      // 4 : 4
      // 9 : 9



2、map
  会生成map数据结构，类似于对象，是键值对的集合
  const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  map.size // 2
  map.get('name') // "张三"

  1）方法
    b.set(a,'张三') //将对象o当做b的一个键 
    get(a) //获取这个键
    has()
    delete()

  2）注意
    只有对同一个对象的引用，map结构才能将其视为同一个键
    const map = new Map();
    map.set(['a'], 555);
    map.get(['a']) // undefined

    map.set(-0, 555);
    map.get(+0) // 555

  3）遍历
    keys() 遍历健名
    value() 遍历键值
    entries() 遍历所有成员
      const map = new Map([
        ['F', 'no'],
        ['T',  'yes'],
      ]);
      for (let item of map.entries()) {
        console.log(item[0], item[1]);
      }
      // "F" "no"
      // "T" "yes"
    forEach()

  4)将map结构转为数组结构，使用扩展运算符（...）
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    [...map.keys()]
    // [1, 2, 3]
    [...map.values()]
    // ['one', 'two', 'three']
    [...map.entries()]
    // [[1,'one'], [2, 'two'], [3, 'three']]
    [...map]
    // [[1,'one'], [2, 'two'], [3, 'three']]
  5)数组转化为map类型
    将数组传入 Map 构造函数，就可以转为 Map。
    new Map([
      [true, 7],
      [{foo: 3}, ['abc']]
    ])
  6）map 转化为对象
    function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k,v] of strMap) {
        obj[k] = v;
      }
      return obj;
    }

    const myMap = new Map()
      .set('yes', true)
      .set('no', false);
    strMapToObj(myMap)
    // { yes: true, no: false }
*/

/*promise

promise是一个对象，提供的API可以进行一步操作
promise操作的三种状态：pending（进行中）、fulfilled（已成功）、rejected（失败）
1、优缺点
  优点：可以将异步操作以同步操作的流程表达出来
        避免了层层嵌套的回调函数
        统一API接口，使得异步操作更加容易
  缺点：promise一旦新建就会立即执行，中午无法取消
        如果不设置回调函数，promise内部抛出的错误不会反应到外部
        当处于pending状态时，无法得知目前进展到哪个阶段

2、基本用法
  1）创造一个promise实例
    const promise = new Promise(function(resolve, reject) {
      // ... some code
      if ( 异步操作成功 ){
        resolve(value);   //从 pending(未完成) 变为 resolved(成功)
      } else {
        reject(error);    //从 pending(未完成) 变为 rejected(失败)
      }
    });
  2）then指定resolved状态和rejected状态的回调函数
    注意：then方法指定的回调函数，将在当前脚本所有同步任务执行完之后才会执行
    promise.then(function(value) {
      // success       (调用如上resolve状态时的回调函数)
    }, function(error) {
      // failure /可选      (调用如上rejected状态时的回调函数)
    });
  3）例子
    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }
    timeout(100).then((value) => {
      console.log(value);
    });

3、promise方法
  1）then（） 为promise实例添加状态改变时的回调函数
    注意：then方法返回的是一个新的promise实例
  2）catch（） 用于指定发生错误时的回调函数
    注意：如果promise状态已经变成了resolved，再抛出错误时无效的
          如果没有使用catch方法指定错误处理的回调函数，promise对象抛出的错误不会传递到外层代码
  3）finally（）用于指定不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数
  4）all（）用于将多个 Promise 实例，包装成一个新的 Promise 实例
    注意：如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法
  5）用于将多个 Promise 实例，包装成一个新的 Promise 实例

*/


/*async await
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
1、特点
  1）内置执行器
    generator函数的执行必须靠执行器或next方法，而async函数自带执行器，可以与普通函数一样执行
    asyncReadFile();
  2）更好的语义
    async函数就是将generator函数的星号（*）替换成async,将yield替换成await
  3）更广的适用性
    await命令后面，可以是promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
  4）返回值是promise
    async函数的返回值是promise对象，这比generator函数的返回值是iterator对象方便多了，可以用then方法指定下一步的操作

2、基本用法
  async函数返回一个promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句
    async function timeout(ms) {
      await new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value);
    }
    asyncPrint('hello world', 50);

3、语法
  1）返回promise对象
    async函数内部return语句返回的值，会成为then方法回调函数的参数
      async function f(){
        return 'hello world';
      }
      f().then(v => console.log(v)); //hello world
  2）async函数内部抛出的错误，会被catch方法接收到
    async function f(){
      throw new Error('出错了');
    };
    f().then(v => console.log(v))
    .catch(e => console.log(e))

4、await命令
  只要await语句后面的promise变为reject，那么整个async函数都会中断执行
  所以，即使前一个异步操作失败，也不要中断后面的异步函数，
  1）用try...catch
    async function f() {
      try {
        await Promise.reject('出错了');
      } catch(e) {
      }
      return await Promise.resolve('hello world');
    }

    f()
    .then(v => console.log(v))
    // hello world

  2）await后面的promise对象后再跟一个catch方法
    async function f() {
      await Promise.reject('出错了')
        .catch(e => console.log(e));
      return await Promise.resolve('hello world');
    }

    f()
    .then(v => console.log(v))
    // 出错了
    // hello world

  3）如果希望多个请求并发执行，可以使用promise.all方法
    async function dbFuc(db) {
      let docs = [{}, {}, {}];
      let promises = docs.map((doc) => db.post(doc));

      let results = await Promise.all(promises);
      console.log(results);
    }

5、for await...of
  用于遍历异步的iterator接口
  async function f() {
    for await (const x of createAsyncIterable(['a', 'b'])) {
      console.log(x);
    }
  }
  // a
  // b
*/

/*iterator 
1、作用
  1）为各种数据结构，提供一个统一的、简便的访问接口
  2）能够使数据结构的成员按某种次序排列
  3）供for...of搭配使用
2、遍历过程
  每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束

3、默认iterator接口
  Array
  Map
  Set
  String
  TypedArray
  函数的 arguments 对象
  NodeList 对象

4、调用iterator接口的场合
  1）解构赋值
    对数组和set结构进行解构赋值
      let set = new Set().add('a').add('b').add('c');
      let [x,y] = set;
      // x='a'; y='b'
      let [first, ...rest] = set;
      // first='a'; rest=['b','c'];
  2）扩展运算符（...）
    // 例一
    var str = 'hello';
    [...str] //  ['h','e','l','l','o']
    // 例二
    let arr = ['b', 'c'];
    ['a', ...arr, 'd']
    // ['a', 'b', 'c', 'd']
  3) yield*
    let generator = function* () {
      yield 1;
      yield* [2,3,4];
      yield 5;
    };

    var iterator = generator();
    iterator.next() // { value: 1, done: false }
    iterator.next() // { value: 2, done: false }
    iterator.next() // { value: 3, done: false }
    iterator.next() // { value: 4, done: false }
    iterator.next() // { value: 5, done: false }
    iterator.next() // { value: undefined, done: true }
  4) 其他场合
    for...of
    Array.from()
    Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
    Promise.all()
    Promise.race()

5、for...of循环
  一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员(键值)
  1）数组
    const arr = ['red', 'green', 'blue'];
    for(let v of arr) {
      console.log(v); // red green blue
    }
    const obj = {};
    obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
    for(let v of obj) {
      console.log(v); // red green blue
    }

  2）Set和Map结构
    var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
    for (var e of engines) {
      console.log(e);
    }
    // Gecko
    // Trident
    // Webkit

    var es6 = new Map();
    es6.set("edition", 6);
    es6.set("committee", "TC39");
    es6.set("standard", "ECMA-262");
    for (var [name, value] of es6) {
      console.log(name + ": " + value);
    }
    // edition: 6
    // committee: TC39
    // standard: ECMA-262
*/

/*generator
1、generator的基本概念
  一是，function关键字与函数名之间有一个星号;
  二是，函数体内部使用yield表达式，定义不同的内部状态

  调用generator函数后，该函数并不执行，返回的是一个指向内部状态的指针对象（遍历器对象），然后，再调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，知道遇到下一个yield表达式（或return语句）为止。

  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }

  var hw = helloWorldGenerator();
  hw.next() // { value: 'hello', done: false }
  hw.next() // { value: 'world', done: false }
  hw.next() // { value: 'ending', done: true }
  hw.next() // { value: undefined, done: true }

2、yield表达式
  用于暂停执行generator函数的next（）遍历，并将紧跟着yield后面的表达式作为返回对象的value属性值
  注意
    1）只能用在generator函数里面，其他地方都会报错
    2）generator函数只有遇到next（）方法才能执行
    3）yield表达式用在其他表达式中，必须放在圆括号里面
      function* demo() {
        console.log('Hello' + yield 123); // SyntaxError
        console.log('Hello' + (yield 123)); // OK
      }
    4）如果用作函数参数或放在赋值表达式的右边，可以不加括号
      function* demo() {
        foo(yield 'a', yield 'b'); // OK
        let input = yield; // OK
      }

3、与iterator接口的关系
  有与generator函数就是遍历器生成函数，因此可以吧generator复制给对象的Symbol.iterator属性，从而使得该对象具有iterator接口
  var myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  [...myIterable] // [1, 2, 3]
*/