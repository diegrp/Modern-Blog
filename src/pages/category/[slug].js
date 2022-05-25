import { useRouter, Router } from 'next/router'
import Head from 'next/head'
import { getCategories, getCategoryPost } from '../../../services/graphql'
import { PostCard, Categories, Loaded } from '../../components'

// Postagens de determinada categoria

const CategoryPost = ({ posts }) => {
  
  /* Verifica fallback para retornar o loading animado */
  
  const router = useRouter();

  if (router.isFallback) {
    return <Loaded/>
  }

  const catName = router.asPath.slice(10);
  
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Modern Blog - {catName[0].toUpperCase() + catName.substring(1)}</title>
        <link rel="ico" href="./favicon.icon" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  )

}

export default CategoryPost

/* Recebe posts pela sua categoria através do slug */

export const getStaticProps = async ({ params }) => {
  
  const posts = await getCategoryPost( params.slug );

  return {
    props: { posts }
  }

};

/* Pega o slug da categoria e joga em params, para retornar os posts de acordo
com a categoria pelo slug */

export const getStaticPaths = async ( ) => {
  
  const categories = await getCategories();

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true
  }

};