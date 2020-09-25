import React from 'react'
import Router from 'next/router'
import Container from '@material-ui/core/Container'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 22,
    fontSize: 14,
    padding: '5px 16px',
    marginTop: 32,
  },
  goback: {
    marginTop: 16,
    textAlign: 'center',
  }
})


const Search = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <InputBase
        autoFocus
        fullWidth
        className={classes.root}
        name="search"
        type="search"
        placeholder='输入医生,科室,疾病进行搜索' />
      <div className={classes.goback}>
        <Button onClick={()=>Router.back()}>返回</Button>
      </div>
    </Container>
  )
}

export default Search
