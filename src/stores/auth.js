import { observable, action } from 'mobx';
import { Auth } from '../models'
import { message } from 'antd';

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
          resolve(user) 
        }).catch(error => {
          message.error('登录失败')
          reject(error)
        })
    })
  };

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          resolve(user)
        }).catch(error => {
          message.error('注册失败')
          reject(error)
        })
    })
  }

  @action logout() {

  }
}
const authStore = new AuthStore()
export { authStore }