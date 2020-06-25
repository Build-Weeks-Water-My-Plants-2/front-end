import React from 'react';
import {Link} from 'react-router-dom';
import {Header, RightNav, LeftNav} from '../styles/styles';

const Nav = props => {
  return (
    <Header>
      <h1>Plant Parenthood</h1>
      <LeftNav>
        <Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>Home</Link>
        <Link to='/' style={{ padding: '1vw', textDecoration: 'none', color: '#fff' }}>About</Link>
      </LeftNav>
      <RightNav>
        <Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>Sign up</Link>
        <Link to='/login' style={{ padding: '1vw', textDecoration: 'none', color: '#fff' }}>Log in</Link>
      </RightNav>
    </Header>
  )
}

export default Nav;