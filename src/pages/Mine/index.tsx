import { memo, useEffect, useState } from 'react';
import { Avatar, Card, message } from 'antd';
import { CopyOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Button } from 'antd';
import copy from 'copy-to-clipboard';
import { useGonfigUserName } from '@/store/login';
import { useNavigate } from 'react-router';

const ReviewPhoto = () => {
  const [email, setEmail] = useState('');
  const { getUserName } = useGonfigUserName();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(getUserName());
  }, [getUserName]);

  const copyEmail = () => {
    copy(email);
    message.success({
      content: '复制成功',
    });
  };

  const clearLoginInfo = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={styles.mineWarp}>
      <div className={styles.avatar}>
        <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
      </div>
      {email && (
        <div className={styles.email}>
          <span className={styles.mr}>用户邮箱</span>
          <span className={styles.mr}>{email}</span>
          <Button
            onClick={copyEmail}
            shape="circle"
            size="small"
            color="default"
            icon={<CopyOutlined />}
          />
        </div>
      )}

      {/* 使用文档 */}
      <div className={styles.docDesc}>
        <Card title="使用文档" style={{ width: '100%' }}>
          <p>1、照片仅支持单次上传分享</p>
          <p>2、照片保留时长为5分钟，如未查看自动销毁</p>
          <p>3、照片查看后（包含自己），处理方式为永远删除</p>
          <p>4、拒绝上传，包括但不限于黄、赌、毒等违法属性照片</p>
          <p>5、仅供个人参考学习，严禁商用</p>
          <p>
            6、由于仅限个人使用，<span style={{ color: 'red' }}>邀请码会定期更新</span>
          </p>
        </Card>
      </div>
      <div style={{ height: '16px' }}></div>
      <Button onClick={clearLoginInfo} color="default">
        清除登录信息
      </Button>
    </div>
  );
};

export default memo(ReviewPhoto);
