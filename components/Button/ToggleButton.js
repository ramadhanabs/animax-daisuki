import React from 'react'
import { css, cx } from '@emotion/css'
import { CheckCircleTwoTone, BookTwoTone } from '@ant-design/icons'
import { useRouter } from 'next/router'

const collectionWrapper = css({
  cursor: 'pointer',
  marginTop: '8px',
  width: '100%',
  background: '#fff',
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  borderRadius: '8px',
  border: '1px solid lightgray',
  transition: 'all ease-in-out 0.1s',
  textDecoration: 'none',
  ':hover': {
    border: '1px solid #7dc3f5',
    transition: 'all ease-in-out 0.1s'
  },
  ':disabled': {
    opacity: '0.5',
    cursor: 'not-allowed'
  }
})

const activeCx = css({
  color: '#7dc3f5',
  backgroundColor: '#edf5fa',
  border: '1px solid #7dc3f5',
  transition: 'all ease-in-out 0.1s'
})

const ToggleButton = ({ label, active, disabled, ...others }) => {
  const router = useRouter()

  const handleNavigation = (e, name) => {
    e.stopPropagation()

    router.push(`/collection/detail/${name}`)
  }
  return (
    <button
      className={cx(collectionWrapper, active && activeCx)}
      disabled={disabled}
      {...others}
    >
      <a
        className={css({
          marginBottom: '0px',
          ':hover': {
            textDecoration: 'underline'
          }
        })}
        onClick={(e) => handleNavigation(e, label)}
      >
        {label}
      </a>
      {active && <CheckCircleTwoTone twoToneColor="#52c41a" />}
      {disabled && (
        <p style={{ marginBottom: '0px' }}>
          {' '}
          <BookTwoTone
            twoToneColor="#52c41a"
            style={{ marginRight: '4px' }}
          />{' '}
          Added
        </p>
      )}
    </button>
  )
}

export default ToggleButton
