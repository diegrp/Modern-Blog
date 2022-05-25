import Head from 'next/head'
import { FeaturedPosts } from '../../sections/FeaturedPosts'
import { getPosts } from '../../services/graphql'
import { PostCard, PostWidget, Categories } from '../components'

// Home - Nossas postagens, categorias, posts recentes e relacionados 

const Home = ({ posts }) => {

  return(
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Modern Blog - Utilizando GraphQL, SASS e Multi-carousel</title>
        <link rel="ico" href="./favicon.icon" />
      </Head>
      <FeaturedPosts/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}        
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={posts.slug} categories={posts.map((category) => category.slug)} />
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Home

/*
  Recebe todas as nossas postagens pela query requisitada
*/

export const getStaticProps = async () => {
  
  const posts = ( await getPosts() ) || [];

  return {
    props: { posts }
  }

}