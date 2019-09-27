/* JSX简介 */
// 什么是jsx?
// jsx是JavaScript得语法扩展，可以很好得描述ui应该呈现出它应有交互得本质形式，还可以使react显示更多有用得错误喝警告消息。
// 1、可以在jsx中用大括号{}包裹嵌入表达式
// 2、在编译之后，JSX表达式会被转为普通js函数调用，并且对其取值后得到JS对象
// 3、同一属性不能同时使用引号跟大括号这两种符号，在属性中嵌入js表达式时，不能在大括号外面加上引号。
//    同时，react Dom使用小驼峰命名来定义属性的名称，而不使用HTML属性名称的命名约定。
// 2、使用jsx指定子元素
// 3、jsx可防止注入攻击,在渲染时会默认对输入内容进行转义。
// 4、Babel会把jsx转译成名为React.createElement()函数调用。
const name = "JJ Liu";
const ele = <h1 className="greeting">hello,{name}</h1>
// 等效于 
const ele1 = React.createElement(
  'h1',
  { className: 'greeting' },
  'hello,world'
)
// 等效于 
// 如下这些对象被称为"react元素"，描述了我们在屏幕上看到的内容。react通过读取这些对象，然后使用他们来构建DOM以及保持随时更新。
const ele2 = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'hello,world!'
  }
}



/*元素渲染 */
ReactDOM.render(ele, document.getElementById("root"))
reactDOM.render()可以将一个元素渲染为DOM
// react元素是不可变对象，一旦被创建，就无法更改它的子元素或属性。
// 所以，更新Ui(已渲染的元素)唯一的方式是创建一个全新的元素，并将其传入ReactDOM.render()中
// 但，React Dom会将元素和它的子元素与他们之前的状态进行比较，并只会只会更新实际改变了的内容（它需要更新的部分）来使DOM达到预期的状态。



/*组件&props */
// 函数组件
// 接收唯一带有数据的props对象，并返回一个React元素。
function Welcome(props) {
  return <h1>hello,{props.name}</h1>
}
// ES6 class组件
class Welcom extends React.Component {
  render() {
    return <h1>hello,{this.props.name}</h1>
  }
}
// 自定义组件
// react 会将JSX所接收的属性转换为单个对象传递给组件，这个对象称为“props”;
function Welcom(props) {
  return <h1>hello,{props.name}</h1>
}
const ele = <Welcome name="Sara" />;
ReactDOM.render(ele, document.getElementById("root"))

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
//Props是只读的，组件不能修改自身的props
//纯函数：函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果

/* state&生命周期 */
//state与props类似，但是state是私有的，并且完全受控于当前组件
class Clock extends React.Component {
  // 将 props 传递到父类的构造函数中
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

//使用state的注意事项：
//1）不要直接修改state，因为不会重新渲染组件，而是通过this.setState() 来更新组件state
//2）state的更新可能是异步的
    // 处于性能考虑，React可能会把多个setState（）调用合并成一个调用。
    // 因为this.props和this.state可能会异步更新，所以不能依赖他们的值来更新下一个状态。
  //解决方法
    //让setState（）接收一个函数而不是一个对象。这个函数用上一个state作为第一个参数，将此次更新被应用时的props作为第二个参数：
    // Wrong
    this.setState({
      counter: this.state.counter + this.props.increment,
    });
    // Correct
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
    // Correct
    this.setState(function(state, props) {
      return {
        counter: state.counter + props.increment
      };
    });
//3)state的更新会被合并
  //因为当调用setState（）的时候，React会把提供的对象合并到当前的state
  //可以分别调用setState（）来单独更新state。
//4）单向数据流（数据是向下流的）
  //组件可以选择把它的state作为props向下传递到他的子组件中
  //同时，子组件本身无法知道接收到的数据是来自父组件的state还是props，还是手动输入的。
  //单向数据流：
    //任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。



/*事件处理 */
//react元素的事件处理和DOM元素的很相似，但是语法上的不同之处：
  //1）React事件的命名采用小驼峰式，而不是纯小写
  //2）使用jsx语法时需要传入一个函数作为事件处理函数，而不是一个字符串
   //例如，传统的 HTML：
    <button onclick="activateLasers()">
      Activate Lasers
    </button>
   //在 React 中略微不同：
    <button onClick={activateLasers}>
      Activate Lasers
    </button>
  // 3）不能通过返回false的方式阻止默认行为，必须使用e.preventDefault()。
// jsx回调函数中的this问题
// 在JavaScript中，class的方法默认不会绑定this。
// 如果忘记绑定this.handleClick并把它传入了onClick，当你调用这个函数的时候this的值为undefined。
// 通常情况下，如果没有在方法后面添加()，例如onClick = {this.handleClick},应该为这个方法绑定this.
// 方法一，使用bind方法
class LoggingButton extends React.Component {
  constructor(props) {
    super(props);
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 方法二，使用箭头函数
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}

// 方法三，使用 class fields
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 向事件处理程序传递参数
// 方法一，通过箭头函数传递
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  // 方法二，Function.prototype.bind 来实现
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>


/*条件渲染*/
// 方法一，if条件语句
// 方法二，与运算符&&
// 方法三，三目运算符
// 阻止组件不进行任何渲染，可以让 render 方法直接返回 null


/*列表&key*/
//1)key
// key帮助react识别哪些元素改变了，比如被添加或删除，因此，应当给数组中的每一个元素赋予一个确定的标识。
// 一个元素的key最好是在当前列表的兄弟节点之间必须唯一，并不需要在全局中唯一的。通常，使用来自数据id来作为元素的key.

// 在jsx中嵌入map()
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
          value={number} />

      )}
    </ul>
  );
}

