import { useState, useEffect } from 'react'
import moment from 'moment'
import parser from 'react-html-parser'

import { getComments } from '../../../services/graphql'

// Comentários - nome do author, quando foi criado e seu comentário

export const Comments = ({ slug }) => {

  const [ comments, setComments ] = useState([]);

  useEffect(() => {
    getComments(slug).then((comments) => setComments(comments));
  },[slug]);

  /* Retorna os comentários de um derterminado post, se tiver ao menos um comentário*/

  return (
    <div>
      
    </div>
  )
}