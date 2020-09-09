import { gql } from 'apollo-boost';
export const EPISODE = gql`
  query MyQuery($slug: ID!) {
    episode(id: $slug, idType: URI) {
      title
      slug
      date
      id
      episodes_gql {
        duration
        embed
        resources
        sponsors
        facebook
        facebookGroup
        instagram
        twitter
        episodeThumbnail {
          sourceUrl
        }
        information
        speaker {
          ... on Author {
            id
            title
            authors_gql {
              bio
              facebook
              fieldGroupName
              instagram
              linkedin
              name
              surname
              profession
            }
          }
        }
      }
    }
  }
`;
