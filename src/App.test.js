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
