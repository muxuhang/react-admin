import React, { useState } from 'react'
import Router from 'next/router'
import { Popover } from '@material-ui/core'


const Logs = (props) => {
  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2}>
        <Typography>The content of the Popover.</Typography>
      </Box>
    </Popover>
  )
}

export default Logs
