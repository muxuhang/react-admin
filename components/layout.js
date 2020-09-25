import React from 'react'
import Nav from './nav'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Nav />
      {children}
    </React.Fragment>
  )
}

export default Layout
