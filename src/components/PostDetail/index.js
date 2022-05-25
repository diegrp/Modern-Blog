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
    <div className="bg-white rounded-lg shadow-lg lg:p-8 pb-12 mb-8">
      <Head>
        <title>Modern Blog - {post.title}</title>
        <link rel="ico" href="./favicon.icon" />
      </Head>
      <div className="relative overflow-hidden relative shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top object-cover w-full h-full shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div className="px-8 lg:px-0">
        <div className="flex items-center justify-center mb-8 w-full">
          <div className="flex items-center jusitfy-center mb-4 mr-8 lg:w-auto lg:mb-0">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              width="30px"
              height="30px"
              className="align-middle rounded-full"
            />
            <p className="inline align-middle text-gray-700 font-medium text-lg ml-2">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">{moment(post.createdAt).format('DD MMM YYYY')}</span>
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-8">{post.title}</h1>
        {post.content.raw.children.map(( typeObj, index ) => {
          const children = typeObj.children.map(( item, itemIndex ) => getContentFragment( itemIndex, item.text, item ));
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  )

}