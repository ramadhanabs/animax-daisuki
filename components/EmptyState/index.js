import React from 'react'
import { css, cx } from '@emotion/css'
import { FrownOutlined } from '@ant-design/icons'

const root = css({
  marginTop: '48px',
  textAlign: 'center',
  color: 'lightgray',
  width: '100%'
})

const heading = css({
  fontSize: '20px',
  marginBottom: '4px',
  fontWeight: 600
})

const subHeading = css({
  fontSize: '12px',
  marginBottom: '4px'
})

const EmptyState = () => {
  return (
    <div className={cx(root)}>
      <FrownOutlined size="large" style={{ fontSize: '24px' }} />
      <p className={cx(heading)}>Whoops</p>
      <p className={cx(subHeading)}>Nothing to see here...</p>
    </div>
  )
}

export default EmptyState
