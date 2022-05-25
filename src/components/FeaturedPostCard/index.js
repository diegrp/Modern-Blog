import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

export const FeaturedPostCard = ({ post }) => {

  // Carousel Card - Posts Publicados - imagem do author, nome do autor, quando foi criado o post e título do post 

  return (
    <div className="relative h-72">
      <div className="absolute rounded-lg shadow-md bg-center bg-no-repeat bg-cover inline-block w-full h-72" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
      <div className="absolute flex flex-col rounded-lg p-4 items-center justify-center w-full h-full">
        <p className="text-white mb-4 text-xs text-shadow font-semibold">{moment(post.createdAt).format('DD MMM YYYY')}</p>
        <p className="text-white mb-4 text-center text-shadow text-2xl font-semibold">{post.title}</p>
        <div className="absolute flex items-center justify-center bottom-5 w-full">
          <Image
            unoptimized
            src={post.author.photo.url}
            alt={post.author.name}
            width="30px"
            height="30px"
            className="align-middle rounded-full drop-shadow-lg"
          />
          <p className="inline align-middle text-white text-shadow font-medium ml-2">{post.author.name}</p>
        </div>
      </div>
        <Link href={`/post/${post.slug}`}><span className="absolute cursor-pointer w-full h-full" /></Link>
    </div>
  )

}