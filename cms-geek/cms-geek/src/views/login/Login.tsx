import React from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd';
import '@/styles/views/login.less'

const Login = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={require('@/assets/imgs/logo.png')} alt="" />
          {/* 登录表单 */}
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={(err: any) => message.error('用户名或密码不能为空！')}
            autoComplete="off"
          >
            <Form.Item name="username" rules={[{ type: 'string', whitespace: true, required: true, message: '用户名不能为空!' }]}>
              <Input size="large" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ type: 'string', whitespace: true, required: true, message: '密码不能为空!' }]}>
              <Input.Password size="large" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item name='remember' valuePropName="checked" >
              <Checkbox className="login-checkbox-label">
                我已阅读并同意「用户协议」和「隐私条款」
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
