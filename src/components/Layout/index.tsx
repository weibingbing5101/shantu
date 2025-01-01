import { memo } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import styles from './index.module.less';

const Layout = () => {
  const urlInfo = useLocation(); //useParams()
  const navigate = useNavigate();
  const jump = (url) => {
    navigate(url);
  };

  return (
    <>
      <div className={styles.layoutWarp}>
        <Outlet />
        <ul className={styles.menuWarp}>
          {/* <li className={urlInfo.pathname === ('/mine') ? styles.active : ''}>商城</li> */}
          <li onClick={() => jump('/')} className={urlInfo.pathname === '/' ? styles.active : ''}>
            首页
          </li>
          <li
            onClick={() => jump('/mine')}
            className={urlInfo.pathname === '/mine' ? styles.active : ''}
          >
            我的
          </li>
        </ul>
      </div>
    </>
  );
};

export default memo(Layout);

// const { getTheme, changeTheme } = useConfigTheme();

// const curTheme = getTheme();

// const handlerTheme = () => {
//   changeTheme();
// };

// <ConfigProvider
// theme={{
//   // hashed: true,
//   // cssVar: true,
//   // 1. 单独使用暗色算法
//   algorithm: curTheme === Etheme.BLACK ? theme.darkAlgorithm : theme.defaultAlgorithm,
//   // 2. 组合使用暗色算法与紧凑算法
//   // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
// }}
// >
// <div className={styles.menuWarp}>
//   <div>curTheme : {curTheme}</div>
//   <Button type="primary" onClick={handlerTheme}>
//     切换主题
//   </Button>
//   <Input placeholder="Please Input" />
//   {/* <Outlet> 绘制当前（被选中的）激活的子路由组件，你可以理解为是我们事先定义的子路由组件的占位符 */}
// </div>
// <Outlet />
// </ConfigProvider>
