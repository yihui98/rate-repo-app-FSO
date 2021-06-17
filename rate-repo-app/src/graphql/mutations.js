import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation mutate($credentials: AuthorizeInput!) {
        authorize(credentials: $credentials){
            accessToken
        }
    }
`;

// other queries...