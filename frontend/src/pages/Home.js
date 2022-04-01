/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react'

import {
  Form,
  Layout,
  Menu,
  Button,
  Typography,
  Input,
} from 'antd'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NewPost from '../components/NewPost'

const { Content, Sider } = Layout
const { Text } = Typography

const Home = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
  const [questions, setQuestions] = useState([])
  const [username, setUsername] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState({})
  const [questionKey, setQuestionKey] = useState(NaN)
  const [visible, setVisible] = useState(false)

  const onLogout = async () => {
    try {
      await axios.post('/account/logout')
      setAuth(false)
    } catch (e) {
      // console.log(e)
    }
  }

  const getQuestions = async () => {
    const qRes = await axios.get('/api/questions')
    // console.log(qRes.data)
    setQuestions(qRes.data)
  }

  useEffect(() => {
    setSelectedQuestion(questions[questionKey])
  }, [questionKey])

  useEffect(async () => {
    try {
      const res = await axios.get('/isLoggedIn')
      setUsername(res.data.username)
      setAuth(true)
    } catch {
      setAuth(false)
    }
    await getQuestions()
  }, [])

  const submitAnswer = async values => {
    const { answer } = values
    const { _id } = selectedQuestion
    try {
      await axios.post('/api/questions/answer', { _id, answer })
      window.location.reload(false)
    } catch (e) {
      // todo: created alert if failed to answer
      console.log(e)
    }
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Navbar loggedIn={auth} username={username} onLogout={onLogout} />
      <Layout>
        <Sider width={200}>
          <Menu
            // onSelect={key => selectedQuestion(questions[parseInt(key, 10)])}
            onSelect={({ key }) => setQuestionKey(parseInt(key, 10))}
            theme="dark"
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
          >
            {questions.map((q, index) => {
              const { _id, questionText, author } = q
              return (
                <Menu.Item key={index}>
                  {questionText}
                </Menu.Item>
              )
            })}
            {auth
              ? (
                <Button onClick={() => setVisible(true)}>
                  New Question
                </Button>
              ) : <Link to="/login">Sign in to ask</Link>}
          </Menu>
          <NewPost
            visible={visible}
            onCancel={() => {
              setVisible(false)
              window.location.reload(false)
            }}
            key="newPost"
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {selectedQuestion !== undefined
            ? (
              <>
                <Text>
                  <b>Author:</b> {selectedQuestion.author}
                </Text>
                <br />
                <Text>
                  <b>Question:</b> {selectedQuestion.questionText}
                </Text>
                <br />
                { selectedQuestion.answer ? (
                  <Text>
                    <b>Answer:</b> {selectedQuestion.answer}
                  </Text>
                ) : auth
                  ? (
                    <Form name="answer" onFinish={submitAnswer}>
                      <Form.Item label="answer" name="answer" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Text>
                      You must be logged in to answer a question
                    </Text>
                  ) }
              </>
            )
            : null }
        </Content>
      </Layout>
    </Layout>

  )
}

export default Home
