import { memo, useEffect, useRef, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
} from 'antd';

import styles from './index.module.less';
import { CodeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { getCaptcha, register } from '@/api/apis';
import { isSuccess } from '@/api';
import { emailArr, inventCode } from '@/utils/const';
import { useConfigToken, useGonfigUserName } from '@/store/login';
import { useUrlParams } from '@/hooks';

const Regiest = () => {
  const navigate = useNavigate();
  const urlData: any = useUrlParams();

  const [form] = Form.useForm();
  const { setUserName } = useGonfigUserName();
  const { setToken } = useConfigToken();

  const [codeDisable, setCodeDisable] = useState(true);
  const [timeNum, setTimeNum] = useState(undefined); // 初始化 undefined
  const timerRef = useRef(null);

  // 发送验证码
  const sendCode = async () => {
    if (!codeDisable) {
      const forms = form.getFieldsValue(true);

      let result = await getCaptcha({ account: forms.username });
      if (isSuccess(result.code)) {
        message.success({
          content: '发送成功，请前往邮箱查看',
        });
        setCodeDisable(true);
        setTimeNum(300);
      } else {
        message.error({
          content: result.data || '网络问题，请重新发送',
        });
      }
    }
  };

  // 倒计时
  useEffect(() => {
    // console.log('进入effect', timeNum);

    // 初始化时不做任何操作
    if (timeNum === undefined) {
      return;
    }

    // 给定倒计时数字
    if (timeNum > 0) {
      timerRef.current = setTimeout(() => {
        setTimeNum(timeNum - 1);
        // console.log('设置值', timeNum - 1);
      }, 1000);
    } else {
      const [forms] = form.getFieldsError(['username']);
      !forms.errors.length && setCodeDisable(false);
    }

    // 更新之后销毁上一个
    return () => {
      if (timerRef.current) {
        // console.log('销毁', timeNum);
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeNum]);

  // 邮箱下拉
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
    // console.log(rules, value, callback);

    if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback();
      !timeNum && setCodeDisable(false);
    } else {
      callback(new Error('请输入正确的邮箱'));
      setCodeDisable(true);

      // return {
      //   pattern: false,
      //   message: '',
      // };
    }
  };

  // 校验密码
  const valPwd = (rules, value, callback) => {
    const forms = form.getFieldsValue(true);
    // console.log(rules, value, callback, forms);

    if (!value) {
      callback(new Error('请输入密码'));
      return;
    }

    if (value.length < 6) {
      callback(new Error('请输入超过6位的密码'));
      return;
    }

    if (forms.password === forms.repassword) {
      // form.setFieldValue('repassword', forms.repassword);   // 设置其它input值
      // 设置其它input 所有信息集
      form.setFields([
        {
          name: 'repassword',
          // value: e.target.value,
          errors: null,
        },
      ]);

      form.setFields([
        {
          name: 'password',
          // value: e.target.value,
          errors: null,
        },
      ]);

      callback();
    } else {
      callback(new Error('请确保两次输入的密码一样'));
    }
  };

  // 邀请码校验
  const valInventCode = (rules, value, callback) => {
    const valueTmp = value;
    if (valueTmp === inventCode) {
      callback();
    } else {
      callback(new Error('请联系邀请人索取邀请码'));
    }
  };

  // 提交
  const onFinish = async (values: any) => {
    const res: any = await register({
      username: values.username,
      password: values.password,
      captcha: values.emailCode,
      isLogin: true,
    });

    if (isSuccess(res.code)) {
      setUserName(values.username);
      setToken(res.data.token);
      message.success({
        content: '注册成功，即将自动登陆并跳转访问页面',
      });
    } else {
      message.error({
        content: res.data || '注册失败，请稍后重试',
      });
      return;
    }

    setTimeout(() => {
      if (urlData?.from) {
        window.location.href = urlData.from;
      }
      navigate('/');
    }, 3000);

    // console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.loginWarp}>
      <div className={styles.innerWarp}>
        <Form form={form} name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, validator: valUserName }]}>
            <AutoComplete
              placeholder="请输入邮箱用户名"
              prefix={<UserOutlined />}
              onSearch={handleSearch}
              options={options}
            />
          </Form.Item>

          <Form.Item name="emailCode" rules={[{ required: true, message: '请输入邮箱验证码' }]}>
            <Row gutter={8} wrap={false}>
              <Col flex={2}>
                <Input
                  minLength={6}
                  maxLength={6}
                  prefix={<CodeOutlined />}
                  type="text"
                  placeholder="请输入邮箱验证码"
                />
              </Col>
              <Col flex={1}>
                <Button onClick={sendCode} disabled={codeDisable}>
                  {timeNum ? `${timeNum}秒后重新发送` : '发送验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, validator: valPwd }]}>
            <Input.Password
              minLength={6}
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item name="repassword" rules={[{ required: true, validator: valPwd }]}>
            <Input.Password
              minLength={6}
              prefix={<LockOutlined />}
              type="password"
              placeholder="请再次输入密码"
            />
          </Form.Item>

          <Form.Item name="inventCode" rules={[{ required: true, validator: valInventCode }]}>
            <Input
              minLength={6}
              prefix={<LockOutlined />}
              type="text"
              placeholder="邀请码找推荐你的人索取"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住状态</Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              注册&登录
            </Button>
            或
            <Link
              to={{
                pathname: '/login',
              }}
            >
              去登录
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(Regiest);
