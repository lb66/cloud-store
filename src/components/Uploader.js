import React from 'react'
import { useStores } from '../stores'
import { observer } from 'mobx-react'
import { Upload, message, Spin, Typography, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const { Dragger } = Upload;
const { Text } = Typography;

const Border = styled.div`
margin-top:20px;
border:1px dashed #d9d9d9;
padding:20px;
background:#fafafa
`

const Component = observer(() => {
  const { fileStore } = useStores()

  const props = {
    //手动上传
    beforeUpload: (file) => {
      window.file = file
      if (file.size > 10485760) {
        message.error('上传文件不能大于10M！');
        return false
      }
      fileStore.setFile(file)
      fileStore.setFilename(file.name)
      fileStore.upload()
        .then((serverFile) => {
          message.success('上传成功')
          console.log('上传成功', serverFile)
        })
        .catch((error) => {
          message.error('上传失败')
          console.log('上传失败', error)
        })
      return false;
    },
    showUploadList: false
  }

  return (
    <div>
      <Spin tip='上传中' spinning={fileStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击选择文件 / 将图文件拖入此虚线框</p>
          <p className="ant-upload-hint">支持xxx格式</p>
        </Dragger>
      </Spin>
      <div>
        {/* 调试用window.stores.serverFile找url路径 */}
        {
          fileStore.serverFile ? <Border>
            <h2 style={{ textAlign: 'center' }}>{fileStore.filename}</h2>
            <dl>
              <dd>
                地址 : <Text copyable={{ tooltips: ['复制', '复制成功!'] }}>
                  {fileStore.serverFile.attributes.url.attributes.url}
                </Text>
              </dd>
              <br />
              <dd>
                <Button style={{ marginRight: '20px' }}><a target='_blank' href={fileStore.serverFile.attributes.url.attributes.url} >预览</a></Button>
                <Button> <a download={fileStore.filename} href={fileStore.serverFile.attributes.url.attributes.url} >下载</a></Button>
              </dd>
            </dl>
          </Border> : null
        }
      </div>
    </div >
  )
})

export default Component

