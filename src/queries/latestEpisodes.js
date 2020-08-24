import { gql } from 'apollo-boost';
export const LATEST_EPISODES = gql`
   query MyQuery {
    episodes(last: 3) {
    nodes {
      episodes_gql {
        episodeThumbnail {
          sourceUrl
        }
        embed
      }
      title
      slug
    }
  }
}
`;



