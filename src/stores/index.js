import { createContext, useContext } from 'react'
import { authStore } from './auth'
import { userStore } from './user'


window.stores = { authStore, userStore }//控制台调试用

const context = createContext({ authStore, userStore })
// useContext获取context的值以及订阅context的变化
const useStores = () => useContext(context)
export { useStores }