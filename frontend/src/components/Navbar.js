import React from 'react'
import {
  Button,
  Layout,
  Typography,
  Col,
  Row,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Header } = Layout
const { Title, Text } = Typography

const Navbar = ({ loggedIn, username, onLogout }) => {
  const navigate = useNavigate()

  return (
    <Header>
      <Row align="middle">
        <Col span={16}>
          <Title level={2}><p style={{ color: 'white' }}>Campuswire Lite</p></Title>
        </Col>
        { loggedIn
          ? (
            <>
              <Col span={4}>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <Text style={{ color: 'white' }}>Welcome <b>{username}</b></Text>
              </Col>
              <Col span={4} align="right">
                <Button onClick={onLogout}>
                  Logout
                </Button>
              </Col>
            </>
          )
          : (
            <Col span={8} align="right">
              <Button onClick={() => navigate('/login')}>
                Signin
              </Button>
            </Col>
          )}
      </Row>
    </Header>
  )
}

export default Navbar
