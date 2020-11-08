import { observable, action } from 'mobx';
import { Uploader } from '../models';


class FileStore {
  @observable file = null
  @observable filename = ''
  @observable isUploading = false
  @observable serverFile = null

  @action setFilename(newFilename) {
    this.filename = newFilename
  }

  @action setFile(newFile) {
    this.file = newFile
  }

  @action upload() {
    this.isUploading = true
    this.serverFile = null
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
        .then(serverFile => {        
          this.serverFile = serverFile
          resolve(serverFile)
        }).catch(err => {
          
          reject(err)
        }).finally(() => {
          this.isUploading = false
        })
    })
  }
  @action reset() {
    this.serverFile = null
    this.isUploading = false
  }
}
const fileStore = new FileStore()
export { fileStore }