/*表单*/
// 受控组件
// 通过将react组件中的state作为唯一数据源，同时控制用户输入过程中表单操作来达到进行更新组件state的目的。
// React以这种方式控制取值的表单输入元素叫做“受控组件”
// 总的来说，我们可以通过<input type="text">, <textarea> 和 <select> 之类的标签的value 属性来实现受控组件
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

//处理多个元素输入
//当需要处理多个input元素时，我们可以给每个元素添加name属性，并让处理函数根据event.target.name的值选择要执行的操作。
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({  //重点在这
      [name]: value  
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}


/*状态提升*/
// 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”


/*组合&继承*/
// 包含关系
// 父组件可以在子组件标签的内部插入具体内容，子组件可以通过prop children来接收并渲染结果
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}


// 在父组件中，可将其他组件名称作为props参数传递到子组件相应的位置
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}





/*代码分割*/
// 1、import()引入
import { add } from './math'; //使用之前
console.log(add(16, 26));

import("./math").then(math => { //使用之后
    console.log(math.add(16, 26));
});

//2、React.lazy()可以处理动态引入的组件。当渲染组件时，自动导入引入组件的包。注意：不支持服务端渲染
// eact.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。
// 使用之前：
import OtherComponent from './OtherComponent';
function MyComponent() {
    return (
        <div>
            <OtherComponent />
        </div>
    );
}
// 使用之后：
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
    return (
        <div>
            <OtherComponent />
        </div>
    );
}
// Suspense           注意：不支持服务端渲染
// 在组件渲染完成之后，包含的其他组件的模块还没有被加载完成，可以使用加载治时期为组件做优雅降级
// fallback 属性接受任何在组件加载过程中展示的React元素
// Suspense组件置于懒加载组件之上的任何位置，甚至可以包裹国歌懒加载组件
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
        </div>
    );
}

// 3、基于路由的代码分割
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </Suspense>
    </Router>
);

// 4、命名导出
// React.lazy目前值支持默认导出，如果你想被引入模块使用命名导出，可以创建一个中间模块，来重新导出为默认模块。这能保证tree shaking不会出错，并且不必引入不需要的组件。
// ManyComponents.js
export const MyComponent = "...";
export const MyUnusedComponent = "...";
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));


/*Context*/
// props可以将数据自上而下（由父及子）进行传递，Context可以在多个组件之间共享数据
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
//Context 主要应用场景在于很多不同层级的组件需要访问同样数据的时候，如管理当前的 locale，theme，或者一些缓存数据，。但是我们需要谨慎使用Context,因为这会使得组件的复用性变差。
//如果我们只是想避免层层传递一些属性，组件组合是一个比context更好的方案。

