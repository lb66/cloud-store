import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin, Typography, Button } from 'antd';


const Component = observer(() => {
  const { myUploadStore } = useStores()
  const { Text } = Typography;
  useEffect(() => {
    return () => {
      // console.log('卸载')
      myUploadStore.unmount()
    }
  }, [])
  const loadMore = () => { myUploadStore.find() }

  const download=(item)=>{
    const FileSaver = require('file-saver');
    FileSaver.saveAs(item.attributes.url.attributes.url, item.attributes.filename);
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
              <Button type="link" onClick={()=>{download(item)}}>下载</Button>
              <Button type="link" danger>删除</Button>
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