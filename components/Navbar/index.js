import React from 'react'
import Link from 'next/link'
import { Row } from 'antd'
import { css, cx } from '@emotion/css'
import { TeamOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const root = css({
  position: 'fixed',
  zIndex: 1,
  background: '#fff',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  boxShadow: '0px 2px 8px rgba(38, 68, 103, 0.08)'
})

const navButton = css({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '8px',
  marginLeft: '8px',
  ':hover': { backgroundColor: '#edf5fa' }
})

const buttonText = css({
  display: 'none',
  marginBottom: '0px',
  marginLeft: '4px',
  '@media (min-width: 420px)': {
    display: 'block'
  }
})

const active = css({
  backgroundColor: '#edf5fa',
  fontWeight: 600,
  color: '#2c8cd1'
})

const Navbar = () => {
  const router = useRouter()
  const { pathname } = router

  return (
    <nav className={cx(root)}>
      <div
        style={{
          width: '768px'
        }}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '16px'
          })}
        >
          <Link
            className={css({
              height: 'auto'
            })}
            href="/"
          >
            <img
              className={css({
                height: 'auto',
                width: '150px',
                objectFit: 'cover',
                cursor: 'pointer'
              })}
              src="/logo-animax.png"
              alt="logo-animax"
            />
          </Link>
          <Row align="middle">
            <Link href="/">
              <a className={cx(navButton, pathname === '/' && active)}>
                <TeamOutlined />
                <p className={cx(buttonText)}>Anime</p>
              </a>
            </Link>
            <Link href="/collection">
              <a
                className={cx(navButton, pathname === '/collection' && active)}
              >
                <FolderOpenOutlined style={{ marginRight: '4px' }} />
                <p className={cx(buttonText)}>Collection</p>
              </a>
            </Link>
          </Row>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
