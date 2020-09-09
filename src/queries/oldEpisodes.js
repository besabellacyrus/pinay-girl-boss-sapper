import { gql } from 'apollo-boost';
export const OLD_EPISODES = gql`
  query MyQuery($last: Int, $before: String, $first: Int, $after: String) {
    episodes(last: $last, first: $first, before: $before, after: $after) {
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
