import { gql } from 'apollo-boost';
export const EPISODES = gql`
  query MyQuery {
    episodes {
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
