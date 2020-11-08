import { observable, action } from 'mobx';
import { Auth } from '../models'
import { message } from 'antd';
import { userStore } from './user'
import { fileStore } from './file';
import { myUploadStore } from './myUpload';

class AuthStore {
  @observable values = {
    username: '',
    password: '',
  };

  @action setUsername(username) {
    this.values.username = username
  };

  @action setPassword(password) {
    this.values.password = password
  };

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          userStore.pullUser()
          resolve(user) 
        }).catch(error => {
          message.error('登录失败')
          userStore.reset()
          reject(error)
        })
    })
  };

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          userStore.pullUser()
          resolve(user)
        }).catch(error => {
          message.error('注册失败')
          userStore.reset()
          reject(error)
        })
    })
  }

  @action logout() {
    Auth.logout()
    userStore.reset()
    fileStore.reset()
    myUploadStore.reset()
  }
}
const authStore = new AuthStore()
export { authStore }