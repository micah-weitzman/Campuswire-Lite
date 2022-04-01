import React from 'react'
import {
  Modal,
  Form,
  Input,
  Button,
} from 'antd'

import axios from 'axios'

const NewPost = ({ visible, onCancel }) => {
  const onFinish = async values => {
    const { questionText } = values
    try {
      await axios.post('/api/questions/add', { questionText })
      onCancel()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal
      title="New Post"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>]}
    >
      <Form
        name="newPost"
        onFinish={onFinish}
      >
        <Form.Item label="Question" name="questionText" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  )
}

export default NewPost
