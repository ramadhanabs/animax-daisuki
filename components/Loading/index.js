import React from 'react'
import { Spin } from 'antd'
import { css, cx } from '@emotion/css'

const Loading = () => {
  return (
    <div
      className={css({
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Spin size="large" />
    </div>
  )
}

export default Loading
