import { gql } from 'apollo-boost';
export const PAGE = gql`
  query MyQuery($slug: ID!) {
    page(id: $slug, idType: URI) {
      slug
      status
      title
      content
    }
  }
`;
