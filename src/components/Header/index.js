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
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left text-center">
          <Link href="/">
            <span className="cursor-pointer text-4xl text-white font-bold">Modern Blog - GraphCMS</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 ml-4 align-middle text-white font-semibold cursor-pointer">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}