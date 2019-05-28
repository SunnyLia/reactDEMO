/* JSX简介 */
// 什么是jsx?
// jsx是JavaScript得语法扩展，可以很好得描述ui应该呈现出它应有交互得本质形式，还可以使react显示更多有用得错误喝警告消息。
// 1、在jsx中嵌入表达式
// 2、使用jsx指定子元素
// 3、jsx防止注入攻击,会默认对输入内容进行转义。
// 4、Babel会把jsx转译成名为React.createElement()函数调用。
const name="JJ Liu";
const ele = <h1 className="greeting">hello,{name}</h1>
// 等效于 
const ele1 = React.createElement(
    'h1',
    {className:'greeting'},
    'hello,world'
)
// 等效于 
// 如下这些对象被称为"react元素"，描述了我们在屏幕上看到的内容。react通过读取这些对象，然后使用他们来构建DOM以及保持随时更新。
const ele2 = {
    type:'h1',
    props:{
        className:'greeting',
        children:'hello,world!'
    }
}



/*元素渲染 */
ReactDOM.render(ele,document.getElementById("root"))
// react元素是不可变对象，一旦被创建，就无法更改它的子元素或属性。
// 所以，更新Ui唯一的方式是创建一个全新的元素，并将其传入ReactDOM.render()中
// 但，React Dom会将元素和它的子元素与他们之前的状态进行比较，并只会只会更新实际改变了的内容来使DOM达到预期的状态。



/*组件&props */
// 函数组件
function Welcome(props){
  return <h1>hello,{props.name}</h1>
}
// class组件
class Welcom extends React.Component{
  render(){
    return <h1>hello,{this.props.name}</h1>
  }
}
// 自定义组件
// react 会将JSX所接收的属性转换为单个对象传递给组件，这个对象称为“props”;
function Welcom(props){
  return <h1>hello,{props.name}</h1>
}
const ele = <Welcome name="Sara" />;
ReactDOM.render(ele,document.getElementById("root"))
// 组合组件
// 组件可以在其输出中引用其他组件。
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


/* state&生命周期 */
