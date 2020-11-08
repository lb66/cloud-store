import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import Uploader from '../components/Uploader'
import { Alert } from 'antd'


const Home = observer(() => {
  const { userStore } = useStores();

  return (
    <>
      {
        userStore.currentUser ? <>Hello , {userStore.currentUser.attributes.username}<br /></> : <Alert message="请登录后再上传文件" type="warning" showIcon />
      }
      <br />
      <Uploader />
    </>
  )
})

export default Home