// 为当前的 theme 创建一个 context，“light”为默认值，只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会从组件树中找到离自身最近的那个匹配的Provider中读取到当前的context值。
    // 在这个例子中，当前的 theme 值为 “dark”。
    static contextType = ThemeContext;
    render() {
        return <Button theme={this.context} />;
    }
}

// 在嵌套组件中更新Context
const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};
const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => { },
});
function ThemeTogglerButton() {
    // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <button
                    onClick={toggleTheme}
                    style={{ backgroundColor: theme.background }}>

                    Toggle Theme
          </button>
            )}
        </ThemeContext.Consumer>
    );
}
class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };

        // State 也包含了更新函数，因此它会被传递进 context provider。
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        };
    }

    render() {
        // 整个 state 都被传递进 provider
        return (
            <ThemeContext.Provider value={this.state}>
                <Content />
            </ThemeContext.Provider>
        );
    }
}

function Content() {
    return (
        <div>
            <ThemeTogglerButton />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));


/*错误边界*/
// 错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。
// 错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。
// 当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。
/*错误边界无法捕获以下场景中产生的错误：
    1）事件处理
    2）异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
    3）服务端渲染
    4）它自身抛出来的错误（并非它的子组件）*/

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // 可以将错误日志上报给服务器
        logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // 可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
// 然后你可以将它作为一个常规组件去使用：

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
// 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
// 只有 class 组件才可以成为成错误边界组件
// 错误边界组件可以放在最顶层的路由组件，也可以放在单独的部件以保护其他部分不奔溃
// 错误边界无法捕获事件处理器内部的错误。如果需要在时间处理器内部捕获错误，使用普通的js try/catch语句

/*refs转发*/
// Ref转发是一项将ref自动地通过组件传递到其一子组件的技巧
// 1、转发refs到DOM组件
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
/*以下是对上述示例发生情况的逐步解释：

    1、我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
    2、我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
    3、React 传递 ref 给 fowardRef 内函数 (props, ref) => ...，作为其第二个参数。
    4、我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
    5、当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
 
 注意：
    1）第二个参数ref只在使用React.forwardRef定义组件时存在。常规函数和class组件不接收ref参数，且props中额不存在ref.
    2)Ref转发不仅限于DOM组件，也可以转发refs到class组件实例中。
    3）React.forwardRef不推荐使用，因为它改变了库的行为，并在升级react自身时破坏用户的应用。
    */

function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }

        render() {
            const { forwardedRef, ...rest } = this.props;

            // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
            return <Component ref={forwardedRef} {...rest} />;
        }
    }

    // 注意 React.forwardRef 回调的第二个参数 “ref”。
    // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
    // 然后它就可以被挂载到被 LogPros 包裹的子组件上。
    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />;
    });
}


/*FragMents*/
// React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
// 也可以使用<></>空标签来声明Fragments.
function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                // 没有`key`，React 会发出一个关键警告
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            ))}
        </dl>
    );
}


/*高阶组件HOC*/
// 高阶组件是参数为组件，返回值为新组件的函数
const EnhancedComponent = higherOrderComponent(WrappedComponent);
// 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。
// 例如Redux的connect方法，就是HOC的表现。

// 我们可以编写一个创建组件的函数，比如 CommentList 和 BlogPost，订阅 DataSource。
// 该函数将接受一个子组件作为它的其中一个参数，该子组件将订阅数据作为 prop。让我们调用函数 withSubscription：
// 第一个参数是被包装组件。第二个参数通过 DataSource 和当前的 props 返回我们需要的数据。
// 当渲染 CommentListWithSubscription 和 BlogPostWithSubscription 时， CommentList 和 BlogPost 将传递一个 data prop，其中包含从 DataSource 检索到的最新数据：
const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
);

// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
    // ...并返回另一个组件...
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                // 假设 "DataSource" 是个全局范围内的数据源变量
                data: selectData(DataSource, props)
            };
        }

        componentDidMount() {
            // ...负责订阅相关的操作...
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // ... 并使用新数据渲染被包装的组件!
            // 请注意，我们可能还会传递其他属性
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}
/*
注意：
    1）HOC不会修改传入的组件，也不会使用继承来复制其行为，相反，HOC通过将组件包装在容器组件中来组成新组件。HOC是纯函数，没有副作用。
    2）被包装组件接收来自容器组件的所有prop,同时也接收一个新的用于render的data prop。HOC不需要关心数据的使用方式或原因，而被包装组件也不需要关心数据是怎么来的。
    3）HOC不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能。
        function logProps(WrappedComponent) {
          return class extends React.Component {
            componentWillReceiveProps(nextProps) {
              console.log('Current props: ', this.props);
              console.log('Next props: ', nextProps);
            }
            render() {
              // 将 input 组件包装在容器中，而不对其进行修改。Good!
              return <WrappedComponent {...this.props} />;
            }
          }
        }
    4）HOC与容器组件之前的区别：
        容器组件担任分离将高层和底层关注的责任，由容器管理订阅和状态，并将prop传递给处理渲染UI。
        HOC使用容器作为其实现的一部分，可以将HOC视为参数化容器组件。
    5)不要在render方法中使用HOC
*/



/*深入JSX */
// 一、指定React元素类型
// JSX 标签的第一部分指定了 React 元素的类型
// 1、React必须在作用域内
// 由于JSX会编译未React.createElement调用形式，所以React库也必须包含在JSX代码作用域内。
// 2、在JSX类型中使用点语法
// 当在一个模块中导出许多React组件时，可以使用点语法引入一个React组件。
import React from 'react';

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}
// 例如，如果 MyComponents.DatePicker 是一个组件，你可以在 JSX 中直接使用：
function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}
// 3、用户定义得组件必须以大写字母开头
 //   1)以小写字母开头的元素代表一个HTML内置组件，比如<div>会生成相应的字符串传递给React.breateElement(作为参数)
 //   2）大写字母开头的元素则对应着在JavaScript引入或者定义的组件，如<Foo />会编译为React.createElement(Foo)

// 4、动态选择JSX类型
// 你不能将通用表达式作为React元素类型。如果你想通过通用表达式来动态来决定元素类型，需要先将它赋值给大写字母开头得变量。
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
    photo: PhotoStory,
    video: VideoStory
};

function Story(props) {
    /*// 错误！JSX 类型不能是一个表达式。
    return <components[props.storyType] story={props.story} />;*/
    // 正确！JSX 类型可以是大写字母开头的变量。
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
}

// 二、JSX中的Props
// 1、JavaScript表达式作为Props
// 可以把包裹在{}中的JavaScript表达式作为一个prop传递给JSX元素
    <MyComponent foo={1 + 2 + 3 + 4} />
// if语句及for循环不是JavaScript表达式，所以不能再JSX中直接使用，可以用在jsx以外的代码中。
// 2、字符串字面量
    <MyComponent message="hello world" />
// 3、Props默认值为"True"
    <MyTextBox autocomplete />
// 4、...展开运算符
// 缺点：很容易讲不必要的props传递给不相干的组件，或者将无效的HTML熟悉传递给DOM
   // 使用展开运算符 ... 来在JSX中传递整个props对象
    function App1() {
        return <Greeting firstName="Ben" lastName="Hector" />;
    }
    function App2() {
        const props = { firstName: 'Ben', lastName: 'Hector' };
        return <Greeting {...props} />;
    }
  // 只保留当前组件需要接收的props，使用展开运算符将其他props传递下去
   const Button = props => {
      const { kind, ...other } = props;
      return <button className={kind} {...other} />;
   };
   <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
   </Button>

// 三、JSX中的子元素
// 包含在开始和结束标签之间的jsx表达式内容将作为特定属性props.children传递给外层组件。
// 传递子元素的方法：
// 1、字符串字面量
   <MyComponent>Hello world!</MyComponent>
    //此时MyComponent中的props.children就是字符串“Hello world!”

// 2、JSX子元素
    <MyContaine1r>
        <MyFirstComponent />
        <MySecondComponent />
    </MyContaine1r>

// 3、JavaScript表达式作为子元素
    // JavaScript 表达式可以被包裹在 {} 中作为子元素
    function Item(props) {
        return <li>{props.message}</li>;
    }

// 4、函数作为子元素
    // 可以把回调函数作为 props.children 进行传递给自定义组件
    // 调用子元素回调 numTimes 次，来重复生成组件
    function Repeat(props) {
        let items = [];
        for (let i = 0; i < props.numTimes; i++) {
            items.push(props.children(i));
        }
        return <div>{items}</div>;
    }

    function ListOfTenThings() {
        return (
            <Repeat numTimes={10}>
                {(index) => <div key={index}>This is item {index} in the list</div>}
            </Repeat>
        );
    }
