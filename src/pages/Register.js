import React from 'react';
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import { useStores } from '../stores'
import { useHistory } from 'react-router-dom';

const Border = styled.div`
margin:30px auto;
box-shadow:2px 2px 4px 0 rgba(0,0,0,0.2);
border-radius:4px;
padding:20px;
max-width:600px;
background-color:#eeeeee;
`
const Title = styled.h1`
text-align:center;
margin: 10px;
`

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8, span: 16,
  },
};

const Register = () => {
  const { authStore } = useStores()
  const history=useHistory()
  const onFinish = values => {
    console.log('Success:', values);
    authStore.setUsername(values.username)
    authStore.setPassword(values.password)
    authStore.register().then(() => {history.push('/')}).catch(() => {console.log('注册失败')})
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Border>
      <Title>注册</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true, message: '您还未输入用户名',
            },
            {
              validator: (rule, value) => {
                if (/\W/.test(value)) return Promise.reject('只能是字母数字和下划线');
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input placeholder="请输入用户名" allowClear />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true, message: '您还未输入密码',
            },
            {
              min: 6, message: '最少6个字符'
            },
          ]}
        >
          <Input.Password placeholder="请设置密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true, message: '您还未输入密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不一致');
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认密码" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
        </Button>
        </Form.Item>
      </Form>
    </Border >
  );
};

export default Register