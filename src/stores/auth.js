import { observable, action } from 'mobx';


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
    console.log('login')
  };

  @action register() {
    
  }

  @action logout() {
    
  }
}
const authStore = new AuthStore()
export { authStore }