import { useApolloClient, useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (variables) => {
    await mutate({variables});
    apolloClient.resetStore(); //clear Apollo client cache and re-execute all active queries
    
  };

  return [deleteReview, result];
};

export default useDeleteReview;