// 5、布尔类型，Null以及Undefined将会被忽略，不会被渲染
    //注意点：
     //1)当 props.messages 是空数组时，0 仍然会被渲染
        <div>
          //{props.messages.length && //这样会被渲染
          {props.messages.length > 0 && //这样不会渲染
            <MessageList messages={props.messages} />
          }
        </div>
     //2)如果想渲染false、true、null、undefined 等值，你需要先将它们转换为字符串
        <div>
          My JavaScript variable is {String(myVariable)}.
        </div>


/*性能优化*/
// 一、使用生产版本
// 推荐你在开发应用时使用开发模式，而在为用户部署应用时使用生产模式。
// 通过 Create React App 构建的项目，在生产部署前运行npm run build在项目下的 build/ 目录中生成对应的生产版本。正常开发使用 npm start 即可。
// 二、使用Chrome Performance标签分析组件
// 能帮助你查看是否有不相关的组件被错误地更新，以及 UI 更新的深度和频率。
// 三、使用React开发者工具中的分析器对组件进行分析
// 四、虚拟化长列表
// 如果在应用中渲染了长列表（上百甚至上千条数据），推荐使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般的降低重新渲染组件消耗的时间，以及创建DOM节点的数量
// react-window和react-virtualized是热门的虚拟滚动库。他们提供了多种可复用的组件，用于展示列表、网格和表格数据。
// 五、避免调停
// 如果我们知道在什么情况下组件不需要更新，可以在shouldComponentUpdate中返回false来跳过整个渲染过程。其中包括该组件的render调用以及之后的操作
// 六、通过使用shouldComponentUpdate减少render调用次数
// 七、避免可变对象的产生
// Object.assign 以及对象扩展运算符

// 示例
// 如果你的组件只有当 props.color 或者 state.count 的值改变才需要更新时，你可以使用 shouldComponentUpdate 来进行检查：

class CounterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 1 };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
                Count: {this.state.count}
            </button>
        );
    }
}
// 更简洁的形式React.PureComponent(只能进行浅比较state和prop的方式来实现)

class CounterButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { count: 1 };
    }

    render() {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
                Count: {this.state.count}
            </button>
        );
    }
}


/*Portals*/
// Portal提供了一种将子节点渲染到存在于父组件以外的DOM节点，可以被放置在 DOM 树中的任何地方
React.createPortal(child, container)
// 第一个参数（child）是任何可渲染的React子元素，它会把子元素渲染到container中。第二个参数（container）是一个DOM元素
render() {
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    );
}
// 一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：
// 一、通过Portal进行事件冒泡
// 一个从portal内部触发的事件会一直冒泡至包含React树的祖先，即使这些元素并不是DOM树中的祖先。


/*协调*/
// 一、Diffing算法
// 当对比两棵树时，React首先比较两棵树的根节点。
// 1、比对不同类型的元素
    // 1)当根节点为不同类型的元素，React会拆卸原有的树并建立起新的树。比如<a>变成<img>，<Button>变成<div>
    // 2)当拆卸一颗树时，对应的 DOM 节点也会被销毁。组件实例将执行 componentWillUnmount() 方法。
    // 3)当建立一颗新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 componentWillMount() 方法，紧接着 componentDidMount() 方法。所有跟之前的树所关联的 state 也会被销毁。
    // 4)在根节点以下的组件也会被卸载，他们的状态会被销毁。
    <div><Counter /></div>
    <span><Counter /></span>
    //React 会销毁 Counter 组件并且重新装载一个新的组件。

// 2、比对同一类型的元素
    // 1)当比对两个相同类型的React元素时，React会保留DOM节点，仅比对及更新有改变的属性。
    // 2)当更新 style 属性时，React 仅更新有所更变的属性。
    <div className="before" title="stuff" />
    <div className="after" title="stuff" />
    //通过比对这两个元素，React 知道只需要修改 DOM 元素上的 className 属性。
    
    <div style={{color: 'red', fontWeight: 'bold'}} />
    <div style={{color: 'green', fontWeight: 'bold'}} />
    //通过比对这两个元素，React 知道只需要修改 DOM 元素上的 color 样式，无需修改 fontWeight。
    //在处理完当前节点之后，React继续对子节点进行递归
