import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin, Typography, Button, Modal } from 'antd';

const Component = observer(() => {
  const { myUploadStore } = useStores()
  const { Text } = Typography;

  useEffect(() => {
    return () => {  // 卸载
      myUploadStore.unmount()
    }
  }, [])

  const loadMore = () => { myUploadStore.find() }

  const download = (item) => {
    const FileSaver = require('file-saver');
    FileSaver.saveAs(item.attributes.url.attributes.url, item.attributes.filename);
  }

  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [chosenId,setId]=React.useState(0)

  const handleCancel = () => {
    setVisible(false)
  }
  const handleOk = (item) => {
    setConfirmLoading(true);
    myUploadStore.delete(item.id)
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      myUploadStore.unmount()
    }, 1000);
  }

  return (
    <InfiniteScroll
      initialLoad={true}
      pageStart={0}
      loadMore={loadMore}
      hasMore={!myUploadStore.isLoading && myUploadStore.hasMore}
      useWindow={true}
    >
      <List
        dataSource={myUploadStore.list}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.attributes.filename}
              description={<Text copyable={{ tooltips: ['复制', '复制成功!'] }}>{item.attributes.url.attributes.url}</Text>}
            />
            <div>
              <Button type="link"><a target='_blank' href={item.attributes.url.attributes.url}>预览</a></Button>
              <Button type="link" onClick={() => { download(item) }}>下载</Button>
              <Button type="link" danger onClick={() => {
                setVisible(true)
                setId(item)
                }}>删除</Button>
              <Modal
                title="提示"
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={()=>handleOk(chosenId)}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                width={300}
              ><p>是否删除此文件 ？</p></Modal>
            </div>
          </List.Item>
        )}
      >
        {myUploadStore.isLoading && myUploadStore.hasMore && (
          <div>
            <Spin size="large" tip='加载中' />
          </div>
        )}
      </List>
    </InfiniteScroll >
  )
})

export default Component