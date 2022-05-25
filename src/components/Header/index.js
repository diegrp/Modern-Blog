import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../../../services/graphql'

// Header - Logo, e categorias dos meus posts

export const Header = () => {

  const [ categories, setCategories ] = useState([]);

  /* o estado recebe as categorias, depois da requisição feita pela query */

  useEffect(() => {
    getCategories().then( (newCategories) => setCategories(newCategories) );
  },[]);

  return (
    <div>
      
    </div>
  )
}