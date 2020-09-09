import { gql } from 'apollo-boost';
export const EPISODES = gql`
  query MyQuery {
    episodes (first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        slug
        date
        id
        episodes_gql {
          duration
          embed
          episodeThumbnail {
            sourceUrl
          }
          excerpt
          information
        }
      }
    }
  }
`;