// 3、比对同类型的组件元素
    // 1)当一个组件更新时，组件实例保持不变，这样state在跨越不同的渲染时保持一致。
    // 2)React将更新该组件实例的props以跟最新的元素保持一致，并调用该实例的componentWillReceiveProps() 和 componentWillUpdate() 方法.
    // 3)下一步，调用render()方法，diff算法将在之前的结果以及新的结果中进行递归
// 4、对子节点进行递归
    // 默认条件下，当递归DOM节点的子元素时，React会同时遍历两个子元素的列表；当产生差异时，生成一个mutation。
    // 在子元素列表末尾新增元素时，更变开销比较小。
    // 在列表头部插入会很影响性能，那么更变开销会比较大。为了解决这种问题，可以在列表中使用唯一ID做key属性，让React更准确的对比出哪些元素是新增的，哪些只是移动了。
// 5、Keys
    // 当子元素拥有key时，React使用key来匹配原有树上的子元素以及最新树上的子元素。
    // 1）key可以不需要全局唯一，但是再列表中必须保持唯一
    // 2)不建议使用元素在数组中的下标作为key，这种在元素不尽兴重新排序的时候比较合适，但一旦有顺序修改，diff就会变得慢


/*Refs&DOM*/
// Refs提供了一种方式，允许我们访问DOM节点或在render方法中创建的React元素。
// 一、何时使用Refs
    // 1、管理焦点，文本选择或媒体播放
    // 2、触发强制动画
    // 3、集成第三方DOM库
    // 避免使用refs来做任何可以通过声明式实现来完成的事情。举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性。

// 二、勿过度使用Refs
    // 通常，让更高层级的组件拥有state是更恰当的
// 三、创建Refs
    // Refs是使用React.createRef()创建得，并通过ref属性附加到React元素。在构造组件时，通常将Refs分配给实例属性，以便可以再整个组件中引用她们
// 四、访问Refs
    // 当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。
    // ref 的值根据节点的类型而有所不同：
        // 1、当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
        // 2、当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
        // 3、你不能在函数组件上使用 ref 属性，因为他们没有实例。
    //1）为 DOM 元素添加 ref 实例
        class CustomTextInput extends React.Component {
          constructor(props) {
            super(props);
            // 创建一个 ref 来存储 textInput 的 DOM 元素
            this.textInput = React.createRef();
            this.focusTextInput = this.focusTextInput.bind(this);
          }

          focusTextInput() {
            // 直接使用原生 API 使 text 输入框获得焦点
            // 注意：我们通过 "current" 来访问 DOM 节点
            this.textInput.current.focus();
          }

          render() {
            // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
            return (
              <div>
                <input type="text" ref={this.textInput} />
                <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
              </div>
            );
          }
        }
    
    //2）为 class 组件添加 Ref
        class AutoFocusTextInput extends React.Component {
          constructor(props) {
            super(props);
            this.textInput = React.createRef();
          }

          componentDidMount() {
            this.textInput.current.focusTextInput();
          }

          render() {
            return (
               //只有在 CustomTextInput 声明为 class 时才有效
              <CustomTextInput ref={this.textInput} /> 
            );
          }
        }
        class CustomTextInput extends React.Component {
          // ...
        }
     //3） Refs 与函数组件
        class Parent extends React.Component {
          constructor(props) {
            super(props);
            this.textInput = React.createRef();
          }
          render() {
            //你不能在函数组件上使用 ref 属性，因为它们没有实例。如果你需要使用 ref，你应该将组件转化为一个 class，
            return (
              <MyFunctionComponent ref={this.textInput} />
            );
          }
        }
        function MyFunctionComponent() {
          return <input />;
        }
  //五、将 DOM Refs 暴露给父组件
    // 在极少数情况下，你可能希望在父组件中引用子节点的 DOM 节点。通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的大小或位置。
    // 推荐使用ref转发

  //六、回调Refs
    // React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。
    // 不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。
    function CustomTextInput(props) {
      return (
        <div>
          <input ref={props.inputRef} />
        </div>
      );
    }

    class Parent extends React.Component {
      render() {
        return (
          <CustomTextInput
            inputRef={el => this.inputElement = el}
          />
        );
      }
    }
    
    // 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

