import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { getRecentPosts, getSimilarPosts } from '../../../services/graphql'

// Posts - Relacionados e Recentes

export const PostWidget = ({ slug, categories }) => {

  const [ relatedPosts, setRelatedPosts ] = useState([]);

  /* Altera os estados após receber posts recents e similares, através do slug e categories */ 
  
  useEffect(() => {
    if ( slug ) {
      getSimilarPosts( slug, categories ).then( (result) => setRelatedPosts(result) );
    } else {
      getRecentPosts().then( (result) => setRelatedPosts(result) );
    }
  },[ slug, categories ]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl font-semibold border-b pb-4 mb-8">
        { slug ? "Postagens Relacionadas" : "Postagens Recentes" }
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              unoptimized
              src={post.featuredImage.url}
              alt={post.title}
              width="60px"
              height="60px"
              className="align-middle rounded-full"
            />
          </div>
          <div className="flex-grow ml-2">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </p>
            <Link key={index} href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )

}