import { useApolloClient, useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient();

  const createUser = async ({ username, password }) => {
    const { data } =  await mutate({variables: {user: {username, password }}});
    apolloClient.resetStore(); //clear Apollo client cache and re-execute all active queries
    return data;
  };

  return [createUser, result];
};

export default useCreateUser;