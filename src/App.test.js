/*代码分割*/
// 1、import()
import { add } from './math'; //使用之前
console.log(add(16, 26));

import("./math").then(math => { //使用之后
    console.log(math.add(16, 26));
});

//2、React.lazy()可以处理动态引入的组件。当渲染组件时，自动导入引入组件的包。
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
// Suspense
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
/*错误边界无法捕获以下场景中产生的错误：

    事件处理（了解更多）
    异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
    服务端渲染
    它自身抛出来的错误（并非它的子组件）*/
// 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
// 只有 class 组件才可以成为成错误边界组件
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

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
    5、当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。*/

// 我们可以使用 React.forwardRef API 明确地将 refs 转发到内部的 FancyButton 组件。
// React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点。
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


/*深入JSX */
// 一、指定React元素类型
// 1、React必须在作用域内
// 由于JSX会编译未React.createElement调用形式，所以React库也必须包含在JSX代码作用域内。
// 2、在JSX类型中使用点语法
// 当在一个木块中导出许多React组件时，可以使用点语法引入一个React组件。
import React from 'react';

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}
// 3、用户定义得组件必须以大写字母开头
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
// 3、Props默认值为"True"
// 4、...展开运算符，用来在JSX中传递整个props对象
// 缺点：很容易讲不必要的props传递给不相干的组件，或者将无效的HTML熟悉传递给DOM
function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
    const props = { firstName: 'Ben', lastName: 'Hector' };
    return <Greeting {...props} />;
}

// 三、JSX中的子元素
// 包含在开始和结束标签之间的jsx表达式内容将作为特定属性props.children传递给外层组件。
// 传递子元素的方法：
// 1、字符串字面量
<MyComponent>Hello world!</MyComponent>
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
// 你可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。
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

/*性能优化*/
// 一、使用生产版本
// 推荐你在开发应用时使用开发模式，而在为用户部署应用时使用生产模式。
// 二、使用Chrome Performance标签分析组件
// 能帮助你查看是否有不相关的组件被错误地更新，以及 UI 更新的深度和频率。
// 三、使用React开发者工具中的分析器对组件进行分析
// 四、虚拟化长列表
// 如果在应用中渲染了长列表（上百甚至上千条数据），推荐使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般的降低重新渲染组件消耗的时间，以及创建DOM节点的数量
// react-window和react-virtualized是热门的虚拟滚动库。他们提供了多种可复用的组件，用于展示列表、网格和表格数据。
// 五、避免调停
// 如果我们知道在什么情况下组件不需要更新，可以在shouldComponentUpdate中返回false来跳过整个渲染过程。其中包括该组件的render调用以及之后的操作
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
// 更简洁的形式React.PureComponent(只能进行浅比较)

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
// 五、不可变数据的力量
// 六、使用不可变数据结构

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
// 一、通过Portal进行事件冒泡
// 一个从portal内部触发的事件会一直冒泡至包含React树的祖先，即使这些元素并不是DOM树中的祖先。


/*协调*/
// 一、Diffing算法
// 当对比两棵树时，React首先比较两棵树的根节点。
// 1、比对不同类型的元素
// 当根节点为不同类型的元素是，React会拆卸原有的树并建立起新的树。当拆卸一棵树时，对应的DOM节点也会被销毁。
// 当拆卸一颗树时，对应的 DOM 节点也会被销毁。组件实例将执行 componentWillUnmount() 方法。
// 当建立一颗新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 componentWillMount() 方法，紧接着 componentDidMount() 方法。所有跟之前的树所关联的 state 也会被销毁。
// 2、比对同一类型的元素
// 当比对两个相同类型的React元素时，React会保留DOM节点，仅比对及更新有改变的属性。在处理完当前节点之后，React继续对子节点进行递归
// 3、比对同类型的组件元素
// 当一个组件更新时，组件实例保持不变，这样state在跨越不同的渲染时保持一致。React将更新该组件实例的props以跟最新的元素保持一致，并调用该实例的componentWillReceiveProps() 和 componentWillUpdate() 方法.
// 下一步，调用render()方法，diff算法将在之前的结果以及新的结果中进行递归
// 4、对子节点进行递归
// 默认条件下，当递归DOM节点的子元素时，React会同时遍历两个子元素的列表；当产生差异时，生成一个mutation。
// 5、Keys
// 当子元素拥有key时，React使用key来匹配原有树上的子元素以及最新树上的子元素。key能让转换变得更高效
// key可以不需要全局唯一，但是再列表中必须保持唯一


/*Refs&DOM*/
