/*代码分割*/
// import()
import { add } from './math'; //使用之前
console.log(add(16, 26));

import("./math").then(math => { //使用之后
  console.log(math.add(16, 26));
});

//React.lazy()可以处理动态引入的组件。当渲染组件时，自动导入引入组件的包。
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
