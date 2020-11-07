import React from 'react';
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import { useStores } from '../stores'
import { useHistory } from 'react-router-dom';

const Border = styled.div`
margin:30px auto;
box-shadow:2px 2px 10px 0 rgba(0,0,0,0.2);
border-radius:4px;
padding:20px;
max-width:600px;
background-color:#eeeeee;
`
const Title = styled.h1`
text-align:center;
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

const Login = () => {
  const { authStore } = useStores()
  const history=useHistory()
  const onFinish = values => {
    console.log('Success:', values);
    authStore.setUsername(values.username)
    authStore.setPassword(values.password)
    authStore.login().then(() => {history.push('/')}).catch(() => {console.log('登录失败')})

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Border>
      <Title>登录</Title>
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
          ]}
        >
          <Input.Password placeholder="请输入密码" />
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

export default Login