
import { useQuery } from '@apollo/client';

import { GET_USER } from '../graphql/queries';

const useUser = (variables) => {

  const { data, error, loading } = useQuery(GET_USER, { variables });
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;  
  

  return { user: data ? data.authorizedUser : undefined, loading };
};

export default useUser;