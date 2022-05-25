import { request, gql } from 'graphql-request'

// HOST KEY API

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Minhas postagens

export const getPosts = async ( ) => {

  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              id
              name
              description
              photo {
                url
              }
            }
            title
            excerpt
            slug
            createdAt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request( graphQLAPI, query );
  return result.postsConnection.edges;

};

// Detalhes do meu post específico pelo seu slug

export const getPostDetails = async ( slug ) => {

  const query = gql`
    query GetPostDetails( $slug: String! ) {
      post( where: { slug: $slug } ) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          description
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request( graphQLAPI, query, { slug } );
  return result.post;

};

// Meus posts ativos e publicados

export const getFeaturedPosts = async ( ) => {

  const query = gql`
    query GetCategoryPost() {
      posts( where: { featuredPost: true } ) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await request( graphQLAPI, query );
  return result.posts;

};


// Meus três posts recentemente adicionados

export const getRecentPosts = async ( ) => {

  const query = gql`
    query GetPostDetails() {
      posts( orderBy: createdAt_ASC, last: 3 ) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request( graphQLAPI, query );
  return result.posts;

};

// Meus posts em específico pelo seu slug similares a suas categorias por eles vinculádas. 

export const getSimilarPosts = async ( slug, categories ) => {

  const query = gql`
    query GetPostDetails( $slug: String!, $categories: [ String! ] ) {
      posts( where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }, last: 3 ) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request( graphQLAPI, query, { slug, categories } );
  return result.posts;
};

// Meus posts em específico pelo seu slug, vinculados a determina categoria

export const getCategoryPost = async ( slug ) => {

  const query = gql`
    query GetCategoryPost( $slug: String! ) {
      postsConnection( where: { categories_some: { slug: $slug } } ) {
        edges {
          cursor
          node {
            author {
              id
              name
              description
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request( graphQLAPI, query, { slug } );
  return result.postsConnection.edges;

};

// Minhas categorias 

export const getCategories = async ( ) => {

  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request( graphQLAPI, query );
  return result.categories;

};

// Enviar comentário

/* comentário enviado, ao criar uma requisição em nossa api com methodo post 
e se utilizado de obj com valores retirado do nosso input através do formulário,
ao passo, que usamos o resultado da requisição para validar o envio de nosso
comentário */

export const submitComment = async ( obj ) => {

  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( obj ),
  });

  return result.json();

};

// Meus comentários de determinados posts pelo seu slug

export const getComments = async ( slug ) => {
  
  const query = gql`
    query GetComments( $slug: String! ) {
      comments( where: { post: { slug: $slug } } ) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request( graphQLAPI, query, { slug } );
  return result.comments;

};