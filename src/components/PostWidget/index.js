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
    <div>
      
    </div>
  )

}