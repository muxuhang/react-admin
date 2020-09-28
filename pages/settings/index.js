import React, { useEffect, useState } from 'react'

import Container from '@material-ui/core/Container'
import Layout from '../../components/layout'
import network from '../../utils/network'

const Settings = () => {
  const [settings, setSettings] = useState('')
  useEffect(() => {
    getSettings()
  }, [])
  const getSettings = () => {
    network('get', '/admin/settings', null, (res) => {
      console.log(res);
      setSettings(res.data)
    })
  }
  return (
    <Layout title='设置'>
      <Container maxWidth="md">
        1111
      </Container>
    </Layout>
  )
}

export default Settings
