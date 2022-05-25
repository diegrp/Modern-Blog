/* eslint-disable @next/next/no-img-element */

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import moment from 'moment'

// Detalhes da Postagem

/* Detalhes da minha postagem específica através do seu seu slug */

export const PostDetail = ({ post }) => {

  const getContentFragment = ( index, text, obj, type ) => {

    let modifiedText = text;

    if ( obj ) {
      if ( obj.bold ) {
        modifiedText = ( <b key={index}>{text}</b> );
      }
      if ( obj.italic ) {
        modifiedText = ( <em key={index}>{text}</em> );
      }
      if ( obj.underline ) {
        modifiedText = ( <em key={index}>{text}</em> );
      }
    }

    switch ( type ) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>
      case 'image':
        return (
          <Image
            key={index}
            src={obj.src}
            alt={obj.title}
            width={obj.width}
            height={obj.height}
          />
        )
      default:
        return modifiedText;
    }
  };

  return (
    <div>
      
    </div>
  )

}