import React from 'react'
import { css, cx } from '@emotion/css'

const root = css({
  width: 'max-content',
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '8px'
})

const contained = css({
  backgroundColor: '#0070c0',
  color: '#fff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#044c8e'
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed'
  }
})

const outlined = css({
  backgroundColor: '#fff',
  color: '#0070c0',
  border: '1px solid #0070c0',
  '&:hover': {
    backgroundColor: '#cfe8fa',
    borderColor: '#044c8e'
  },
  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed'
  }
})

const Button = ({ isOutline, children, ...others }) => {
  return (
    <button className={cx(root, isOutline ? outlined : contained)} {...others}>
      {children}
    </button>
  )
}

export default Button
