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