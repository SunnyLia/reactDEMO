/*基本类型

    1、布尔值 boolean
      let isDone: boolean = false;
    2、数字 number
      let decLiteral: number = 6;
    3、字符串 string
      let name: string = "bob";
      let sentence: string = `Hello, my name is ${ name }.`
    4、数组 number[] , Array<number>
      let list: number[] = [1, 2, 3];
      let list: Array<number> = [1, 2, 3];
    5、元组 Tuple
      元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
      let x: [string, number];
      x = ['hello', 10]; // OK
      x = [10, 'hello']; // Error
    6、枚举 enum
      enum Color {Red, Green, Blue}
      let c: Color = Color.Green;
    7、任意值 any
      let notSure: any = 4;
    8、空值 void
      let unusable: void = undefined;
    9、Null 和 Undefined
      let u: undefined = undefined;
      let n: null = null;
    10、Never
      function error(message: string): never {
          throw new Error(message);
      }
    11、类型断言
      let strLength: number = (<string>someValue).length;
      let strLength: number = (someValue as string).length;
*/

/*变量声明
    1、变量声明
      var声明
      let声明
      const声明
    2、解构
      a)解构数组
        let input = [1, 2];
        let [first, second] = input;
        console.log(first); // 输出 1
        console.log(second); // 输出 2
        
        function f([first, second]: [number, number]) {
            console.log(first);
            console.log(second);
        }
        f(input);
        
        let [first, ...rest] = [1, 2, 3, 4];
        console.log(first); // outputs 1
        console.log(rest); // outputs [ 2, 3, 4 ]
      b)解构对象
        let o = {
            a: "foo",
            b: 12,
            c: "bar"
        };
        let { a, b } = o;
        
        let { a, ...passthrough } = o;
        let total = passthrough.b + passthrough.c.length;
        
      c)属性重命名
        let { a: newName1, b: newName2 } = o;
        等同于：let newName1 = o.a; let newName2 = o.b;
        指定类型：let {a, b}: {a: string, b: number} = o;
      d)默认值
        默认值可以让你在属性为 undefined 时使用缺省值：
        function keepWholeObject(wholeObject: { a: string, b?: number }) {
            let { a, b = 1001 } = wholeObject;
        }
        现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。

      
      
      
      
      
      
      
*/











