import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { memo } from 'react';
import styles from './index.module.less';

const Loading = () => {
  return (
    <div className={styles.loadingWarp}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default memo(Loading);
