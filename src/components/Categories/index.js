import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../../../services/graphql'

// Categoria pelo seu slug - Nome

export const Categories = () => {
  
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    getCategories().then( (newCategories) => setCategories(newCategories) );
  },[]);
  
  return (
    <div>
      
    </div>
  )
}

