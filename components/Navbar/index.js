import React from 'react'
import Image from 'next/image'
import { css, cx } from '@emotion/css'

const Navbar = () => {
  return (
    <nav
      className={css({
        position: 'fixed',
        zIndex: 1,
        background: '#fff',
        width: '100%'
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: '16px'
        })}
      >
        <div
          className={css({
            height: 'auto'
          })}
        >
          <img
            className={css({
              height: 'auto',
              width: '150px',
              objectFit: 'cover'
            })}
            src="/logo-animax.png"
            alt="logo-animax"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
