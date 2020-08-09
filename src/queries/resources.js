import { gql } from 'apollo-boost';
export const RESOURCES = gql`
    query MyQuery {
    resources {
      nodes {
        resources_gql {
          description
          file {
            mediaItemUrl
          }
          thumbnail {
            sourceUrl
          }
        }
        slug
        title
      }
    }
  }
`;
