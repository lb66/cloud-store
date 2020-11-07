import React, { useEffect } from 'react'
import logo from '../logo.svg'
import styled from 'styled-components'
import { NavLink, useHistory } from 'react-router-dom'
import { Button } from 'antd';
import { useStores } from '../stores'
import { observer } from 'mobx-react'


const StyleHeader = styled.header`
background-color:#303841;
display:flex;
align-items:center;
padding:10px 5vw;
`
const StyleLogo = styled.img`
height:25px;
`
const StyleLink = styled(NavLink)`
color:#fff;
margin-left:3vw;
&.active{
  border-bottom:1px solid #fff;
}
`
const StyleDiv = styled.div`
  margin-left:auto;
  color:orange;
`
const StyleButton = styled(Button)`
  margin-left:10px;
`
const Header = observer(() => {
  const { userStore, authStore } = useStores()
  const history = useHistory()
  const clickLogout = () => {
    authStore.logout()
  }
  const clickLogin = () => {
    history.push('./login') //跳转到登录页
  }
  const clickRegister = () => {
    history.push('./register') //跳转到注册页
  }
  //每次刷新页面去抓取当前用户登录状态
  useEffect(() => {
    userStore.pullUser();
  },[])

  return (
    <StyleHeader>
      <StyleLogo src={logo} />
      <nav>
        <StyleLink to='/' activeClassName='active' exact>首页</StyleLink>
        <StyleLink to='/history' activeClassName='active'>历史</StyleLink>
      </nav>
      <StyleDiv>
        {
          userStore.currentUser ? <>
            {userStore.currentUser.attributes.username} <StyleButton ghost onClick={clickLogout}>注销</StyleButton>
          </> : <>
              <StyleButton type="primary" onClick={clickLogin}>登录</StyleButton>
              <StyleButton type="primary" onClick={clickRegister}>注册</StyleButton>
            </>
        }
      </StyleDiv>
    </StyleHeader>
  )
})

export default Header