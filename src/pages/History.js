import React from 'react'
import List from '../components/List'
import { useStores } from '../stores/index'
import { Alert } from 'antd'

function History() {
  const { userStore } = useStores()
  return (
    <>
      {
        userStore.currentUser ? <List /> : <Alert message="登录即可查看上传历史" type="warning" showIcon />
      }
    </>
  )
}

export default History