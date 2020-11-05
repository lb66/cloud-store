import React from 'react'
import logo from '../logo.svg'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd';


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
function Header() {
  return (
    <StyleHeader>
      <StyleLogo src={logo} />
      <nav>
        <StyleLink to='/' activeClassName='active' exact>首页</StyleLink>
        <StyleLink to='/history' activeClassName='active'>历史</StyleLink>
      </nav>
      <StyleDiv>
        <StyleButton type="primary">登录</StyleButton>
        <StyleButton type="primary">注册</StyleButton>
      </StyleDiv>
    </StyleHeader>
  )
}

export default Header