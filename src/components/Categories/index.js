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
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl font-semibold border-b pb-4 mb-8">
        Categorias
      </h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={`cursor-pointer block ${ index === category.length - 1 ? 'border-b-0' : 'border-b' } pb-3 mb-3`}>{category.name}</span>
        </Link>
      ))}
    </div>
  )
  
}

