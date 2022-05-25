import Head from 'next/head'
import { Layout } from '../components'
import '../../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  return(
    <Layout>
      <Head>
        <title>Modern Blog - Blogger with deployments and their appropriate categories</title>
        <link rel="ico" href="./favicon.icon" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp
