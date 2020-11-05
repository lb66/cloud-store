import { createContext, useContext } from 'react'
import { authStore } from './auth'



window.stores = { authStore }

const context = createContext({ authStore})
// useContext获取context的值以及订阅context的变化
const useStores = () => useContext(context)
export { useStores }