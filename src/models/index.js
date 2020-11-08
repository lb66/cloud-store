import AV, { Query, User } from 'leancloud-storage'

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

const Uploader = {
  add(file, filename) {
    const item = new AV.Object('Files')
    const avFile = new AV.File(filename, file)
    item.set('filename', filename)
    item.set('owner', AV.User.current())
    item.set('url', avFile)
    return new Promise((resolve, reject) => {
      item.save().then(serverFile => resolve(serverFile), error => reject(error))
    })
  },
  delete(objectId) {
    const item = AV.Object.createWithoutData('Files', objectId);
    item.destroy();
  }
}

export { Auth, Uploader }