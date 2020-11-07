import AV, { Query,User } from 'leancloud-storage'
AV.init({
  appId: "hbACa0laapfvLgYDNsPOF0X4-9Nh9j0Va",
  appKey: "R1AXOKFIi09Gric7RPae3pWn",
  serverURL: "https://hbaca0la.lc-cn-e1-shared.com"
});

const Auth = {
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error))
    })
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser => resolve(loginedUser), error => reject(error))
    })
  },
  getCurrentUser() {
    return User.current()
  },
  logout() {
    User.logOut()
  }
}

export {Auth}