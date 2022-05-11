import React from 'react'
import { css, cx } from '@emotion/css'
import { Row } from 'antd'

const Card = (props) => {
  const { children } = props
  return (
    <div
      className={css({
        padding: '24px',
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'start',
        marginBottom: '20px',
        borderRadius: '10px'
      })}
    >
      {children}
    </div>
  )
}

export default Card
