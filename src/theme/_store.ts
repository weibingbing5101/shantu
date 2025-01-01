// import React, { useReducer, createContext, useContext } from 'react';

// // 创建全局状态的Context
// const GlobalStateContext = createContext();

// // 定义Reducer
// const globalReducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_COUNT':
//       return { ...state, count: action.payload };
//     default:
//       return state;
//   }
// };

// // 创建Provider组件
// const GlobalProvider = ({ children }) => {
//   const [globalState, dispatch] = useReducer(globalReducer, { count: 0 });
//   return (
//     <GlobalStateContext.Provider value={{ globalState, dispatch }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// // 创建useGlobalState的钩子
// const useGlobalState = () => {
//   const context = useContext(GlobalStateContext);
//   if (!context) {
//     throw new Error('useGlobalState must be used within a GlobalProvider');
//   }
//   const { globalState, dispatch } = context;
//   return [globalState, dispatch];
// };

// // 使用GlobalProvider在根组件包裹
// const App = () => (
//   <GlobalProvider>
//     <RootComponent />
//   </GlobalProvider>
// );

// // 在任意子组件中使用全局状态
// const SomeComponent = () => {
//   const [globalState, dispatch] = useGlobalState();
//   // 使用globalState和dispatch
//   return (
//     <div>
//       <p>Count: {globalState.count}</p>
//       <button onClick={() => dispatch({ type: 'UPDATE_COUNT', payload: globalState.count + 1 })}>
//         Increment
//       </button>
//     </div>
//   );
// };
export {};