/*Render Props*/
    //“render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
    //具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。
    //更具体地说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。

    //例如，以下组件跟踪 Web 应用程序中的鼠标位置：
    class Cat extends React.Component {
      render() {
        const mouse = this.props.mouse;
        return (
          <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
      }
    }

    class Mouse extends React.Component {
      constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
      }

      handleMouseMove(event) {
        this.setState({
          x: event.clientX,
          y: event.clientY
        });
      }

      render() {
        return (
          <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

            {/*
              Instead of providing a static representation of what <Mouse> renders,
              use the `render` prop to dynamically determine what to render.
            */}
            {this.props.render(this.state)}
          </div>
        );
      }
    }

    class MouseTracker extends React.Component {
      render() {
        return (
          <div>
            <h1>移动鼠标!</h1>
            <Mouse render={mouse => (
              <Cat mouse={mouse} />
            )}/>
          </div>
        );
      }
    }
    // 要获得这个行为，只要渲染一个带有 render prop 的 <Mouse> 组件就能够告诉它当前鼠标坐标 (x, y) 要渲染什么。

/*静态类型检查*/
    //Flow 和 TypeScript 等这些静态类型检查器，可以在运行前识别某些类型的问题。他们还可以通过增加自动补全等功能来改善开发者的工作流程。
    //在大型代码库中建议使用 Flow 或 TypeScript 来代替 PropTypes。
    // 一、FLOW
        //Flow 是一个针对 JavaScript 代码的静态类型检测器。Flow 由 Facebook 开发，经常与 React 一起使用。Flow 通过特殊的类型语法为变量，函数，以及 React 组件提供注解，帮助你尽早地发现错误。
    //二、TypeScript
        //TypeScript 是一种由微软开发的编程语言。它是 JavaScript 的一个类型超集，包含独立的编译器。作为一种类型语言，TypeScript 可以在构建时发现 bug 和错误，这样程序运行时就可以避免此类错误。
        //在 TypeScript 中，提供两种文件扩展名：
            //.ts 是默认的文件扩展名，而 .tsx 是一个用于包含 JSX 代码的特殊扩展名。
    //三、Reason
        //Reason是由 Facebook 开发,不是一种新的语言；它是一种新的语法和工具链，底层使用的是经过实战验证的 OCaml 语言。Reason 在 OCaml 之上提供了 JavaScript 程序员的熟悉语法，而且集成了现有的 NPM/Yarn 工作流。

    
/*PropTypes类型检查*/
    //PropTypes 提供一系列验证器，可用于确保组件接收到的props数据类型是有效的。
    import PropTypes from 'prop-types';
    class Greeting extends React.Component {
      render() {
        return (
          <h1>Hello, {this.props.name}</h1>
        );
      }
    }

    Greeting.propTypes = {
      name: PropTypes.string
    };
    //在本例中, 我们使用了 PropTypes.string。当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，propTypes 仅在开发模式下进行检查。


/*严格模式*/
    //StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。
    /*作用：
        识别不安全的生命周期
        关于使用过时字符串 ref API 的警告
        关于使用废弃的 findDOMNode 方法的警告
        检测意外的副作用
        检测过时的 context API
    */
    //React 可能在提交之前多次调用渲染阶段生命周期的方法，所以不要在这些方法的内部编写副作用相关的代码，这点非常重要。
    /*渲染阶段的生命周期包括以下 class 组件方法：
        constructor
        componentWillMount
        componentWillReceiveProps
        componentWillUpdate
        getDerivedStateFromProps
        shouldComponentUpdate
        render
        setState 更新函数（第一个参数）
    */

/*非受控组件*/
    //在大多数情况下，我们推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。
    //另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。
    lass NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.input.current.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" ref={this.input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
   
    //1)默认值
        //<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked属性，<input>、<select> 和 <textarea> 支持 defaultValue属性。
    //2)文件输入
        //在 React 中，<input type="file" /> 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。


/*React.Component*/
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  //1)在 React.Component 的子类中有个必须定义的 render() 函数。








