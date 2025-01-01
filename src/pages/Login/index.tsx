import { memo, useMemo, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
} from 'antd';

import styles from './index.module.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { doLogin } from '@/api/apis';
import { isSuccess } from '@/api';
import { emailArr } from '@/utils/const';
import { useConfigToken, useGonfigUserName } from '@/store/login';
import { useUrlParams } from '@/hooks';

const Login = () => {
  const navigate = useNavigate();
  const urlData: any = useUrlParams();

  const search = useMemo(() => {
    if (urlData.from) {
      return `?from=${urlData.from}`;
    }
  }, [urlData]);

  const { setToken } = useConfigToken();
  const { setUserName } = useGonfigUserName();

  // 邮箱后缀
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return emailArr.map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  // 用户名校验
  const valUserName = (rules, value, callback) => {
    if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的邮箱'));
      // return {
      //   pattern: false,
      //   message: '',
      // };
    }
  };

  const onFinish = async (values: any) => {
    const res = await doLogin({ username: values.username, passwordOrCaptcha: values.password });
    if (isSuccess(res.code)) {
      message.success({
        content: '登录成功，即将跳转',
      });
      setToken(res.data.token);
      setUserName(values.username);
      setTimeout(() => {
        if (urlData?.from) {
          window.location.href = urlData.from;
        }
        navigate('/');
      }, 3000);
    } else {
      message.error({
        content: res.data || '注册失败，请稍后重试',
      });
      return;
    }

    // console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.loginWarp}>
      <div className={styles.innerWarp}>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, validator: valUserName }]}>
            {/* <Input prefix={<UserOutlined />} placeholder="Username" /> */}

            <AutoComplete
              placeholder="请输入邮箱用户名"
              prefix={<UserOutlined />}
              // style={{ width: 200 }}
              onSearch={handleSearch}
              options={options}
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入超过6位的密码' }]}>
            <Input.Password
              minLength={6}
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住状态</Checkbox>
              </Form.Item>
              {/* <Link
                to={{
                  // pathname: '/reg',
                  // search: '?type=forget',
                  // hash: '#hash',
                }}
              >
                忘记密码
              </Link> */}
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
            或
            <Link
              to={{
                pathname: '/reg',
                search: search,
                // hash: '#hash',
              }}
            >
              去注册
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(Login);
