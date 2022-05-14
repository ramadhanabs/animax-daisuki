import 'antd/dist/antd.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { css, cx } from '@emotion/css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center'
        })}
      >
        <Head>
          <title>Animax - Anime List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main
          className={css({
            width: '768px'
          })}
        >
          <Component {...pageProps} />
        </main>
      </div>
    </ApolloProvider>
  )
}

export default MyApp
