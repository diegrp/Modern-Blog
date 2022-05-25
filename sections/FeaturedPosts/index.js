import { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { FeaturedPostCard } from '../../src/components'
import { getFeaturedPosts } from '../../services/graphql'


// Responsive Carousel breakpoints e items

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
}

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

  // Botão direito de avaçado do carousel

  const CustomRightArrow = ({ onClick, ...rest }) => {

    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;

    return ( 
      <button 
        onClick={() => onClick()}
        className="absolute flex items-center justify-center arrow-btn right-0 text-center py-3 cursor-pointer bg-rose-600 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    );

  };

  // Botão esquerdo de avaçado do carousel

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;

    return ( 
      <button 
        onClick={ () => onClick() }
        className="absolute flex items-center justify-center arrow-btn left-0 text-center py-3 cursor-pointer bg-rose-600 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
    );

  };

  // Carousel
  
  /* Configurações e recolhimento de componentes e dados para nosso carousel */

  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={<CustomLeftArrow/>}
        customRightArrow={<CustomRightArrow/>}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        ))}
      </Carousel>
    </div>
  )

}