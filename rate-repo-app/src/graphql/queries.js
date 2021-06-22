import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repositories($first : Int, $after: String) {
        repositories(orderBy: CREATED_AT, orderDirection: ASC, first: $first, after: $after ){
            totalCount,
            edges{
                node{
                    id,
                    fullName,
                    description,
                    language,
                    ownerAvatarUrl,
                    url,
                    ratingAverage,
                    reviewCount,
                    stargazersCount,
                    forksCount
                    }
                cursor
                }
            pageInfo{
                endCursor
                startCursor
                hasNextPage
                }
            }
        }
`;

export const GET_SEARCH_REPOSITORIES = gql`
    query Repositories($searchKeyword: String){
        repositories(searchKeyword: $searchKeyword){
            totalCount,
            edges{
                node{
                    id,
                    fullName,
                    description,
                    language,
                    ownerAvatarUrl,
                    url,
                    ratingAverage,
                    reviewCount,
                    stargazersCount,
                    forksCount
                    }
                }
            }
        }
`;

export const GET_SELECTED_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            totalCount,
            edges{
                node{
                    id,
                    fullName,
                    description,
                    language,
                    ownerAvatarUrl,
                    url,
                    ratingAverage,
                    reviewCount,
                    stargazersCount,
                    forksCount
                    }
                }
            }
        }
`;

export const GET_REPOSITORY = gql`
    query Repository($id : ID!,$first : Int, $after: String ){
        repository(id: $id) {
            id
            fullName
            description,
            language,
            ownerAvatarUrl,
            url,
            ratingAverage,
            reviewCount,
            stargazersCount,
            forksCount,
            reviews(first: $first, after: $after) {
              edges {
                node {
                  id
                  text
                  rating
                  createdAt
                  user {
                    id
                    username
                  }
                }
                cursor
              }
              pageInfo{
                  endCursor
                  startCursor
                  hasNextPage
              }
            }
          }
        }
`;


export const GET_USER = gql`
    query getAuthorizedUser($includeReviews: Boolean = false) {
        authorizedUser {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
                repository{
                    id
                }
              }
            }
        }
    }
}
`;

// other queries...