import Head from 'next/head'
import '../../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Modern Blog - Blogger with deployments and their appropriate categories</title>
        <link rel="ico" href="./favicon.icon" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
