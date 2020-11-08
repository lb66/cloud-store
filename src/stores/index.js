import { createContext, useContext } from 'react'
import { authStore } from './auth'
import { userStore } from './user'
import { fileStore } from './file'
import {myUploadStore} from './myUpload'

window.stores = { authStore, userStore, fileStore,myUploadStore }//控制台调试用

const context = createContext({ authStore, userStore, fileStore,myUploadStore })
// useContext获取context的值以及订阅context的变化
const useStores = () => useContext(context)
export { useStores }