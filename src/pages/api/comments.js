import { GraphQLClient, gql } from 'graphql-request'

// HOST KEY API

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments ( req, res ) {

  // Acessando API GraphCMS com TOKEN authorization

  const graphQLClient = new GraphQLClient( graphQLAPI, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
    }
  });

  // Query mutation - CreateComment

  const query = gql`
    mutation CreateComment( $name: String!, $email: String!, $comment: String!, $slug: String! ) {
      createComment (
        data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }
      ) { 
        id 
      }
    }
  `;

  // Verificações de tentativas e erros da requisição post

  try {

    const result = await graphQLClient.request( query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug
    });

    return res.status(200).send(result);

  } catch(err) {

    console.log(err);
    return res.status(500).send(err);

  }

};