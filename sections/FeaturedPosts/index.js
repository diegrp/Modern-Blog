import { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { FeaturedPostCard } from '../../src/components'
import { getFeaturedPosts } from '../../services/graphql'

// Postagens Publicadas

export const FeaturedPosts = () => {
  
  const [ featuredPosts, setFeaturedPosts ] = useState([]);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  // Posts e loading, do nosso carousel

  /* Recebe os posts adicionados e atualiza estado do carregado dessa informação */

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  },[]);

  // Carousel
  
  /* Configurações e recolhimento de componentes e dados para nosso carousel */

  return (
    <div>
      
    </div>
  )

}