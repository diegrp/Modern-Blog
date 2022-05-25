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
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Comentários
          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 mb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {' '}
                  em
                  {' '}
                  {moment(comment.createdAt).format('DD MMM YYYY')}
                </p>
                <p className="whitespace-pre-line w-full text-gray-600">{parser(comment.comment)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  )
}