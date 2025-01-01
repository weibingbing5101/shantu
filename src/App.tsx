import { memo, lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Provider } from 'jotai';

import './theme/var.css';

import Layout from '@/components/Layout';
import Loading from './components/Loading';
import { useConfigToken } from './store/login';

const Login = lazy(
  () => import(/* webpackChunkName: "login" */ /* webpackPreload: true */ '@/pages/Login'),
);

const Regiest = lazy(
  () => import(/* webpackChunkName: "regiest" */ /* webpackPreload: true */ '@/pages/Regiest'),
);

const Home = lazy(
  () => import(/* webpackChunkName: "home" */ /* webpackPreload: true */ '@/pages/Home'),
);

const ReviewPhoto = lazy(
  () =>
    import(/* webpackChunkName: "reviewphoto" */ /* webpackPreload: true */ '@/pages/ReviewPhoto'),
);

const Mine = lazy(
  () => import(/* webpackChunkName: "mine" */ /* webpackPreload: true */ '@/pages/Mine'),
);

const NoMatch = () => {
  return <div>404</div>;
};

// 鉴权
const RequireAuth = ({ children }) => {
  const from = window.location.href;
  const url = `/login?from=${from}`;
  const { getToken } = useConfigToken();
  const isLogin = getToken();
  return isLogin ? children : <Navigate to={url} replace />;
};

const App = () => {
  // useEffect(() => {
  //   isLogin();
  // }, []);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          {/* 登陆 */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          {/* 注册 */}
          <Route
            path="/reg"
            element={
              <Suspense fallback={<Loading />}>
                <Regiest />
              </Suspense>
            }
          />
          {/* 页面盒子   共用Menu*/}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            {/* 首页 发照片 */}
            <Route
              index
              key="home"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            {/* 看照片 */}
            <Route
              key="reviewphoto"
              path="/reviewphoto"
              element={
                <Suspense fallback={<Loading />}>
                  <ReviewPhoto />
                </Suspense>
              }
            />
            <Route path="mine" key="mine" element={<Mine />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default memo(App);
