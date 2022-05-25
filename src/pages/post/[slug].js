import { useRouter } from 'next/router'
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loaded } from '../../components'
import { getPosts, getPostDetails } from '../../../services/graphql'


// Página de detalhes da nossa postagem

/* Molde de nossa página por componentes, que recebe dados de nossa postagem de acordo com o 
slug */

const PostDetails = ({ post }) => {

  /* Verifica fallback para retornar o loading animado */

  const router = useRouter();

  if(router.isFallback){
    return <Loaded/>;
  }

  return(
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default PostDetails

/* Recebe detalhes de uma postagem específica através do slug */

export const getStaticProps = async ({ params }) => {
  
  const post = await getPostDetails(params.slug);
  
  return {
    props: { post }
  }
}

/* Pega o slug de uma postagem e joga em params, para retornar os detalhes de uma postagem
através do seu slug */

export const getStaticPaths = async ( ) => {
  
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true
  }

}