import React from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd'

const LoginForm = ({ name, onFinish, onFinishFailed }) => (
  <Form
    name={name}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    style={{ flex: 1 }}
  >
    <Form.Item label="username" name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="password" name="password" rules={[{ required: true }]}>
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>

  </Form>
)

export default LoginForm
