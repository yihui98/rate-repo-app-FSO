import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
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

export const GET_USER = gql`
    query{
        authorizedUser {
        id
        username
        }
    }
`;

// other queries...