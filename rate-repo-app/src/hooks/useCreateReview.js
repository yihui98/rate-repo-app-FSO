import { useApolloClient, useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    console.log({ repositoryName, ownerName, rating, text });
    const { data } =  await mutate({variables: {review: {repositoryName, ownerName, "rating": Number(rating) , text }}});
    apolloClient.resetStore(); //clear Apollo client cache and re-execute all active queries
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;