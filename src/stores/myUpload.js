import { observable, action } from 'mobx';
import { message } from 'antd';
import { Uploader } from '../models';

class MyUploadStore {
  @observable list = []
  @observable isLoading = false
  @observable hasMore = true
  @observable page = 0

  @action find() {
    this.isLoading = true
    Uploader.find({ page: this.page, limit: 15 })
      .then(newList => {
        this.list = this.list.concat(newList)
        this.page++
        if (newList.length < 15) {
          this.hasMore = false
        }
      }).catch(error => {
        message.error('加载数据失败')
      }).finally(() => {
        this.isLoading = false
      })
  }

  @action delete(id){
    Uploader.delete(id)
  }

  @action unmount() {
    this.list = []
    this.isLoading = false
    this.hasMore = true
    this.page = 0
  }
  @action reset() {
    this.list = []
    this.page = 0
  }

}

const myUploadStore = new MyUploadStore()
export { myUploadStore }