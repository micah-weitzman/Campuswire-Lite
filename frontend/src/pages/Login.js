import React, { useState } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Typography,
  Alert,
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm'

const Login = () => {
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const [error, setError] = useState(false)

  const onFinish = async values => {
    const { username, password } = values
    try {
      await axios.post('/account/login', { username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
      setErrorText('User login failed')
      setError(true)
    }
  }

  const onFinishFailed = err => {
    console.log(err)
  }

  return (
    <Row type="flex" align="middle">
      <Col span={6} offset={8} style={{ paddingTop: 100 }}>
        { error
          ? (
            <Alert
              message="Error"
              description={errorText}
              type="error"
              showIcon
              closable
              onClose={() => setError(false)}
            />
          )
          : null }
        <Typography.Title> Campuswire Lite </Typography.Title>
        <Typography.Title level={3}> Login </Typography.Title>
        <LoginForm
          name="signup"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
        <Link to="/signup">
          Don&apos;t have an account?
        </Link>
      </Col>
    </Row>
  )
}

export default Login
