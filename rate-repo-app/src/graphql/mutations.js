import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation mutate($credentials: AuthorizeInput!) {
        authorize(credentials: $credentials){
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation mutate($review: CreateReviewInput!) {
        createReview(review: $review){
            repositoryId
        }
    }
`;

export const CREATE_USER = gql`
    mutation mutate($user: CreateUserInput!) {
        createUser(user: $user){
            id
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation mutate($id: ID!) {
        deleteReview(id: $id)
}
`;
// other queries...